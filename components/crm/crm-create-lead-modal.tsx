"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function CreateLeadModal() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("leads").insert({
      company_name: companyName.trim(),
      company_number: companyNumber.trim(),
      note: note.trim(),
      owner_id: user.id,
      source: "manual",
      status: "pending",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setOpen(false);
    setCompanyName("");
    setCompanyNumber("");
    setNote("");
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.25)] transition-all hover:-translate-y-0.5 hover:bg-violet-700"
      >
        <Plus className="w-4 h-4" />
        Add lead
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-gray-900">
                  Add new lead
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Create a company record and start tracking the opportunity.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                  placeholder="Acme Studio"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company number
                </label>
                <input
                  type="text"
                  value={companyNumber}
                  onChange={(e) => setCompanyNumber(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                  placeholder="12345678"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[110px] w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                  placeholder="Short context about this lead..."
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
                  disabled={loading}
                  className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.20)] transition-all hover:bg-violet-700 disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
