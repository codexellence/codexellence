import { Search, Bell, LogOut } from "lucide-react";

type Props = {
  user: {
    email: string;
    fullName: string;
    role: string;
  };
};

export default function CrmTopbar({ user }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/75 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-sm font-medium text-gray-500">Welcome back</div>
          <div className="text-xl font-black tracking-tight text-gray-900">
            {user.fullName}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads, jobs, companies..."
              className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none sm:w-[260px]"
            />
          </div>

          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <Bell className="h-4 w-4" />
          </button>

          <form action="/auth/signout" method="post">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
