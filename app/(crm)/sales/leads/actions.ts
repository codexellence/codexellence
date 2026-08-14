"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

function emptyToNull(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || null;
}

export async function updateLead(formData: FormData) {
  const supabase = await createClient();

  const leadId = String(formData.get("leadId") || "").trim();
  const companyName = String(formData.get("companyName") || "").trim();
  const companyNumber = emptyToNull(formData.get("companyNumber"));
  const email = emptyToNull(formData.get("email"));
  const website = emptyToNull(formData.get("website"));
  const status = String(formData.get("status") || "pending").trim();
  const source = emptyToNull(formData.get("source"));
  const note = emptyToNull(formData.get("note"));

  if (!leadId || !companyName) {
    throw new Error("Lead ID and company name are required.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  const { error } = await supabase
    .from("leads")
    .update({
      company_name: companyName,
      company_number: companyNumber,
      email,
      website,
      status,
      source,
      note,
    })
    .eq("id", leadId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/sales/leads");
  revalidatePath("/sales");
}
