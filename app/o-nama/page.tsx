"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Target,
  Heart,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

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

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function AboutUs() {
  const { ref: statsRef, inView: statsInView } = useInView(0.1);
  const { ref: valuesRef, inView: valuesInView } = useInView(0.1);
  const { ref: storyRef, inView: storyInView } = useInView(0.1);

  const count1 = useCounter(100, 1600, statsInView);

  const values = [
    {
      icon: Heart,
      title: "Client comes first",
      description:
        "The main driver behind every decision we make is our clients — delivering top-notch service is our priority.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "We prioritize online security so our clients can always trust us again and again.",
    },
    {
      icon: Zap,
      title: "Speed",
      description:
        "Every task we take on is completed as efficiently, precisely, and quickly as possible.",
    },
    {
      icon: Users,
      title: "Team of experts",
      description:
        "Our team of experts is always here to help you solve any problem and keep growing.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      label: "Founded with a team of 3",
      color: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      year: "2024",
      label: "Our first client placed their trust in us",
      color: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      year: "2025",
      label: "Over 100 clients and the 24h website launch",
      color: "bg-indigo-100",
      iconColor: "text-indigo-600",
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

        .hero-a  { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-a2 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hero-a3 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both; }

        .bounce-arrow { animation: bounce-x 1.6s ease-in-out infinite; }

        .cta-btn {
          animation: soft-pulse 3s ease-in-out infinite;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.02); }

        .value-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(109,40,217,0.09);
        }

        .stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(109,40,217,0.09);
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
        <section className="relative bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
          <div
            className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
            style={{ animation: "float 11s ease-in-out infinite" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-[360px] h-[360px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none"
            style={{ animation: "float 14s ease-in-out infinite 3s" }}
          />

          <div
            className="absolute top-24 right-24 w-6 h-6 bg-violet-300 rounded-md rotate-12 opacity-25"
            style={{ animation: "floatB 6s ease-in-out infinite" }}
          />
          <div
            className="absolute top-40 right-44 w-4 h-4 bg-purple-300 rounded-md rotate-45 opacity-20"
            style={{ animation: "floatB 8s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute bottom-16 right-20 w-5 h-5 bg-violet-400 rounded-md rotate-12 opacity-20"
            style={{ animation: "floatB 7s ease-in-out infinite 2s" }}
          />

          <div className="container mx-auto max-w-4xl relative z-10 text-center space-y-6">
            <div className="hero-a">
              <div className="inline-flex items-center gap-2 bg-white border border-violet-100 shadow-sm rounded-full px-4 py-2 mb-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                <span className="text-gray-600 text-sm font-medium">
                  Meet the team behind Codexellence
                </span>
              </div>
            </div>
            <div className="hero-a2 space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                About <span className="text-violet-600">us</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
                Our mission is to make building websites simple, reliable, and
                accessible to everyone. We're here to support your success
                online.
              </p>
            </div>
            <div className="hero-a3 flex justify-center gap-4 pt-2">
              <Link href="/kontakt">
                <button className="cta-btn bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-3 transition-colors">
                  Contact us
                  <ArrowRight className="w-5 h-5 bounce-arrow" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STATS
        ══════════════════════════════════════════════════════ */}
        <div
          ref={statsRef}
          className="bg-white border-y border-gray-100 py-14 px-4"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: `${count1}+`,
                  label: "Happy clients",
                  color: "text-violet-600",
                },
                {
                  value: "99.9%",
                  label: "Uptime guarantee",
                  color: "text-teal-600",
                },
                { value: "24/7", label: "Support", color: "text-gray-900" },
                {
                  value: "2+",
                  label: "Years of experience",
                  color: "text-indigo-600",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`stat-card bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center ${
                    statsInView ? "in-view" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`text-4xl font-black ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            STORY (dark section)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-violet-900/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

          <div
            ref={storyRef}
            className="container mx-auto max-w-6xl relative z-10"
          >
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div
                className={`space-y-6 ${storyInView ? "in-view" : "opacity-0"}`}
              >
                <span className="text-violet-400 font-semibold text-sm tracking-widest uppercase">
                  OUR STORY
                </span>
                <h2 className="text-4xl font-black text-white leading-tight">
                  From an idea to a
                  <br />
                  <span className="text-violet-400">trusted partner</span>
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed">
                  <p>
                    Founded in 2023, we started with a simple belief: building
                    websites should be fast, high-quality, and accessible. What
                    began as a small team of passionate developers has grown
                    into a reliable platform.
                  </p>
                  <p>
                    We built our process from the ground up, focused on speed,
                    security, and design. Today, we're a trusted partner to many
                    companies looking for a quality online presence.
                  </p>
                  <p>
                    We keep innovating and expanding our services, always
                    keeping our clients' success at the center of everything we
                    do.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div
                className={`bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 ${
                  storyInView ? "in-view" : "opacity-0"
                }`}
                style={{ animationDelay: "0.18s" }}
              >
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div
                      className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                    >
                      <CheckCircle className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">
                        {item.year}
                      </div>
                      <div className="text-white/50 text-sm">{item.label}</div>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="absolute left-[2.75rem] mt-12 w-px h-6 bg-white/10 hidden lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            VALUES
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <span className="text-violet-600 font-semibold text-sm tracking-widest uppercase block mb-3">
                VALUES
              </span>
              <h2 className="text-4xl font-black text-gray-900">Our values</h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                These key principles guide everything we do and shape how we
                deliver our services.
              </p>
            </div>

            <div
              ref={valuesRef}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className={`value-card bg-white border border-gray-100 rounded-3xl p-7 text-center space-y-4 ${
                      valuesInView ? "in-view" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto">
                      <Icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {v.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            MISSION
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-violet-900/40 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-3xl relative z-10 text-center space-y-8">
            <div className="w-16 h-16 bg-violet-500/20 border border-violet-400/20 rounded-2xl flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-4xl font-black text-white">Our mission</h2>
            <p className="text-white/50 text-xl leading-relaxed">
              Our mission is to give businesses of every size reliable, fast,
              and secure web solutions, backed by exceptional support that helps
              them succeed in the digital world.
            </p>
            <div className="flex justify-center gap-8 pt-4">
              {[
                { icon: Zap, label: "Fast" },
                { icon: Shield, label: "Secure" },
                { icon: Star, label: "High quality" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 text-white/40"
                  >
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-2xl relative z-10 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Ready to get
              <br />
              <span className="text-violet-600">started?</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Join over 100 clients who have already established their presence
              online.
            </p>

            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10 space-y-4">
              <div className="flex justify-center gap-6 text-sm text-gray-500 pb-2">
                {[
                  { icon: Users, label: "100+ clients" },
                  { icon: Shield, label: "Guarantee" },
                  { icon: Star, label: "5.0 rating" },
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
                  Contact our team
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link href="/usluge" className="block">
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm border border-gray-100">
                  View our services →
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
