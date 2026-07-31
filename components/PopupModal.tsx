"use client";

import { useEffect, useState } from "react";
import { X, Zap, ArrowRight, Shield, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const POPUP_KEY = "promo_popup_dismissed";

const BENEFITS = [
  "Professional custom website tailored to your business",
  "Delivered fast, with clear communication throughout",
  "Responsive, modern, and performance-focused build",
  "Support included after launch so you're not left alone",
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
    }, 350);
  };

  if (!visible) return null;

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: animating ? 1 : 0 }}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md pointer-events-auto bg-white rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
          style={{
            opacity: animating ? 1 : 0,
            transform: animating
              ? "scale(1) translateY(0)"
              : "scale(0.92) translateY(24px)",
            transition:
              "opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-slate-900 px-7 pt-8 pb-8">
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-purple-950/25 translate-y-1/2 -translate-x-1/3" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Zap className="w-3 h-3" />
              LIMITED AVAILABILITY
            </div>

            <h2 className="text-white text-3xl font-black leading-tight">
              Need your website
              <br />
              launched fast?
            </h2>

            <p className="text-purple-100/85 text-sm leading-relaxed mt-3 max-w-sm">
              We build modern business websites that look professional, load
              fast, and help you turn visitors into real inquiries.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-white/90 text-sm font-medium">
              <Clock className="w-4 h-4 text-teal-300" />
              Fast turnaround. Clear process. Reliable support.
            </div>
          </div>

          <div className="px-7 py-6">
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 mb-6">
              <div className="text-gray-900 font-bold text-base mb-1">
                What you get
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                A serious website presence for your business without the usual
                delays, confusion, or low-quality template feel.
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a href="/order-website" className="block" onClick={handleClose}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
                Start your project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5 text-teal-500" />
              Professional delivery with post-launch support
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
