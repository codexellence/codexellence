"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  Shield,
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const { ref: helpRef, inView: helpInView } = useInView(0.1);

  const categories = [
    { id: "all", name: "All Questions", count: 10 },
    { id: "process", name: "Development Process", count: 4 },
    { id: "technical", name: "Technologies", count: 3 },
    { id: "support", name: "Support", count: 3 },
  ];

  const faqs = [
    {
      id: 4,
      category: "process",
      question: "How long does it take to build a website?",
      answer: "Your website is ready within 24 hours of placing the order.",
    },
    {
      id: 5,
      category: "process",
      question: "What is the website development process?",
      answer:
        "The process consists of 4 steps:\n\n1. Free consultation about design and requirements\n2. Filling out a form with your website details\n3. Building the website within 24h\n4. Presenting the final result",
    },
    {
      id: 6,
      category: "process",
      question: "Do you offer free consultations?",
      answer: "Yes, the first step is a free consultation about your needs.",
    },
    {
      id: 7,
      category: "process",
      question: "What types of businesses can you build a site for?",
      answer:
        "We build websites for all types of businesses — you can list your specific requirements in the contact form.",
    },
    {
      id: 8,
      category: "technical",
      question: "What technologies do you use?",
      answer:
        "We use modern technologies such as:\n- Next.js (React Framework)\n- WordPress (CMS Platform)\n- ChatGPT (AI Assistant)\n- Figma (Design Tool)",
    },
    {
      id: 9,
      category: "technical",
      question: "How fast and secure is the website?",
      answer:
        "Websites have 99.9% uptime, are fast, and come with an SSL certificate for security.",
    },
    {
      id: 10,
      category: "technical",
      question: "Can you build a complex, large website?",
      answer:
        "Yes, for more complex websites you can get a custom quote by contacting our team.",
    },
    {
      id: 11,
      category: "support",
      question: "Do you offer support after the website is built?",
      answer: "Yes, 3 months of free support is included.",
    },
    {
      id: 12,
      category: "support",
      question: "Can you migrate an existing website?",
      answer: "Yes, you can send a migration request through our support chat.",
    },
    {
      id: 13,
      category: "support",
      question: "How can I order a website?",
      answer:
        "You can click the 'Order Your Website!' button and fill out the contact form.",
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
        @keyframes soft-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(109,40,217,0.15); }
          50% { box-shadow: 0 4px 40px rgba(109,40,217,0.28); }
        }
        @keyframes in-view-anim {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes accordion-open {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-a  { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-a2 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hero-a3 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
        .hero-a4 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s both; }

        .cta-btn {
          animation: soft-pulse 3s ease-in-out infinite;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .cta-btn:hover { transform: scale(1.02); }

        .in-view { animation: in-view-anim 0.65s cubic-bezier(0.16,1,0.3,1) both; }

        .accordion-body { animation: accordion-open 0.25s cubic-bezier(0.16,1,0.3,1) both; }

        .faq-item {
          transition: box-shadow 0.2s ease;
        }
        .faq-item:hover {
          box-shadow: 0 4px 20px rgba(109,40,217,0.07);
        }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(109,40,217,0.10) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .dark-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .cat-btn {
          transition: all 0.2s ease;
        }
        .cat-btn:hover {
          transform: translateY(-1px);
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(109,40,217,0.12);
        }
      `}</style>

      <Header />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 pt-32 pb-20 px-4 overflow-hidden">
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

          <div className="container mx-auto max-w-3xl relative z-10 text-center space-y-7">
            {/* Icon badge */}
            <div className="hero-a flex justify-center">
              <div className="w-16 h-16 bg-white border border-violet-100 shadow-sm rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-violet-600" />
              </div>
            </div>

            {/* Headline */}
            <div className="hero-a2 space-y-4">
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight">
                Frequently Asked
                <br />
                <span className="text-violet-600">Questions</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
                Find answers to the most common questions about our services. If
                you can't find what you're looking for, contact our team.
              </p>
            </div>

            {/* Search */}
            <div className="hero-a3 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-white shadow-sm text-gray-800 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="hero-a4 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cat-btn px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    activeCategory === cat.id
                      ? "bg-violet-600 text-white border-violet-600 shadow-md"
                      : "bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`ml-1.5 text-xs ${
                      activeCategory === cat.id ? "opacity-70" : "opacity-40"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FAQ ITEMS
        ══════════════════════════════════════════════════════ */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            {filteredFAQs.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-14 text-center space-y-4">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-xl font-bold text-gray-700">
                  No results found
                </h3>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search terms or choose a different
                  category.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFAQs.map((faq, idx) => {
                  const isOpen = openItems.includes(faq.id);
                  return (
                    <div
                      key={faq.id}
                      className={`faq-item bg-gray-50 border rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen
                          ? "border-violet-200 shadow-sm"
                          : "border-gray-100"
                      }`}
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-100/60 transition-colors"
                      >
                        <h3 className="text-base font-semibold text-gray-900 leading-snug">
                          {faq.question}
                        </h3>
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            isOpen
                              ? "bg-violet-600"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-white" : "text-gray-500"
                            }`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="accordion-body px-6 pb-6 pt-1">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-500 leading-relaxed text-sm whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            STILL NEED HELP (dark section)
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-violet-900/40 blur-3xl pointer-events-none" />

          <div
            ref={helpRef}
            className={`container mx-auto max-w-2xl relative z-10 text-center space-y-8 ${
              helpInView ? "in-view" : "opacity-0"
            }`}
          >
            <div className="w-14 h-14 bg-violet-500/20 border border-violet-400/20 rounded-2xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-7 h-7 text-violet-400" />
            </div>
            <h2 className="text-4xl font-black text-white">Still need help?</h2>
            <p className="text-white/50 text-lg leading-relaxed">
              Our support team is always here to help you with any question or
              issue you may have.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+123456789"
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-900 font-bold py-4 px-6 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-violet-600" />
                  Call us
                </a>
                <a
                  href="mailto:info@codexellence.com"
                  className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-6 rounded-2xl cta-btn transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Send an email
                </a>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/30 text-xs pt-2">
                <Shield className="w-4 h-4 text-teal-500" />
                We respond within 24 hours · Free support
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA
        ══════════════════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-xl relative z-10 text-center space-y-6">
            <h2 className="text-4xl font-black text-gray-900">
              Ready to take the next step?
            </h2>
            <p className="text-gray-500">
              Contact us today and your website is ready tomorrow.
            </p>
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 space-y-4">
              <a href="/poruci-sajt" className="block">
                <button className="cta-btn w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 group transition-colors">
                  Order Your Website Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a href="/kontakt" className="block">
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold py-3 rounded-2xl text-sm border border-gray-100 transition-colors">
                  Contact our team →
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
