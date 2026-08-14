import { createClient } from "@/utils/supabase/server";
import { CalendarDays, Clock3, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString();
}

export default async function CalendarPage() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(
      "id, project_name, project_type, job_status, start_date, deadline, created_at",
    )
    .order("deadline", { ascending: true });

  if (error) {
    return (
      <section className="space-y-6">
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
          Failed to load calendar: {error.message}
        </div>
      </section>
    );
  }

  const upcomingJobs =
    jobs?.filter(
      (job) => job.job_status !== "completed" && job.job_status !== "cancelled",
    ) ?? [];

  return (
    <section className="space-y-6">
      <div className="rounded-[30px] border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/60 p-7 shadow-[0_10px_40px_rgba(109,40,217,0.06)]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            Schedule overview
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
            Calendar
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Track upcoming project starts and delivery deadlines in one place.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <div className="text-sm font-medium text-gray-500">Upcoming jobs</div>
          <div className="mt-3 text-3xl font-black tracking-tight text-gray-900">
            {upcomingJobs.length}
          </div>
        </div>

        <div className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <div className="text-sm font-medium text-gray-500">With deadline</div>
          <div className="mt-3 text-3xl font-black tracking-tight text-gray-900">
            {upcomingJobs.filter((job) => job.deadline).length}
          </div>
        </div>

        <div className="rounded-[26px] border border-black/5 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <div className="text-sm font-medium text-gray-500">Starting soon</div>
          <div className="mt-3 text-3xl font-black tracking-tight text-gray-900">
            {upcomingJobs.filter((job) => job.start_date).length}
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Upcoming schedule</h2>
          <p className="mt-1 text-sm text-gray-500">
            Active projects ordered by nearest deadline.
          </p>
        </div>

        {upcomingJobs.length === 0 ? (
          <div className="mt-6 rounded-[24px] border border-dashed border-gray-200 bg-gray-50/70 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
              <CalendarDays className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No scheduled jobs yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Once projects are booked and given dates, they will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-[24px] border border-gray-100 bg-gray-50/60 p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {job.project_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.project_type || "project"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                      job.job_status === "in_progress"
                        ? "border border-violet-100 bg-violet-50 text-violet-700"
                        : job.job_status === "scheduled"
                          ? "border border-amber-100 bg-amber-50 text-amber-700"
                          : "border border-teal-100 bg-teal-50 text-teal-700"
                    }`}
                  >
                    {job.job_status.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      <Clock3 className="h-4 w-4" />
                      Start date
                    </div>
                    <div className="mt-1 font-semibold text-gray-900">
                      {formatDate(job.start_date)}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      Deadline
                    </div>
                    <div className="mt-1 font-semibold text-gray-900">
                      {formatDate(job.deadline)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
