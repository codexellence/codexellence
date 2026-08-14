"use client";

import { useState, useTransition } from "react";
import { updateProfileSettings } from "@/app/(crm)/sales/settings/actions";

type Props = {
  initialFullName: string;
  initialRole: string;
  email: string;
};

export default function SettingsForm({
  initialFullName,
  initialRole,
  email,
}: Props) {
  const [fullName, setFullName] = useState(initialFullName);
  const [role, setRole] = useState(initialRole);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      try {
        await updateProfileSettings(formData);
        setSuccess("Settings updated successfully.");
      } catch (err: any) {
        setError(err.message || "Failed to update settings.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Role
        </label>
        <input
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          value={email}
          disabled
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
        />
      </div>

      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.20)] transition-all hover:bg-violet-700 disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save settings"}
        </button>
      </div>
    </form>
  );
}
