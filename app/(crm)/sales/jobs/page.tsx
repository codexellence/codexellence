import { createClient } from "@/utils/supabase/server";
import {
  Briefcase,
  CircleDollarSign,
  CalendarClock,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(
      "id, project_name, project_type, deal_value, deposit_paid, remaining_amount, job_status, start_date, deadline, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="space-y-6">
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
          Failed to load jobs: {error.message}
        </div>
      </section>
    );
  }

  const totalValue =
    jobs?.reduce((sum, job) => sum + Number(job.deal_value || 0), 0) ?? 0;

  const totalRemaining =
    jobs?.reduce((sum, job) => sum + Number(job.remaining_amount || 0), 0) ?? 0;

  const activeJobs =
    jobs?.filter((job) =>
      ["scheduled", "in_progress", "waiting"].includes(job.job_status),
    ).length ?? 0;

  const completedJobs =
    jobs?.filter((job) => job.job_status === "completed").length ?? 0;

  return (
    <section className="space-y-6">
      <div className="rounded-[30px] border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/60 p-7 shadow-[0_10px_40px_rgba(109,40,217,0.06)]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            Delivery pipeline
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
            Jobs and project delivery
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Track booked work, payment progress, delivery timelines, and active
            projects.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total value",
            value: `$${totalValue.toLocaleString()}`,
            icon: CircleDollarSign,
            tone: "violet",
          },
          {
            label: "Remaining",
            value: `$${totalRemaining.toLocaleString()}`,
            icon: CalendarClock,
            tone: "teal",
          },
          {
            label: "Active jobs",
            value: `${activeJobs}`,
            icon: Briefcase,
            tone: "violet",
          },
          {
            label: "Completed",
            value: `${completedJobs}`,
            icon: CheckCircle2,
            tone: "teal",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
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

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All jobs</h2>
          <p className="mt-1 text-sm text-gray-500">
            {jobs?.length ?? 0} job{jobs?.length === 1 ? "" : "s"} in your
            workspace
          </p>
        </div>

        {!jobs || jobs.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-gray-200 bg-gray-50/70 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No jobs yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Convert successful leads into jobs to start tracking project
              delivery.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50/80">
                  <tr className="text-left">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                      Project
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                      Value
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                      Remaining
                    </th>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                      Deadline
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-5 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {job.project_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.project_type || "project"}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
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
                          {job.job_status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                        ${Number(job.deal_value || 0).toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        ${Number(job.remaining_amount || 0).toLocaleString()}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {job.deadline
                          ? new Date(job.deadline).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
