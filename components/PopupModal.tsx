"use client";

import { useState, useEffect } from "react";
import { X, Zap, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const POPUP_KEY = "promo_popup_dismissed";

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the popup
    const dismissed = localStorage.getItem(POPUP_KEY);
    if (dismissed) return;

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
      // Small delay for entry animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimating(false);
    setTimeout(() => {
      setVisible(false);
      localStorage.setItem(POPUP_KEY, "true");
    }, 350);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: animating ? 1 : 0 }}
      />

      {/* Popup */}
      <div className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md pointer-events-auto bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-350"
          style={{
            opacity: animating ? 1 : 0,
            transform: animating
              ? "scale(1) translateY(0)"
              : "scale(0.92) translateY(24px)",
            transition:
              "opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Top gradient band */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 px-7 pt-8 pb-10 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-900/30 rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Flash badge */}
            <div className="inline-flex items-center gap-1.5 bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Zap className="w-3 h-3" />
              SPECIAL OFFER
            </div>

            <h2 className="text-white text-3xl font-bold leading-tight mb-1">
              Your website
              <br />
              for only
            </h2>

            {/* Price */}
            <div className="flex items-end gap-3 mt-2">
              <div>
                <span className="text-white/50 line-through text-xl mr-2">
                  €250
                </span>
                <span className="text-white text-6xl font-black leading-none">
                  99
                </span>
                <span className="text-white text-3xl font-black">.99</span>
                <span className="text-white/70 text-lg ml-1">EUR</span>
              </div>
            </div>

            <p className="text-purple-200 text-sm mt-2">
              One-time payment + 3 months of support{" "}
              <span className="text-white font-semibold">free</span>
            </p>
          </div>

          {/* Bottom content */}
          <div className="px-7 py-6">
            <ul className="space-y-2 mb-6">
              {[
                "Professional web design",
                "24h delivery",
                "Responsive & fast website",
                "SSL certificate included",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-gray-700"
                >
                  <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        d="M1.5 5l2.5 2.5 4.5-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <a href="/poruci-sajt" className="block" onClick={handleClose}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
                Buy now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5 text-teal-500" />
              Secure payment via Stripe
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
