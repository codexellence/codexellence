"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, Clock3, Briefcase, X } from "lucide-react";
import {
  convertLeadToJob,
  updateLeadStatus,
} from "@/app/(crm)/sales/leads/actions";

type Lead = {
  id: string;
  company_name: string;
  status: string;
};

export default function LeadActions({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const [projectName, setProjectName] = useState(
    `${lead.company_name} Website`,
  );
  const [projectType, setProjectType] = useState("business-website");
  const [dealValue, setDealValue] = useState("");
  const [depositPaid, setDepositPaid] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const submitStatus = (status: "pending" | "success" | "failed") => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("leadId", lead.id);
        formData.append("status", status);
        await updateLeadStatus(formData);
      } catch (err: any) {
        setError(err.message || "Failed to update status.");
      }
    });
  };

  const handleConvert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        setError("");

        const formData = new FormData();
        formData.append("leadId", lead.id);
        formData.append("projectName", projectName);
        formData.append("projectType", projectType);
        formData.append("dealValue", dealValue || "0");
        formData.append("depositPaid", depositPaid || "0");
        formData.append("deadline", deadline);

        await convertLeadToJob(formData);
        setOpen(false);
      } catch (err: any) {
        setError(err.message || "Failed to convert lead.");
      }
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => submitStatus("pending")}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-700"
        >
          <Clock3 className="h-3.5 w-3.5" />
          Pending
        </button>

        <button
          onClick={() => submitStatus("failed")}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-rose-700"
        >
          <XCircle className="h-3.5 w-3.5" />
          Failed
        </button>

        <button
          onClick={() => setOpen(true)}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Convert
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-gray-900">
                  Convert lead to job
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Create a booked project from this lead and move it into
                  delivery.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleConvert} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project name
                </label>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project type
                </label>
                <input
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Deal value
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Deposit paid
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={depositPaid}
                    onChange={(e) => setDepositPaid(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                    placeholder="500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.20)] transition-all hover:bg-violet-700 disabled:opacity-60"
                >
                  <Briefcase className="h-4 w-4" />
                  {isPending ? "Converting..." : "Create job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
