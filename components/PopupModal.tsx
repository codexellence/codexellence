"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  X,
  Zap,
  ArrowRight,
  Shield,
  Clock3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const POPUP_KEY = "promo_popup_dismissed_v2";

const BENEFITS = [
  "A custom website designed to make your business look credible",
  "Fast delivery with direct communication and zero confusion",
  "Mobile-first, modern, fast-loading, and conversion-focused",
  "Support after launch so your site stays polished and reliable",
];

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(POPUP_KEY);
    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimating(false);

    window.setTimeout(() => {
      setVisible(false);
      window.localStorage.setItem(POPUP_KEY, "true");
    }, 360);
  };

  if (!visible) return null;

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md transition-opacity duration-300"
        style={{ opacity: animating ? 1 : 0 }}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-lg pointer-events-auto overflow-hidden rounded-[30px] bg-white shadow-[0_35px_100px_rgba(0,0,0,0.35)]"
          style={{
            opacity: animating ? 1 : 0,
            transform: animating
              ? "scale(1) translateY(0)"
              : "scale(0.94) translateY(28px)",
            transition:
              "opacity 0.36s ease, transform 0.36s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-slate-950 px-7 pt-8 pb-8">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-sm" />
            <div className="absolute left-0 bottom-0 h-40 w-40 -translate-x-1/3 translate-y-1/3 rounded-full bg-fuchsia-500/10" />
            <div className="absolute right-16 top-14 h-16 w-16 rounded-full border border-white/10 bg-white/5" />

            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Limited spots this week
            </div>

            <h2 className="max-w-md text-3xl sm:text-4xl font-black leading-[1.05] text-white">
              Turn visitors into clients with a website that actually sells.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/78 sm:text-[15px]">
              We create premium business websites that build trust fast, look
              professional on every screen, and help people contact you sooner.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/90">
                <Clock3 className="h-4 w-4 text-teal-300" />
                Starts 5 seconds after page load
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/90">
                <Zap className="h-4 w-4 text-violet-200" />
                Fast turnaround
              </div>
            </div>
          </div>

          <div className="px-7 py-7">
            <div className="mb-6 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
              <div className="mb-1 text-base font-bold text-gray-900">
                Why clients choose us
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                No bloated process, no cheap-looking template feel, no waiting
                forever — just a serious website for a serious business.
              </p>
            </div>

            <ul className="mb-7 space-y-3">
              {BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-gray-700"
                >
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <Link
                href="/order-website"
                onClick={handleClose}
                className="block"
              >
                <Button className="group h-auto w-full rounded-2xl bg-violet-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-violet-700 hover:shadow-xl">
                  Start your project now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
                <Shield className="h-3.5 w-3.5 text-teal-500" />
                Professional delivery, clear communication, and post-launch
                support
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
