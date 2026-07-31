"use client";

import { useState, useEffect, useRef } from "react";
import {
  Check,
  ArrowRight,
  Clock,
  Zap,
  Shield,
  Star,
  Globe,
  Palette,
  HeadphonesIcon,
  BarChart3,
  Lock,
  Rocket,
  MousePointer2,
} from "lucide-react";
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

export default function ProductPage() {
  const { ref: whyRef, inView: whyInView } = useInView(0.1);
  const { ref: stepsRef, inView: stepsInView } = useInView(0.1);

  const features = [
    "Professional website creation",
    "Visual content creation",
    "Free ongoing support",
    "SSL certificate included",
    "Speed optimization",
    "Responsive design",
  ];

  const whyUs = [
    {
      icon: Zap,
      title: "Ready in 24h",
      description:
        "While the competition makes you wait weeks, your website is ready tomorrow morning.",
    },
    {
      icon: Palette,
      title: "Premium design",
      description:
        "Every website is unique — tailored to your brand and your vision.",
    },
    {
      icon: HeadphonesIcon,
      title: "Ongoing support",
      description:
        "We're not just here for the build. We stay with you after launch too.",
    },
    {
      icon: Globe,
      title: "Visible online",
      description:
        "An SEO-optimized website that Google notices and users find.",
    },
    {
      icon: BarChart3,
      title: "Speed = conversion",
      description:
        "A website optimized for maximum loading speed on every device.",
    },
    {
      icon: Lock,
      title: "Security",
      description:
        "SSL certificate and advanced protection for your visitors' data.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Contact us",
      description:
        "Reach out and let's work out all the details of your website.",
    },
    {
      number: "02",
      title: "Fill out the form",
      description: "Send us details about your business and preferences.",
    },
    {
      number: "03",
      title: "We get to work",
      description:
        "Our team starts immediately — your site is ready in 24 hours.",
    },
    {
      number: "04",
      title: "You grow",
      description: "You get a finished website and start attracting clients.",
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
        .hero-a4 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s both; }
        .hero-a5 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.48s both; }

        .bounce-arrow { animation: bounce-x 1.6s ease-in-out infinite; }

        .cta-btn {
          animation: soft-pulse 3s ease-in-out infinite;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.02); }

        .why-card {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .why-card:hover {
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

        .feature-item {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .feature-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(109,40,217,0.07);
        }
      `}</style>

      <Header />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 flex items-center pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-3xl pointer-events-none"
            style={{ animation: "float 11s ease-in-out infinite" }}
          />
          <div
            className="absolute top-1/2 -right-40 w-[380px] h-[380px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none"
            style={{ animation: "float 14s ease-in-out infinite 3s" }}
          />
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

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* ── LEFT ── */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="hero-a">
                  <div className="inline-flex items-center gap-2 bg-white border border-orange-200 shadow-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-gray-600 text-sm font-medium">
                      Get started today
                    </span>
                  </div>
                </div>

                {/* Eyebrow + headline */}
                <div className="hero-a2 space-y-4">
                  <div className="flex items-center gap-3">
                    <Rocket className="w-7 h-7 text-violet-600" />
                    <span className="text-violet-600 font-semibold tracking-wide uppercase text-sm">
                      Express Website
                    </span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight">
                    Your website ready
                    <br />
                    <span className="text-violet-600">in 24 hours.</span>
                  </h1>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Professional creation of a modern, fast, and responsive
                    website — no waiting, no complications.
                  </p>
                </div>

                {/* Feature checklist */}
                <div className="hero-a3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <div
                      key={i}
                      className="feature-item bg-white border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm"
                    >
                      <div className="w-6 h-6 bg-teal-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-teal-500" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="hero-a5 flex flex-col sm:flex-row items-start gap-4">
                  <a href="/contact">
                    <button className="cta-btn bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-colors">
                      Get a Free Quote
                      <ArrowRight className="w-5 h-5 bounce-arrow" />
                    </button>
                  </a>
                  <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-3 flex items-center gap-2 text-gray-500 text-sm">
                    <Clock className="w-4 h-4 text-violet-500" />
                    Delivered within 24 hours
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Shield className="w-4 h-4 text-teal-500" />
                  No obligation · We'll get back to you within a few hours
                </div>
              </div>

              {/* ── RIGHT — mockup ── */}
              <div className="relative hero-a2">
                <div className="bg-gradient-to-br from-violet-100 to-indigo-100 rounded-3xl p-8 relative overflow-hidden">
                  <div
                    className="absolute top-6 right-6 w-20 h-20 bg-violet-300 rounded-xl opacity-20 rotate-12"
                    style={{ animation: "floatB 7s ease-in-out infinite" }}
                  />
                  <div
                    className="absolute bottom-6 left-6 w-28 h-28 bg-teal-300 rounded-xl opacity-20 -rotate-12"
                    style={{ animation: "floatB 9s ease-in-out infinite 2s" }}
                  />

                  <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <div className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
                        yourbrand.com
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 bg-violet-100 rounded-xl flex items-center px-3">
                        <span className="text-violet-600 font-bold text-sm">
                          Welcome to our website
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-lg" />
                      <div className="h-3 bg-gray-100 rounded-lg w-3/4" />
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="h-24 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            Premium
                          </span>
                        </div>
                        <div className="h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm z-20">
                    <Zap className="w-4 h-4" />
                    24h
                  </div>
                  <div className="absolute -bottom-4 left-8 bg-white shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 z-20">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-violet-600 fill-violet-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Client rating</div>
                      <div className="font-black text-gray-900">5.0 / 5.0</div>
                    </div>
                  </div>
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
            TRUST STRIP
        ══════════════════════════════════════════════════════ */}
        <section className="border-y border-gray-100 py-8 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { value: "24h", label: "Website delivery" },
                { value: "99%", label: "Satisfied clients" },
                { value: "5.0", label: "Average rating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-black text-violet-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHY US
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <span className="text-violet-600 font-semibold text-sm tracking-widest uppercase block mb-3">
                WHY US
              </span>
              <h2 className="text-4xl font-black text-gray-900">
                Everything your business needs online
              </h2>
            </div>

            <div
              ref={whyRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {whyUs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`why-card bg-gray-50 border border-gray-100 rounded-3xl p-8 space-y-4 ${
                      whyInView ? "in-view" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS (dark section)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-violet-900/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-14">
              <span className="text-violet-400 font-semibold text-sm tracking-widest uppercase block mb-3">
                PROCESS
              </span>
              <h2 className="text-4xl font-black text-white">
                How does it work?
              </h2>
            </div>

            <div
              ref={stepsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div
                    className={`bg-white/5 border border-white/10 rounded-3xl p-6 text-center h-full backdrop-blur-sm ${
                      stepsInView ? "in-view" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-black">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-3 z-10">
                      <ArrowRight className="w-5 h-5 text-violet-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-2xl relative z-10 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Ready to take the next step?
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Join clients who are already online. Reach out today, be visible
              tomorrow.
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

              <a href="/contact" className="block">
                <button className="cta-btn w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xl py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors">
                  Get a Free Quote
                  <ArrowRight className="w-6 h-6 bounce-arrow" />
                </button>
              </a>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Shield className="w-4 h-4 text-teal-500" />
                No obligation · Satisfaction guaranteed
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
