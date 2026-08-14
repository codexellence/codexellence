import { createClient } from "@/utils/supabase/server";
import SettingsForm from "@/components/crm/settings-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (error) {
    return (
      <section className="space-y-6">
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
          Failed to load settings: {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[30px] border border-violet-100 bg-gradient-to-br from-white via-white to-violet-50/60 p-7 shadow-[0_10px_40px_rgba(109,40,217,0.06)]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            Workspace preferences
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
            Settings
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Update your profile details and internal workspace identity.
          </p>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900">Profile settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            These details are used across your CRM workspace.
          </p>

          <div className="mt-6">
            <SettingsForm
              initialFullName={profile?.full_name ?? ""}
              initialRole={profile?.role ?? "employee"}
              email={user.email ?? ""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
