import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CrmShell from "@/components/crm/crm-shell";

export const dynamic = "force-dynamic";

export default async function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <CrmShell
      user={{
        email: user.email ?? "",
        fullName: profile?.full_name ?? "Team Member",
        role: profile?.role ?? "employee",
      }}
    >
      {children}
    </CrmShell>
  );
}
