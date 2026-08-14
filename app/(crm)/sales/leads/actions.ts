"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

const VALID_STATUSES = ["pending", "success", "failed"] as const;

function normalizeOptionalText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();

  return text.length > 0 ? text : null;
}

function parseMoney(value: FormDataEntryValue | null) {
  const parsed = Number(value ?? 0);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function revalidateSalesPaths() {
  revalidatePath("/sales");
  revalidatePath("/sales/leads");
  revalidatePath("/sales/jobs");
}

export async function updateLeadStatus(formData: FormData) {
  const supabase = await createClient();

  const leadId = String(formData.get("leadId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!leadId) {
    throw new Error("Missing lead ID.");
  }

  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    throw new Error("Invalid lead status.");
  }

  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId);

  if (error) {
    throw new Error(`Could not update lead status: ${error.message}`);
  }

  revalidateSalesPaths();
}

export async function updateLead(formData: FormData) {
  const supabase = await createClient();

  const leadId = String(formData.get("leadId") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const companyNumber = normalizeOptionalText(formData.get("companyNumber"));
  const email = normalizeOptionalText(formData.get("email"));
  const website = normalizeOptionalText(formData.get("website"));
  const source = normalizeOptionalText(formData.get("source"));
  const note = normalizeOptionalText(formData.get("note"));
  const status = String(formData.get("status") ?? "pending").trim();

  if (!leadId) {
    throw new Error("Missing lead ID.");
  }

  if (!companyName) {
    throw new Error("Company name is required.");
  }

  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    throw new Error("Invalid lead status.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }

  let normalizedWebsite = website;

  if (normalizedWebsite && !/^https?:\/\//i.test(normalizedWebsite)) {
    normalizedWebsite = `https://${normalizedWebsite}`;
  }

  const { error } = await supabase
    .from("leads")
    .update({
      company_name: companyName,
      company_number: companyNumber,
      email,
      website: normalizedWebsite,
      source,
      note,
      status,
    })
    .eq("id", leadId);

  if (error) {
    throw new Error(`Could not update lead: ${error.message}`);
  }

  revalidateSalesPaths();
}

export async function convertLeadToJob(formData: FormData) {
  const supabase = await createClient();

  const leadId = String(formData.get("leadId") ?? "").trim();
  const projectName = String(formData.get("projectName") ?? "").trim();
  const projectType =
    normalizeOptionalText(formData.get("projectType")) ?? "business-website";
  const dealValue = parseMoney(formData.get("dealValue"));
  const depositPaid = parseMoney(formData.get("depositPaid"));
  const deadline = normalizeOptionalText(formData.get("deadline"));

  if (!leadId) {
    throw new Error("Missing lead ID.");
  }

  if (!projectName) {
    throw new Error("Project name is required.");
  }

  if (depositPaid > dealValue && dealValue > 0) {
    throw new Error("Deposit cannot be higher than the deal value.");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be signed in to convert a lead.");
  }

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("id, company_name, assigned_to")
    .eq("id", leadId)
    .single();

  if (leadError || !lead) {
    throw new Error(leadError?.message || "Lead not found.");
  }

  const { error: insertError } = await supabase.from("jobs").insert({
    lead_id: lead.id,
    project_name: projectName,
    project_type: projectType,
    deal_value: dealValue,
    deposit_paid: depositPaid,
    deadline,
    created_by: user.id,
    assigned_to: lead.assigned_to ?? user.id,
    job_status: "scheduled",
  });

  if (insertError) {
    throw new Error(`Could not create job: ${insertError.message}`);
  }

  const { error: updateError } = await supabase
    .from("leads")
    .update({ status: "success" })
    .eq("id", leadId);

  if (updateError) {
    throw new Error(
      `Job was created, but the lead status could not be updated: ${updateError.message}`,
    );
  }

  revalidateSalesPaths();
}
