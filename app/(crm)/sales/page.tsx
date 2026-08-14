import { createClient } from "@/utils/supabase/server";
import { BarChart3, Briefcase, CircleDollarSign, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

export default async function SalesPage() {
  const supabase = await createClient();

  const [
    leadsCountResult,
    pendingLeadsCountResult,
    wonLeadsCountResult,
    jobsResult,
    recentLeadsResult,
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "success"),
    supabase
      .from("jobs")
      .select(
        "id, project_name, project_type, deal_value, deposit_paid, remaining_amount, job_status, created_at",
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("leads")
      .select("id, company_name, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalLeads = leadsCountResult.count ?? 0;
  const pendingLeads = pendingLeadsCountResult.count ?? 0;
  const wonLeads = wonLeadsCountResult.count ?? 0;

  const jobs = jobsResult.data ?? [];
  const recentLeads = recentLeadsResult.data ?? [];

  const totalRevenue = jobs.reduce(
    (sum, job) => sum + Number(job.deal_value || 0),
    0,
  );

  return (
    <section className="space-y-6">
      <div className="rounded-[30px] border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/60 p-7 shadow-[0_10px_40px_rgba(109,40,217,0.06)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
              Workspace active
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
              Sales dashboard
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Track leads, booked projects, and revenue in one premium
              workspace.
            </p>
          </div>

          <Link
            href="/sales/leads"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.25)] transition-all hover:-translate-y-0.5 hover:bg-violet-700"
          >
            <Plus className="w-4 h-4" />
            Manage leads
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total leads",
            value: `${totalLeads}`,
            icon: BarChart3,
            tone: "violet",
          },
          {
            label: "Pending leads",
            value: `${pendingLeads}`,
            icon: Briefcase,
            tone: "teal",
          },
          {
            label: "Won jobs",
            value: `${wonLeads}`,
            icon: Briefcase,
            tone: "violet",
          },
          {
            label: "Revenue",
            value: formatMoney(totalRevenue),
            icon: CircleDollarSign,
            tone: "teal",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    {item.label}
                  </div>
                  <div className="mt-3 text-3xl font-black tracking-tight text-gray-900">
                    {item.value}
                  </div>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    item.tone === "violet"
                      ? "border border-violet-100 bg-violet-50 text-violet-600"
                      : "border border-teal-100 bg-teal-50 text-teal-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent leads</h2>
              <p className="mt-1 text-sm text-gray-500">
                Your latest companies added to the pipeline.
              </p>
            </div>

            <Link
              href="/sales/leads"
              className="rounded-2xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              View all
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="mt-6 rounded-[24px] border border-dashed border-gray-200 bg-gray-50/70 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                No leads yet
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Add your first lead to begin building the pipeline.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-4"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      {lead.company_name}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                      lead.status === "success"
                        ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                        : lead.status === "failed"
                          ? "border border-rose-100 bg-rose-50 text-rose-700"
                          : "border border-amber-100 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <h2 className="text-xl font-bold text-gray-900">Recent jobs</h2>
          <p className="mt-1 text-sm text-gray-500">
            Latest booked work and revenue movement.
          </p>

          {jobs.length === 0 ? (
            <div className="mt-6 space-y-4">
              {[
                "Booked jobs appear here",
                "Revenue updates appear here",
                "Project status changes appear here",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {jobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {job.project_name}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        {job.project_type || "project"}
                      </div>
                    </div>

                    <div className="text-sm font-bold text-gray-900">
                      {formatMoney(Number(job.deal_value || 0))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                        job.job_status === "completed"
                          ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                          : job.job_status === "cancelled"
                            ? "border border-rose-100 bg-rose-50 text-rose-700"
                            : job.job_status === "in_progress"
                              ? "border border-violet-100 bg-violet-50 text-violet-700"
                              : "border border-amber-100 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {job.job_status.replaceAll("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
