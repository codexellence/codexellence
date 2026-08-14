import CrmSidebar from "./crm-sidebar";
import CrmTopbar from "./crm-topbar";

type CrmShellProps = {
  children: React.ReactNode;
  user: {
    email: string;
    fullName: string;
    role: string;
  };
};

export default function CrmShell({ children, user }: CrmShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f7fb] text-gray-900">
      <div className="fixed inset-x-0 top-0 h-[320px] bg-[radial-gradient(circle_at_top,rgba(109,40,217,0.12),transparent_60%)] pointer-events-none" />

      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <CrmSidebar user={user} />

        <div className="min-w-0 flex-1">
          <CrmTopbar user={user} />
          <div className="px-4 pb-8 pt-4 sm:px-6 lg:px-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
