"use client";

import { useState, useTransition } from "react";
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MoreHorizontal,
  X,
  XCircle,
} from "lucide-react";
import {
  convertLeadToJob,
  updateLeadStatus,
} from "@/app/(crm)/sales/leads/actions";

type LeadActionsProps = {
  lead: {
    id: string;
    company_name: string;
    status: string;
  };
};

type StatusOption = {
  label: string;
  value: "pending" | "success" | "failed";
  icon: typeof Clock3;
  className: string;
};

const STATUS_OPTIONS: StatusOption[] = [
  {
    label: "Pending",
    value: "pending",
    icon: Clock3,
    className: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
  {
    label: "Won",
    value: "success",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  {
    label: "Lost",
    value: "failed",
    icon: XCircle,
    className: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
  },
];

function getDefaultProjectName(companyName: string) {
  return `${companyName} website`;
}

export default function LeadActions({ lead }: LeadActionsProps) {
  const [open, setOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function changeStatus(status: "pending" | "success" | "failed") {
    setError(null);

    const formData = new FormData();
    formData.set("leadId", lead.id);
    formData.set("status", status);

    startTransition(async () => {
      try {
        await updateLeadStatus(formData);
        setOpen(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not update lead status.",
        );
      }
    });
  }

  function handleConvert(formData: FormData) {
    setError(null);
    formData.set("leadId", lead.id);

    startTransition(async () => {
      try {
        await convertLeadToJob(formData);
        setConvertOpen(false);
        setOpen(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not convert lead to job.",
        );
      }
    });
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setError(null);
            setOpen((current) => !current);
          }}
          title="Lead actions"
          aria-label={`Actions for ${lead.company_name}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {open && (
          <div className="absolute right-0 z-30 mt-2 w-52 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
            <p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
              Update status
            </p>

            {STATUS_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isCurrent = lead.status.toLowerCase() === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={isPending || isCurrent}
                  onClick={() => changeStatus(option.value)}
                  className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${option.className}`}
                >
                  <Icon className="h-4 w-4" />
                  {isCurrent ? `${option.label} (current)` : option.label}
                </button>
              );
            })}

            <div className="my-2 border-t border-gray-100" />

            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                setError(null);
                setConvertOpen(true);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-left text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Briefcase className="h-4 w-4" />
              Convert to job
            </button>

            {error && (
              <p className="mt-2 rounded-xl bg-rose-50 px-3 py-2 text-xs leading-relaxed text-rose-700">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      {convertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600">
                  New job
                </p>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  Convert lead to job
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Create a job for {lead.company_name} and mark this lead as
                  won.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConvertOpen(false)}
                disabled={isPending}
                aria-label="Close conversion form"
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={handleConvert} className="mt-6 space-y-4">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-gray-700">
                  Project name
                </span>
                <input
                  name="projectName"
                  required
                  defaultValue={getDefaultProjectName(lead.company_name)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Project type
                  </span>
                  <select
                    name="projectType"
                    defaultValue="business-website"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  >
                    <option value="business-website">Business website</option>
                    <option value="ecommerce">E-commerce website</option>
                    <option value="landing-page">Landing page</option>
                    <option value="web-app">Web application</option>
                    <option value="seo">SEO / marketing</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Deadline
                  </span>
                  <input
                    name="deadline"
                    type="date"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Deal value
                  </span>
                  <input
                    name="dealValue"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Deposit paid
                  </span>
                  <input
                    name="depositPaid"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue="0"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>
              </div>

              {error && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConvertOpen(false)}
                  disabled={isPending}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Briefcase className="h-4 w-4" />
                  {isPending ? "Creating..." : "Create job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
