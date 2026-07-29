"use client";

import { useState, useEffect, useRef } from "react";
import {
  Clock,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Rocket,
  Shield,
  Globe,
  MousePointer2,
  Check,
  Palette,
  HeadphonesIcon,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Services() {
  const [timeLeft, setTimeLeft] = useState({ h: 24, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 24, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  const { ref: featRef, inView: featInView } = useInView(0.1);
  const { ref: benRef, inView: benInView } = useInView(0.1);

  const features = [
    "Responsive design for all devices",
    "Professional design",
    "SEO-optimized website",
    "Contact forms",
    "Social media links",
    "Visual content creation",
    "Compatible with all browsers",
    "3 months of free support",
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Fast delivery",
      description:
        "Your website is ready in 24h, guaranteed. No waiting, no complications.",
    },
    {
      icon: Palette,
      title: "Professional quality",
      description:
        "A modern, responsive design that looks great on every device.",
    },
    {
      icon: HeadphonesIcon,
      title: "Complete package",
      description:
        "From visual content to the website itself — everything you need in one place.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        @keyframes soft-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(109,40,217,0.15); }
          50% { box-shadow: 0 4px 40px rgba(109,40,217,0.28); }
        }
        @keyframes in-view-anim {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .hero-a  { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-a2 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hero-a3 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
        .hero-a4 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s both; }
        .hero-a5 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.48s both; }

        .bounce-arrow { animation: bounce-x 1.6s ease-in-out infinite; }

        .cta-btn {
          animation: soft-pulse 3s ease-in-out infinite;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.02); }

        .benefit-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(109,40,217,0.09);
        }

        .feature-item {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .feature-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(109,40,217,0.08);
        }

        .in-view {
          animation: in-view-anim 0.65s cubic-bezier(0.16,1,0.3,1) both;
        }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(109,40,217,0.10) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .dark-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .timer-block {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border-radius: 14px;
          padding: 10px 16px;
          min-width: 52px;
          text-align: center;
        }
      `}</style>

      <Header />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 flex items-center pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
            style={{ animation: "float 11s ease-in-out infinite" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-[380px] h-[380px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none"
            style={{ animation: "float 14s ease-in-out infinite 3s" }}
          />

          {/* Decorative small shapes */}
          <div
            className="absolute top-24 right-24 w-6 h-6 bg-violet-300 rounded-md rotate-12 opacity-30"
            style={{ animation: "floatB 6s ease-in-out infinite" }}
          />
          <div
            className="absolute top-40 right-40 w-4 h-4 bg-purple-300 rounded-md rotate-45 opacity-20"
            style={{ animation: "floatB 8s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute bottom-24 right-20 w-5 h-5 bg-violet-400 rounded-md rotate-12 opacity-25"
            style={{ animation: "floatB 7s ease-in-out infinite 2s" }}
          />

          <div className="container mx-auto px-4 max-w-5xl relative z-10">
            <div className="text-center space-y-8">
              {/* Badge */}
              <div className="hero-a flex justify-center">
                <div className="inline-flex items-center gap-2 bg-white border border-orange-200 shadow-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-gray-600 text-sm font-medium">
                    Limited offer — grab it now
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="hero-a2 space-y-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Rocket className="w-8 h-8 text-violet-600" />
                  <span className="text-violet-600 font-semibold text-lg tracking-wide uppercase text-sm">
                    Express Website
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                  Professional website —<br />
                  <span className="text-violet-600">ready in 24 hours.</span>
                </h1>
                <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
                  Order your website and we'll deliver it within 24 hours.
                  Present your business in the best possible way!
                </p>
              </div>

              {/* Price + Timer */}
              <div className="hero-a3 flex flex-col sm:flex-row items-center justify-center gap-5">
                {/* Price block */}
                <div className="bg-white border border-gray-100 shadow-lg rounded-2xl px-8 py-5 text-center">
                  <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Build price
                  </div>
                  <div className="flex items-end gap-1 justify-center">
                    <span className="text-5xl font-black text-gray-900 leading-none">
                      €99
                    </span>
                    <span className="text-3xl font-bold text-gray-900 pb-0.5">
                      .99
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs mt-1">one-time</div>
                </div>

                {/* Timer block */}
                <div className="bg-slate-900 rounded-2xl px-8 py-5 text-center shadow-lg">
                  <div className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">
                    Delivery time
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="timer-block">
                      <div className="text-2xl font-black text-white">
                        {pad(timeLeft.h)}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">Hours</div>
                    </div>
                    <span className="text-white/40 text-xl font-bold">:</span>
                    <div className="timer-block">
                      <div className="text-2xl font-black text-white">
                        {pad(timeLeft.m)}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">Min</div>
                    </div>
                    <span className="text-white/40 text-xl font-bold">:</span>
                    <div className="timer-block">
                      <div className="text-2xl font-black text-violet-400">
                        {pad(timeLeft.s)}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">Sec</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="hero-a4 flex flex-col items-center gap-4">
                <Link href="/poruci-sajt">
                  <button className="cta-btn bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-12 rounded-2xl text-xl flex items-center gap-3 mx-auto transition-colors">
                    <Clock className="w-5 h-5" />
                    Order Your Website Now
                    <ArrowRight className="w-5 h-5 bounce-arrow" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4 text-teal-500" />
                  Fast delivery · Satisfaction guaranteed · Great results
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 text-xs">
            <MousePointer2 className="w-4 h-4" />
            <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BENEFITS
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <span className="text-violet-600 font-semibold text-sm tracking-widest uppercase block mb-3">
                BENEFITS
              </span>
              <h2 className="text-4xl font-black text-gray-900">
                Why choose us?
              </h2>
            </div>
            <div ref={benRef} className="grid lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className={`benefit-card bg-gray-50 border border-gray-100 rounded-3xl p-8 text-center space-y-4 ${
                      benInView ? "in-view" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-violet-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {b.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHAT'S INCLUDED (dark section)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-violet-900/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-14">
              <span className="text-violet-400 font-semibold text-sm tracking-widest uppercase block mb-3">
                INCLUDED
              </span>
              <h2 className="text-4xl font-black text-white">
                What's included in your website from{" "}
                <span className="text-violet-400">€99.99</span>
              </h2>
              <p className="text-white/50 mt-3 max-w-xl mx-auto">
                Absolutely everything you need to establish your online
                presence.
              </p>
            </div>

            <div
              ref={featRef}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`feature-item bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 ${
                    featInView ? "in-view" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-8 h-8 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/poruci-sajt">
                <button className="cta-btn bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-10 rounded-2xl text-lg flex items-center gap-3 mx-auto transition-colors">
                  Order Today
                  <ArrowRight className="w-5 h-5 bounce-arrow" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            URGENCY / FINAL CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-2xl relative z-10 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Don't wait — reach out for a
              <br />
              <span className="text-violet-600">free consultation</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every day without your professional website is a missed
              opportunity. Get yours in 24 hours!
            </p>

            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10 space-y-6">
              {/* Trust row */}
              <div className="flex justify-center gap-6 text-sm text-gray-500">
                {[
                  { icon: Zap, label: "24h delivery" },
                  { icon: Star, label: "5.0 rating" },
                  { icon: Shield, label: "Guarantee" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-violet-500" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <Link href="/kontakt" className="block">
                <button className="cta-btn w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xl py-5 rounded-2xl flex items-center justify-center gap-3 group transition-colors">
                  Contact us
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/poruci-sajt" className="block">
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm border border-gray-100">
                  <Clock className="w-4 h-4 text-violet-500" />
                  Order website directly →
                </button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Shield className="w-4 h-4 text-teal-500" />
                Secure payment · No hidden fees · Satisfaction guaranteed
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
