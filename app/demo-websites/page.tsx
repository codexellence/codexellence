"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ExternalLink,
  Monitor,
  Rocket,
  Shield,
  Star,
  Zap,
  MousePointer2,
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const demos = [
  {
    title: "Accounting Firm",
    description:
      "A professional website for an accounting agency. Clean design, clear presentation of services, and a contact form.",
    url: "https://racunovodstvo-demo.netlify.app",
    tag: "Finance",
    gradient: "from-blue-500 to-blue-700",
    accent: "bg-blue-100 text-blue-700",
    mockupBg: "bg-blue-50",
    barColor: "bg-blue-400",
  },
  {
    title: "Law Office",
    description:
      "An elegant and trustworthy website for a lawyer. Emphasis on professionalism and accessibility.",
    url: "https://advokat-demo.netlify.app",
    tag: "Law",
    gradient: "from-slate-700 to-slate-900",
    accent: "bg-slate-100 text-slate-700",
    mockupBg: "bg-slate-50",
    barColor: "bg-slate-400",
  },
  {
    title: "Transfer Services",
    description:
      "A dynamic website for a transfer and passenger transport company. Fast navigation, bookings, and vehicle display.",
    url: "https://transfer-demo.netlify.app",
    tag: "Transport",
    gradient: "from-teal-500 to-teal-700",
    accent: "bg-teal-100 text-teal-700",
    mockupBg: "bg-teal-50",
    barColor: "bg-teal-400",
  },
  {
    title: "Fitness Center",
    description:
      "An energetic website for a fitness center. Displays services, class schedules, and online membership sign-up.",
    url: "https://fitness-demo-sajt.netlify.app",
    tag: "Fitness",
    gradient: "from-orange-500 to-red-600",
    accent: "bg-orange-100 text-orange-700",
    mockupBg: "bg-orange-50",
    barColor: "bg-orange-400",
  },
  {
    title: "Construction Services",
    description:
      "A powerful, robust website for a construction company. Showcases equipment, completed projects, and references.",
    url: "https://gradjevinski-sajt-demo.netlify.app",
    tag: "Construction",
    gradient: "from-amber-600 to-orange-800",
    accent: "bg-amber-100 text-amber-800",
    mockupBg: "bg-amber-50",
    barColor: "bg-amber-500",
  },
];

export default function DemoSajtovi() {
  const { ref: cardsRef, inView: cardsInView } = useInView(0.1);

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

        .hero-a  { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-a2 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hero-a3 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
        .hero-a4 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s both; }

        .bounce-arrow { animation: bounce-x 1.6s ease-in-out infinite; }

        .cta-btn {
          animation: soft-pulse 3s ease-in-out infinite;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.02); }

        .demo-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .demo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(109,40,217,0.09);
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
      `}</style>

      <Header />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[80vh] bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 flex items-center pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
            style={{ animation: "float 11s ease-in-out infinite" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-[380px] h-[380px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none"
            style={{ animation: "float 14s ease-in-out infinite 3s" }}
          />

          {/* Decorative shapes */}
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
                <div className="inline-flex items-center gap-2 bg-white border border-violet-200 shadow-sm rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                  <span className="text-gray-600 text-sm font-medium">
                    Examples of our work
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="hero-a2 space-y-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Monitor className="w-8 h-8 text-violet-600" />
                  <span className="text-violet-600 font-semibold tracking-wide uppercase text-sm">
                    Demo Websites
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                  See what we can
                  <br />
                  <span className="text-violet-600">build for you.</span>
                </h1>
                <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
                  These are examples of websites we've built. Your website can
                  look like this — or even better.
                </p>
              </div>

              {/* Trust row */}
              <div className="hero-a3 flex justify-center gap-6 text-sm text-gray-500">
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

              {/* CTA */}
              <div className="hero-a4">
                <Link href="/order-website">
                  <button className="cta-btn bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-12 rounded-2xl text-xl flex items-center gap-3 mx-auto transition-colors">
                    <Rocket className="w-5 h-5" />
                    Order Your Website
                    <ArrowRight className="w-5 h-5 bounce-arrow" />
                  </button>
                </Link>
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
            DEMO CARDS
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-14">
              <span className="text-violet-600 font-semibold text-sm tracking-widest uppercase block mb-3">
                OUR WORK
              </span>
              <h2 className="text-4xl font-black text-gray-900">
                Website Examples
              </h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                Every website is tailored to a specific industry and the
                client's needs.
              </p>
            </div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {demos.map((demo, index) => (
                <div
                  key={index}
                  className={`demo-card bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden flex flex-col ${
                    cardsInView ? "in-view" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  {/* Browser mockup */}
                  <div className={`${demo.mockupBg} p-6`}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 ml-2 truncate">
                          {demo.url.replace("https://", "")}
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div
                          className={`h-5 w-2/3 rounded-md bg-gradient-to-r ${demo.gradient}`}
                        />
                        <div className="h-3 bg-gray-100 rounded w-full" />
                        <div className="h-3 bg-gray-100 rounded w-4/5" />
                        <div className="grid grid-cols-3 gap-2 pt-2">
                          <div
                            className={`h-14 rounded-lg ${demo.barColor} opacity-80`}
                          />
                          <div
                            className={`h-14 rounded-lg ${demo.barColor} opacity-50`}
                          />
                          <div
                            className={`h-14 rounded-lg ${demo.barColor} opacity-30`}
                          />
                        </div>
                        <div className="h-8 rounded-lg bg-gray-50 border border-gray-100" />
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {demo.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${demo.accent}`}
                      >
                        {demo.tag}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                      {demo.description}
                    </p>

                    <a
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${demo.gradient} text-white py-3 px-4 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity duration-200 group`}
                    >
                      <Monitor className="w-4 h-4" />
                      View Demo
                      <ExternalLink className="w-3.5 h-3.5 ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FINAL CTA (dark section — matches Services)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-violet-900/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-2xl relative z-10 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Like what you see?
              <br />
              <span className="text-violet-400">Your website is next.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Your website can be ready tomorrow. Contact us today!
            </p>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 space-y-5 backdrop-blur-sm">
              {/* Trust row */}
              <div className="flex justify-center gap-6 text-sm text-white/50">
                {[
                  { icon: Zap, label: "24h delivery" },
                  { icon: Star, label: "5.0 rating" },
                  { icon: Shield, label: "Guarantee" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-violet-400" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <Link href="/order-website" className="block">
                <button className="cta-btn w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xl py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors">
                  Order Website
                  <ArrowRight className="w-6 h-6 bounce-arrow" />
                </button>
              </Link>

              <Link href="/contact" className="block">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm border border-white/10">
                  Contact us →
                </button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
                <Shield className="w-4 h-4 text-teal-400" />
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
