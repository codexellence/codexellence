"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowRight, Lock, Mail, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/sales");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-violet-50/70 to-teal-50/40 text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-[30px] border border-white/70 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(109,40,217,0.10)]">
          <div className="p-8 sm:p-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 mb-5">
              <Shield className="w-3.5 h-3.5" />
              Employee access only
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Login to CRM
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Access your sales workspace, track leads, manage booked jobs, and
              monitor revenue.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Work email
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100 transition-all">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-100 transition-all">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                    required
                  />
                </div>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(109,40,217,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Enter CRM"}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
