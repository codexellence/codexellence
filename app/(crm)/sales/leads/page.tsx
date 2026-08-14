import { createClient } from "@/utils/supabase/server";
import {
  Building2,
  CircleDashed,
  ExternalLink,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import CreateLeadModal from "@/components/crm/crm-create-lead-modal";
import EditLeadModal from "@/components/crm/edit-lead-modal";
import ImportLeadsModal from "@/components/crm/import-leads-modal";
import LeadActions from "@/components/crm/lead-actions";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  company_name: string;
  company_number: string | null;
  email: string | null;
  website: string | null;
  status: "pending" | "success" | "failed" | string;
  note: string | null;
  source: string | null;
  created_at: string;
};

function getStatusClasses(status: Lead["status"]) {
  switch (status.toLowerCase()) {
    case "success":
      return "border border-emerald-100 bg-emerald-50 text-emerald-700";
    case "failed":
      return "border border-rose-100 bg-rose-50 text-rose-700";
    default:
      return "border border-amber-100 bg-amber-50 text-amber-700";
  }
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function WebsiteCell({ website }: { website: string | null }) {
  const normalizedWebsite = website?.trim() || "";
  const isRealUrl =
    normalizedWebsite.length > 0 &&
    normalizedWebsite.toLowerCase() !== "no website" &&
    /^https?:\/\//i.test(normalizedWebsite);

  if (!isRealUrl) {
    return <span className="text-sm text-gray-400">No website</span>;
  }

  return (
    <a
      href={normalizedWebsite}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 transition hover:text-violet-700 hover:underline"
    >
      Visit site
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

function ContactCell({
  email,
  phone,
}: {
  email: string | null;
  phone: string | null;
}) {
  const normalizedEmail = email?.trim() || "";
  const normalizedPhone = phone?.trim() || "";

  if (!normalizedEmail && !normalizedPhone) {
    return <span className="text-sm text-gray-400">—</span>;
  }

  return (
    <div className="space-y-1.5">
      {normalizedEmail && (
        <a
          href={`mailto:${normalizedEmail}`}
          className="flex w-fit items-center gap-1.5 text-sm font-medium text-violet-600 transition hover:text-violet-700 hover:underline"
        >
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="max-w-[190px] truncate">{normalizedEmail}</span>
        </a>
      )}

      {normalizedPhone && (
        <a
          href={`tel:${normalizedPhone.replace(/\s/g, "")}`}
          className="flex w-fit items-center gap-1.5 text-sm text-gray-600 transition hover:text-violet-700"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <span>{normalizedPhone}</span>
        </a>
      )}
    </div>
  );
}

function LeadsEmptyState() {
  return (
    <div className="mt-6 rounded-[24px] border border-dashed border-gray-200 bg-gray-50/70 p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
        <CircleDashed className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">No leads yet</h3>
      <p className="mt-2 text-sm text-gray-500">
        Add your first company to start building the pipeline.
      </p>
    </div>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[20px] border border-gray-100">
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-[22%]" />
          <col className="w-[20%]" />
          <col className="w-[12%]" />
          <col className="w-[15%]" />
          <col className="w-[21%]" />
          <col className="w-[10%]" />
        </colgroup>

        <thead className="bg-gray-50/80">
          <tr className="text-left">
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Company
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Contact
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Status
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Website
            </th>
            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Note
            </th>
            <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="bg-white align-middle transition hover:bg-violet-50/30"
            >
              <td className="px-3 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-100 bg-violet-50 text-violet-600">
                    <Building2 className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p
                      title={lead.company_name}
                      className="truncate text-sm font-semibold text-gray-900"
                    >
                      {lead.company_name}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-gray-500">
                      {formatDate(lead.created_at)}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-3 py-3">
                <div className="min-w-0 space-y-1">
                  {lead.company_number && (
                    <a
                      href={`tel:${lead.company_number.replace(/\s/g, "")}`}
                      title={lead.company_number}
                      className="flex min-w-0 items-center gap-1 text-xs font-medium text-gray-700 hover:text-violet-700"
                    >
                      <Phone className="h-3 w-3 shrink-0 text-violet-500" />
                      <span className="truncate">{lead.company_number}</span>
                    </a>
                  )}

                  {lead.email && (
                    <a
                      href={`mailto:${lead.email.trim()}`}
                      title={lead.email}
                      className="flex min-w-0 items-center gap-1 text-xs text-violet-600 hover:text-violet-700 hover:underline"
                    >
                      <Mail className="h-3 w-3 shrink-0" />
                      <span className="truncate">{lead.email}</span>
                    </a>
                  )}

                  {!lead.company_number && !lead.email && (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </div>
              </td>

              <td className="px-3 py-3">
                <span
                  title={lead.status}
                  className={`inline-flex max-w-full truncate rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] ${getStatusClasses(
                    lead.status,
                  )}`}
                >
                  {lead.status}
                </span>
              </td>

              <td className="px-3 py-3">
                <div className="min-w-0">
                  <WebsiteCell website={lead.website} />

                  <p
                    title={lead.source || "manual"}
                    className="mt-1 truncate text-[10px] uppercase tracking-[0.08em] text-gray-400"
                  >
                    {lead.source || "manual"}
                  </p>
                </div>
              </td>

              <td className="px-3 py-3">
                <p
                  title={lead.note || ""}
                  className="line-clamp-2 break-words text-xs leading-4 text-gray-500"
                >
                  {lead.note || "—"}
                </p>
              </td>

              <td className="px-3 py-3">
                <div className="flex items-center justify-end gap-1">
                  <EditLeadModal
                    lead={{
                      id: lead.id,
                      company_name: lead.company_name,
                      company_number: lead.company_number,
                      email: lead.email,
                      website: lead.website,
                      status: lead.status,
                      source: lead.source,
                      note: lead.note,
                    }}
                  />

                  <LeadActions
                    lead={{
                      id: lead.id,
                      company_name: lead.company_name,
                      status: lead.status,
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select(
      "id, company_name, company_number, email, website, status, note, source, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="space-y-6">
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
          Failed to load leads: {error.message}
        </div>
      </section>
    );
  }

  const typedLeads = (leads ?? []) as Lead[];

  return (
    <section className="space-y-6">
      <div className="rounded-[30px] border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/60 p-7 shadow-[0_10px_40px_rgba(109,40,217,0.06)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
              Lead pipeline
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
              Manage your leads
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Track companies, maintain contact details, and move your best
              opportunities toward booked jobs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ImportLeadsModal />
            <CreateLeadModal />
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">All leads</h2>
            <p className="mt-1 text-sm text-gray-500">
              {typedLeads.length} lead{typedLeads.length === 1 ? "" : "s"}{" "}
              available
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search coming soon..."
              className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none sm:w-[220px]"
              disabled
            />
          </div>
        </div>

        {typedLeads.length === 0 ? (
          <LeadsEmptyState />
        ) : (
          <LeadsTable leads={typedLeads} />
        )}
      </div>
    </section>
  );
}
