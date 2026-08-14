"use client";

import { useState, useTransition } from "react";
import { Pencil, X } from "lucide-react";
import { updateLead } from "@/app/(crm)/sales/leads/actions";

type EditableLead = {
  id: string;
  company_name: string;
  company_number: string | null;
  email: string | null;
  website: string | null;
  status: string;
  source: string | null;
  note: string | null;
};

export default function EditLeadModal({ lead }: { lead: EditableLead }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        await updateLead(formData);
        setOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not update lead.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit lead</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update this company’s contact and pipeline details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close edit lead modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form action={handleSubmit} className="mt-6 space-y-4">
              <input type="hidden" name="leadId" value={lead.id} />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Company name
                  </span>
                  <input
                    name="companyName"
                    required
                    defaultValue={lead.company_name}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Phone number
                  </span>
                  <input
                    name="companyNumber"
                    type="tel"
                    defaultValue={lead.company_number || ""}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    defaultValue={lead.email || ""}
                    placeholder="hello@company.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Website
                  </span>
                  <input
                    name="website"
                    type="url"
                    defaultValue={lead.website || ""}
                    placeholder="https://company.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Status
                  </span>
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Source
                  </span>
                  <input
                    name="source"
                    defaultValue={lead.source || ""}
                    placeholder="Manual, Google Maps, referral..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  />
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-semibold text-gray-700">
                  Note
                </span>
                <textarea
                  name="note"
                  rows={4}
                  defaultValue={lead.note || ""}
                  placeholder="Add qualification notes, follow-up information, etc."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                />
              </label>

              {error && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
