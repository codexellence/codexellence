"use client";

import {
  Check,
  Zap,
  ArrowRight,
  BarChart3,
  Globe,
  Clock,
  X,
  Star,
  Shield,
  MousePointer2,
  FileText,
  Monitor,
  Settings,
  Sparkles,
  Smartphone,
  Tablet,
  Laptop,
  Layers3,
  Headphones,
  Search,
  Rocket,
  MessageSquare,
  TimerReset,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

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

function useInViewLoop(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useSitemapReveal(active: boolean, count: number, stepDelay = 140) {
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);
  const [showLines, setShowLines] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisibleNodes([]);
      setShowLines(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          setVisibleNodes((prev) => [...prev, i]);
        }, i * stepDelay),
      );
    }

    timers.push(
      setTimeout(
        () => {
          setShowLines(true);
        },
        count * stepDelay + 220,
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [active, count, stepDelay]);

  return { visibleNodes, showLines };
}

function MagneticButton({
  children,
  className,
  href,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const rippleId = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const btn = btnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPos({ x: x * strength, y: y * strength });
    },
    [strength],
  );

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const spawnRipple = (x: number, y: number) => {
    const id = rippleId.current++;
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
  };

  return (
    <Link
      href={href}
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={(e) => {
        const rect = btnRef.current?.getBoundingClientRect();
        const t = e.touches[0];
        if (rect && t) spawnRipple(t.clientX - rect.left, t.clientY - rect.top);
      }}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition:
          pos.x === 0 && pos.y === 0
            ? "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)"
            : "transform 0.1s ease-out",
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
      }}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
            animation: "ripple-burst 0.65s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}
    </Link>
  );
}

function RevealText({
  text,
  className,
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <span
            style={{
              display: "inline-block",
              animation: `word-in 0.8s cubic-bezier(0.16,1,0.3,1) both`,
              animationDelay: `${baseDelay + i * 0.07}s`,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

type DecorativeNode = {
  title: string;
  path: string;
  icon: any;
  x: number;
  y: number;
  accent?: "violet" | "teal";
};

function SitemapCard({
  title,
  path,
  icon: Icon,
  visible,
  accent = "violet",
}: {
  title: string;
  path: string;
  icon: any;
  visible: boolean;
  accent?: "violet" | "teal";
}) {
  const accentMap = {
    violet: {
      ring: "border-violet-200/20",
      iconWrap: "bg-violet-500/15 border border-violet-400/20",
      icon: "text-violet-300",
      glow: "shadow-[0_24px_80px_rgba(124,58,237,0.16)]",
      dot: "bg-violet-400",
      corner: "from-violet-500/20 to-fuchsia-500/10",
    },
    teal: {
      ring: "border-teal-200/20",
      iconWrap: "bg-teal-500/15 border border-teal-400/20",
      icon: "text-teal-300",
      glow: "shadow-[0_24px_80px_rgba(45,212,191,0.14)]",
      dot: "bg-teal-400",
      corner: "from-teal-500/20 to-cyan-500/10",
    },
  };

  const a = accentMap[accent];

  return (
    <div
      className={`relative w-full md:w-[230px] rounded-[28px] border ${
        a.ring
      } ${a.glow} transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-90"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="absolute inset-0 rounded-[28px] bg-white/8 backdrop-blur-xl" />
      <div
        className={`absolute top-0 right-0 w-24 h-24 rounded-tr-[28px] rounded-bl-[28px] bg-gradient-to-br ${a.corner} pointer-events-none`}
      />
      <div className="absolute inset-[1px] rounded-[27px] bg-slate-950/88 pointer-events-none" />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 rounded-2xl ${a.iconWrap} flex items-center justify-center shrink-0`}
            >
              <Icon className={`w-4 h-4 ${a.icon}`} />
            </div>

            <div className="min-w-0">
              <div className="text-white font-bold text-[15px] truncate">
                {title}
              </div>
              <div className="text-white/35 text-sm mt-1 truncate">{path}</div>
            </div>
          </div>

          <div className="text-white/20 text-lg leading-none">⋮</div>
        </div>

        <div className="h-px bg-white/8 mb-4" />

        <div className="flex items-center justify-between">
          <span className="text-blue-400 text-sm font-medium">Ready</span>
          <div className={`w-2.5 h-2.5 rounded-full ${a.dot} shadow-sm`} />
        </div>
      </div>
    </div>
  );
}

function FancySitemapSection() {
  const { ref, inView } = useInViewLoop(0.28);

  const nodes: DecorativeNode[] = [
    {
      title: "Home",
      path: "/",
      icon: Globe,
      x: 450,
      y: 24,
      accent: "violet",
    },
    {
      title: "Services",
      path: "/services",
      icon: Layers3,
      x: 110,
      y: 238,
      accent: "teal",
    },
    {
      title: "Pricing",
      path: "/pricing",
      icon: BarChart3,
      x: 450,
      y: 238,
      accent: "violet",
    },
    {
      title: "Portfolio",
      path: "/portfolio",
      icon: Monitor,
      x: 790,
      y: 238,
      accent: "teal",
    },
    {
      title: "Contact",
      path: "/contact",
      icon: MessageSquare,
      x: 255,
      y: 454,
      accent: "teal",
    },
    {
      title: "Launch",
      path: "/go-live",
      icon: Rocket,
      x: 645,
      y: 454,
      accent: "violet",
    },
  ];

  const { visibleNodes, showLines } = useSitemapReveal(
    inView,
    nodes.length,
    150,
  );
  const hub = { x: 450, y: 110 };

  const buildPath = (x: number, y: number) => {
    const startX = hub.x;
    const startY = hub.y;
    const endX = x + 115;
    const endY = y;
    const curve = Math.max(70, Math.abs(endX - startX) * 0.18);

    return `M ${startX} ${startY} C ${startX} ${startY + curve}, ${endX} ${
      endY - curve
    }, ${endX} ${endY}`;
  };

  return (
    <section
      className="py-20 sm:py-24 px-4 bg-slate-900 relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
      <div className="aurora-1 absolute -top-16 -left-20 w-[320px] h-[320px] rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="aurora-2 absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full blur-3xl opacity-45 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_42%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/5 border border-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-white/60 font-semibold text-sm tracking-widest uppercase">
              DEVELOPMENT FLOW
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white">
            From inquiry to <span className="text-violet-400">launch</span>
          </h2>

          <p className="text-white/45 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            A fast, structured process that turns your idea into a
            conversion-ready website.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[1000px] h-[620px] hidden lg:block">
          <svg
            viewBox="0 0 1000 620"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="sitemapLineSoft" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                <stop offset="45%" stopColor="rgba(124,58,237,0.55)" />
                <stop offset="100%" stopColor="rgba(45,212,191,0.34)" />
              </linearGradient>

              <filter id="sitemapGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {nodes.map((node, i) => {
              const d = buildPath(node.x, node.y);

              return (
                <g key={node.title}>
                  <path
                    d={d}
                    className={
                      showLines ? "sitemap-line is-visible" : "sitemap-line"
                    }
                    style={{ animationDelay: `${0.12 + i * 0.12}s` }}
                    stroke="url(#sitemapLineSoft)"
                    strokeWidth="1.45"
                    strokeLinecap="round"
                    filter="url(#sitemapGlow)"
                  />
                  <circle
                    cx={node.x + 115}
                    cy={node.y}
                    r="4.5"
                    className={`transition-all duration-500 ${
                      showLines ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                    fill="#0f172a"
                    stroke="rgba(255,255,255,0.34)"
                  />
                </g>
              );
            })}

            <circle
              cx={hub.x}
              cy={hub.y}
              r="5.5"
              className={`transition-all duration-500 ${
                showLines ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
              fill="#0f172a"
              stroke="rgba(255,255,255,0.42)"
            />
          </svg>

          <div
            className={`absolute left-[450px] top-[92px] -translate-x-1/2 transition-all duration-700 ${
              visibleNodes.length > 0
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-90"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div className="bg-white/10 border border-white/15 rounded-full px-4 py-2 backdrop-blur-md shadow-lg">
              <span className="text-white/85 text-sm font-semibold tracking-wide">
                Project building
              </span>
            </div>
          </div>

          {nodes.map((node, i) => (
            <div
              key={node.title}
              className="absolute"
              style={{
                left: node.x,
                top: node.y,
                transform: "translate(-50%, 0)",
              }}
            >
              <SitemapCard
                title={node.title}
                path={node.path}
                icon={node.icon}
                accent={node.accent}
                visible={visibleNodes.includes(i)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {nodes.map((node, i) => (
            <SitemapCard
              key={node.title}
              title={node.title}
              path={node.path}
              icon={node.icon}
              accent={node.accent}
              visible={visibleNodes.includes(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const heroRef = useRef<HTMLDivElement>(null);

  const { ref: statsRef, inView: statsInView } = useInView();
  const count1 = useCounter(98, 1800, statsInView);
  const count2 = useCounter(24, 1400, statsInView);
  const count3 = useCounter(150, 2000, statsInView);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      setMousePos({
        x: (relX / rect.width - 0.5) * 16,
        y: (relY / rect.height - 0.5) * 12,
      });

      setSpotlight({
        x: (relX / rect.width) * 100,
        y: (relY / rect.height) * 100,
        active: true,
      });
    };

    const handleLeave = () => setSpotlight((s) => ({ ...s, active: false }));

    const el = heroRef.current;
    el?.addEventListener("mousemove", handleMouse);
    el?.addEventListener("mouseleave", handleLeave);

    return () => {
      el?.removeEventListener("mousemove", handleMouse);
      el?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const technologies = [
    {
      name: "Next.js",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
      description: "Fast React framework",
    },
    {
      name: "WordPress",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg",
      description: "Flexible CMS",
    },
    {
      name: "ChatGPT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      description: "AI workflow support",
    },
    {
      name: "Figma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      description: "UI and brand design",
    },
  ];

  const sellingPoints = [
    {
      icon: Smartphone,
      title: "Perfect on every screen",
      text: "Your site is designed for phone, tablet, and desktop from the start.",
    },
    {
      icon: Rocket,
      title: "Fast launch",
      text: "You get a polished first version fast, without endless waiting.",
    },
    {
      icon: Search,
      title: "Built to convert",
      text: "Clear structure, strong messaging, and action-driven sections that win inquiries.",
    },
    {
      icon: Headphones,
      title: "Support after delivery",
      text: "We stay available for fixes, updates, and guidance after launch.",
    },
    {
      icon: Shield,
      title: "Trust and security",
      text: "SSL, hosting guidance, performance checks, and a reliable setup.",
    },
    {
      icon: Sparkles,
      title: "Custom visual identity",
      text: "No generic template feel, your website looks tailored to your brand.",
    },
  ];

  const objections = [
    {
      title: "Too slow with other agencies?",
      text: "We focus on a streamlined workflow so you get momentum fast instead of waiting for weeks.",
      icon: TimerReset,
    },
    {
      title: "Worried it won’t look premium?",
      text: "We build modern layouts with motion, strong hierarchy, and a polished visual system.",
      icon: Layers3,
    },
    {
      title: "Need edits after launch?",
      text: "You’re not left alone after delivery, support and guidance stay part of the experience.",
      icon: Headphones,
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Quick consultation",
      description: "We align on your offer, style, pages, and goals.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Content & structure",
      description: "We map the sections, selling points, and messaging.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Design & development",
      description:
        "We build a premium responsive website with motion and clarity.",
      icon: Monitor,
    },
    {
      number: "04",
      title: "Launch & support",
      description:
        "You go live with confidence and keep support after delivery.",
      icon: Rocket,
    },
  ];

  const testimonials = [
    {
      name: "Marko P.",
      role: "Restaurant owner",
      text: "In less than a day I had a website that looked better than competitors who'd been waiting for months!",
      stars: 5,
    },
    {
      name: "Ana K.",
      role: "Beauty salon",
      text: "Incredible speed and professionalism. Clients ask me every day who built my website.",
      stars: 5,
    },
    {
      name: "Stefan M.",
      role: "IT consultant",
      text: "The quality of the work is genuinely top-notch. I recommend it to anyone who wants a fast, quality solution.",
      stars: 5,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Outfit', sans-serif; }

        html {
          scroll-behavior: smooth;
        }

        body {
          overflow-x: hidden;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
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

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes soft-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(109,40,217,0.15); }
          50% { box-shadow: 0 4px 40px rgba(109,40,217,0.28); }
        }

        @keyframes in-view-anim {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes aurora-drift-1 {
          0%   { transform: translate(0, 0) scale(1); background: radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%); }
          33%  { transform: translate(60px, 40px) scale(1.15); background: radial-gradient(circle, rgba(56,189,248,0.32), transparent 70%); }
          66%  { transform: translate(-40px, 60px) scale(0.95); background: radial-gradient(circle, rgba(236,72,153,0.3), transparent 70%); }
          100% { transform: translate(0, 0) scale(1); background: radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%); }
        }

        @keyframes aurora-drift-2 {
          0%   { transform: translate(0, 0) scale(1); background: radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%); }
          50%  { transform: translate(-70px, -30px) scale(1.2); background: radial-gradient(circle, rgba(124,58,237,0.28), transparent 70%); }
          100% { transform: translate(0, 0) scale(1); background: radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%); }
        }

        .aurora-1 { animation: aurora-drift-1 14s ease-in-out infinite; }
        .aurora-2 { animation: aurora-drift-2 18s ease-in-out infinite; }

        .spotlight {
          background: radial-gradient(600px circle at var(--sx) var(--sy), rgba(124,58,237,0.10), transparent 40%);
          transition: opacity 0.3s ease;
        }

        @keyframes word-in {
          from { opacity: 0; transform: translateY(100%) rotate(4deg); }
          to   { opacity: 1; transform: translateY(0) rotate(0deg); }
        }

        @keyframes ripple-burst {
          from { transform: scale(0); opacity: 0.7; }
          to   { transform: scale(22); opacity: 0; }
        }

        @keyframes sheen-sweep {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(220%) skewX(-20deg); }
        }

        .sheen {
          position: absolute;
          top: -20%;
          left: 0;
          width: 30%;
          height: 140%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          animation: sheen-sweep 3.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 24s linear infinite;
        }

        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
        }

        .glow-badge { animation: glow-pulse 2.4s ease-in-out infinite; }

        .hero-a  { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-a2 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s both; }
        .hero-a3 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s both; }
        .hero-a4 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.36s both; }
        .hero-a5 { animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.48s both; }

        .mockup-float { animation: float 7s ease-in-out infinite; }
        .badge-float1 { animation: float 5s ease-in-out infinite 1s; }
        .badge-float2 { animation: float 6s ease-in-out infinite 2s; }
        .badge-float3 { animation: float 7s ease-in-out infinite 0.5s; }
        .bounce-arrow  { animation: bounce-x 1.6s ease-in-out infinite; }

        .card-lift {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease;
        }

        .card-lift:hover {
          transform: translateY(-6px);
        }

        .tech-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .tech-card:hover { transform: translateY(-5px); box-shadow: 0 12px 28px rgba(109,40,217,0.08); }

        .tcard { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .tcard:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,0.06); }

        .cta-btn { animation: soft-pulse 3s ease-in-out infinite; transition: transform 0.2s ease, background-color 0.2s ease; }
        .cta-btn:hover { transform: scale(1.04); }
        .cta-btn:active { transform: scale(0.97); }

        .in-view { animation: in-view-anim 0.65s cubic-bezier(0.16,1,0.3,1) both; }

        .dot-grid {
          background-image: radial-gradient(circle, rgba(109,40,217,0.10) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .dark-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        @keyframes sitemap-draw {
          from {
            stroke-dashoffset: 1;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .sitemap-line {
          path-length: 1;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
        }

        .sitemap-line.is-visible {
          animation: sitemap-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .aurora-1, .aurora-2, .sheen, .marquee-track, .glow-badge, .cta-btn,
          .mockup-float, .badge-float1, .badge-float2, .badge-float3, .bounce-arrow,
          .sitemap-line, .sitemap-line.is-visible {
            animation: none !important;
          }

          .sitemap-line,
          .sitemap-line.is-visible {
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }

        @media (max-width: 1024px) {
          .spotlight { display: none; }
        }

        @media (max-width: 768px) {
          .sheen { animation-duration: 4.5s; }
        }
      `}</style>

      <main className="overflow-x-hidden">
        <section
          ref={heroRef}
          className="relative min-h-screen bg-gradient-to-br from-white via-purple-50/70 to-indigo-50/50 flex items-center pt-24 pb-16 sm:pb-20 overflow-hidden"
        >
          <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />
          <div className="aurora-1 absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none" />
          <div className="aurora-2 absolute top-1/2 -right-40 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none" />

          <div
            className="spotlight absolute inset-0 pointer-events-none"
            style={{
              ["--sx" as any]: `${spotlight.x}%`,
              ["--sy" as any]: `${spotlight.y}%`,
              opacity: spotlight.active ? 1 : 0,
            }}
          />

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8">
                <div className="hero-a">
                  <div className="glow-badge inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-gray-600 text-sm font-medium">
                      Available now — no waiting
                    </span>
                  </div>
                </div>

                <div className="hero-a2 space-y-5">
                  <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.02] tracking-tight">
                    <RevealText text="Premium websites" baseDelay={0.1} />
                    <br />
                    <span className="text-violet-600">
                      <RevealText text="that sell for you." baseDelay={0.35} />
                    </span>
                  </h1>

                  <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-xl">
                    We build modern, responsive websites with strong design,
                    fast delivery, and clear selling structure — optimized for
                    phone, tablet, and desktop.
                  </p>
                </div>

                <div className="hero-a3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Custom website design",
                    "Responsive on every device",
                    "SEO-ready page structure",
                    "Support after launch",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-xl px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hero-a5 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <MagneticButton
                      href="/contact"
                      className="cta-btn w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-bold text-lg items-center justify-center gap-3 group"
                    >
                      Get a Free Quote
                      <ArrowRight className="w-5 h-5 bounce-arrow ml-3" />
                    </MagneticButton>

                    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-5 py-3 flex items-center justify-center sm:justify-start gap-3 text-gray-500 text-sm">
                      <Clock className="w-4 h-4 text-violet-500" />
                      Delivered within 24 hours
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-teal-500" />
                      No obligation
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-violet-500" />
                      Fully responsive
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-500" />
                      Premium design
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative flex justify-center xl:justify-end"
                style={{
                  transform: `perspective(1400px) rotateY(${
                    -mousePos.x * 0.6
                  }deg) rotateX(${mousePos.y * 0.4}deg)`,
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="mockup-float relative w-full max-w-[380px] sm:max-w-[420px]">
                  <div
                    className="bg-white rounded-3xl border border-gray-100 p-1 relative overflow-hidden"
                    style={{
                      boxShadow:
                        "0 32px 80px rgba(109,40,217,0.14), 0 4px 16px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="sheen" />

                    <div className="bg-gray-50 rounded-2xl p-3 mb-1 flex items-center gap-2 relative z-10">
                      <div className="w-3 h-3 bg-red-400 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="w-3 h-3 bg-green-400 rounded-full" />
                      <div className="flex-1 bg-gray-200 rounded-lg px-3 py-1 text-center text-gray-400 text-xs">
                        yourbrand.com
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 sm:p-5 space-y-3 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="h-2.5 bg-violet-500 rounded-full w-3/4" />
                        <div className="text-white/60 text-[10px] sm:text-xs font-medium bg-white/10 rounded-full px-2 py-1">
                          Live preview
                        </div>
                      </div>

                      <div className="h-2 bg-white/15 rounded-full" />
                      <div className="h-2 bg-white/15 rounded-full w-5/6" />

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="h-24 sm:h-28 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex flex-col items-center justify-center gap-2">
                          <Zap className="w-8 h-8 text-white/75" />
                          <span className="text-white/80 text-xs font-semibold">
                            Fast delivery
                          </span>
                        </div>
                        <div className="h-24 sm:h-28 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex flex-col items-center justify-center gap-2">
                          <Globe className="w-8 h-8 text-white/75" />
                          <span className="text-white/80 text-xs font-semibold">
                            Responsive design
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {[Smartphone, Tablet, Laptop].map((Icon, i) => (
                          <div
                            key={i}
                            className="h-14 bg-white/6 rounded-xl border border-white/8 flex items-center justify-center"
                          >
                            <Icon className="w-5 h-5 text-white/60" />
                          </div>
                        ))}
                      </div>

                      <div className="h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          Request a quote
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="badge-float1 absolute -top-4 -right-2 sm:-right-5 bg-teal-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 font-bold text-sm">
                    <Zap className="w-4 h-4" /> Ready in 24h
                  </div>

                  <div className="badge-float2 absolute -bottom-5 left-0 sm:-left-5 bg-white rounded-2xl p-3 shadow-xl border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-violet-600 fill-violet-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Client rating</div>
                      <div className="font-black text-gray-900 text-sm">
                        5.0 ★★★★★
                      </div>
                    </div>
                  </div>

                  <div className="badge-float3 absolute top-1/2 -right-2 sm:-right-12 bg-white border border-gray-100 shadow-lg px-3 py-2 rounded-xl text-xs font-medium">
                    <div className="text-green-600 font-bold">● Online</div>
                    <div className="text-gray-400">SSL active</div>
                  </div>
                </div>

                <div className="absolute inset-0 hidden xl:flex items-center justify-center pointer-events-none opacity-8">
                  <svg
                    width="420"
                    height="420"
                    style={{ animation: "spin-slow 28s linear infinite" }}
                  >
                    <circle
                      cx="210"
                      cy="210"
                      r="200"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="0.8"
                      strokeDasharray="5 15"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-300 text-xs">
            <MousePointer2 className="w-4 h-4" />
            <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
          </div>
        </section>

        <div
          ref={statsRef}
          className="bg-white border-y border-gray-100 py-12 sm:py-14 px-4"
        >
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                {
                  value: count1,
                  suffix: "%",
                  label: "Satisfied clients",
                  color: "text-violet-600",
                },
                {
                  value: count2,
                  suffix: "h",
                  label: "Average first delivery",
                  color: "text-teal-600",
                },
                {
                  value: count3,
                  suffix: "+",
                  label: "Websites delivered",
                  color: "text-gray-800",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`space-y-1 ${
                    statsInView ? "in-view" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <div
                    className={`text-5xl sm:text-6xl font-black ${stat.color}`}
                  >
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 mb-4 bg-violet-50 border border-violet-100 rounded-full px-4 py-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-violet-700 font-semibold text-sm tracking-widest uppercase">
                  WHY THIS WORKS
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Selling design, not just a website
              </h2>

              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                Your website should look impressive, load well, explain your
                offer clearly, and push visitors toward contact or purchase.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sellingPoints.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="card-lift bg-gray-50 border border-gray-100 rounded-3xl p-7 shadow-sm hover:border-violet-200 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center mb-5 shadow-md shadow-violet-100">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="aurora-2 absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-60" />
          <div className="aurora-1 absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-50" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-14 mb-6">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-block bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    WEBSITE CREATION
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                    Turn your idea
                    <br />
                    into a client-winning website
                  </h2>

                  <p className="text-white/50 text-lg leading-relaxed">
                    We combine structure, branding, copy, motion, and
                    responsiveness to build a site that looks premium and helps
                    your business convert better.
                  </p>

                  <MagneticButton
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 bg-white text-violet-700 font-bold px-7 py-4 rounded-2xl w-full sm:w-auto"
                  >
                    Get started now
                    <ArrowRight className="w-5 h-5" />
                  </MagneticButton>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-6 border border-white/8">
                  <div className="bg-violet-600/20 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-xl text-sm mb-4 inline-block">
                    💬 I want a website for my restaurant
                  </div>

                  <div className="bg-slate-700/60 rounded-2xl p-5 mb-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
                      <span className="text-white/50 text-sm">
                        Building your website...
                      </span>
                    </div>

                    <div className="text-white font-bold text-xl">
                      We translate your idea into layout, copy, and launch-ready
                      design.
                    </div>

                    <div className="bg-slate-600/60 rounded-xl p-3 text-white/40 text-sm italic">
                      "I want a warm color palette, online reservations, and a
                      clean mobile experience..."
                    </div>
                  </div>

                  <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition-colors">
                    Send inquiry →
                  </button>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <div className="grid sm:grid-cols-2 gap-6 items-center">
                  <div className="space-y-5">
                    <div className="inline-block bg-teal-600/20 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      MAINTENANCE
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      Your website stays in safe hands.
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed">
                      Support, updates, optimization, and a smoother post-launch
                      experience.
                    </p>

                    <button className="group inline-flex items-center gap-2 text-teal-400 font-semibold text-sm hover:gap-3 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl p-4 space-y-3">
                    <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full inline-block">
                      ● SSL ACTIVE
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-700 mb-2">
                        Hosting & performance
                      </div>
                      <div className="w-16 h-16 mx-auto bg-teal-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-sm">
                          99.99%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Speed</span>
                        <Zap className="w-3 h-3 text-yellow-500" />
                      </div>
                      <div className="flex justify-between">
                        <span>Visitors</span>
                        <span className="font-bold text-gray-700">1,482</span>
                      </div>
                    </div>

                    <div className="h-6 bg-gray-100 rounded flex items-end gap-0.5 px-1">
                      {[60, 80, 100, 40, 70, 90, 55].map((hv, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-violet-400 rounded-t"
                          style={{ height: `${hv}%`, opacity: 0.5 + i * 0.07 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 transition-colors duration-300">
                <div className="h-full flex flex-col justify-between gap-8">
                  <div>
                    <div className="w-12 h-12 bg-violet-500/20 border border-violet-400/20 rounded-2xl flex items-center justify-center mb-6">
                      <Globe className="w-6 h-6 text-violet-400" />
                    </div>

                    <h3 className="text-3xl font-bold text-white leading-snug mb-4">
                      Contact us today —
                      <br />
                      your website can be ready tomorrow
                    </h3>

                    <p className="text-white/45 text-sm leading-relaxed">
                      Fast process, premium presentation, and a result designed
                      to impress your clients.
                    </p>
                  </div>

                  <div className="bg-white/8 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/70 font-medium text-sm">
                      codexellence.com online
                    </span>
                    <span className="ml-auto text-white/30 text-xs">
                      99.9% uptime
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FancySitemapSection />

        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-violet-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-violet-600 font-semibold text-sm tracking-widest uppercase">
                  PROCESS
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                Fast, clear, and{" "}
                <span className="text-violet-600">structured</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative">
              <div className="hidden xl:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-100 via-violet-300 to-violet-100 z-0" />
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="card-lift bg-white rounded-3xl p-7 shadow-sm border border-gray-100 text-center relative z-10 hover:shadow-xl hover:border-violet-200"
                  >
                    <div className="absolute top-5 left-5 w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-violet-600" />
                    </div>

                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md shadow-violet-100">
                      <span className="text-white text-2xl font-black">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <span className="text-violet-600 font-semibold text-sm tracking-widest uppercase block mb-3">
                REVIEWS
              </span>
              <h2 className="text-4xl font-black text-gray-900">
                What our clients say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="tcard bg-gray-50 border border-gray-100 rounded-3xl p-7 space-y-4"
                >
                  <div className="flex gap-1">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-gray-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 dark-dot-grid pointer-events-none" />
          <div className="aurora-1 absolute -left-20 top-10 w-[260px] h-[260px] rounded-full blur-3xl opacity-40 pointer-events-none" />
          <div className="aurora-2 absolute right-0 bottom-0 w-[320px] h-[320px] rounded-full blur-3xl opacity-40 pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-14">
              <span className="text-teal-400 font-semibold text-sm tracking-widest uppercase block mb-3">
                OBJECTION HANDLING
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Why businesses choose us
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {objections.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-violet-300" />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-50 relative overflow-hidden">
          <div
            className="absolute top-10 right-10 w-7 h-7 bg-violet-300 rounded-lg rotate-12 opacity-25"
            style={{ animation: "floatB 6s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-12 right-24 w-5 h-5 bg-purple-300 rounded-lg rotate-45 opacity-20"
            style={{ animation: "floatB 8s ease-in-out infinite 2s" }}
          />

          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                  We’re here{" "}
                  <span className="text-violet-600">before and after</span>{" "}
                  launch
                </h2>

                <div className="space-y-4">
                  {[
                    "Fast responses to questions and edits",
                    "Continuous system and performance monitoring",
                    "Support for changes, growth, and optimization",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-violet-200 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-md mx-auto w-full">
                <div className="bg-violet-700 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white font-semibold text-sm">
                      Codexellence support
                    </span>
                  </div>
                  <X className="w-5 h-5 text-white/40" />
                </div>

                <div className="p-5 space-y-4 bg-violet-50 min-h-[180px]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">
                      C
                    </div>
                    <div className="bg-violet-600 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm">
                        I noticed my website is slow, can you help?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-9 h-9 rounded-full bg-violet-600 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                      S
                    </div>
                    <div className="bg-white text-gray-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs shadow-sm border border-gray-100">
                      <p className="text-sm">
                        Yes — we’ll optimize it right away and keep you updated.
                        ✅
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                The technologies that power us
              </h2>
              <p className="text-gray-400 mt-3 text-sm">
                Modern tools for fast, scalable, and visually strong websites
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, i) => (
                <div
                  key={i}
                  className="tech-card bg-gray-50 border border-gray-100 rounded-3xl p-6 flex flex-col items-center text-center"
                >
                  <div className="w-full h-20 flex items-center justify-center mb-4">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="max-h-full max-w-[80%] object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                  <p className="text-gray-400 text-xs">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-br from-white via-purple-50/60 to-indigo-50/40 relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full bg-violet-200/25 blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-3xl relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/70 border border-violet-100 rounded-full px-4 py-2">
              <Rocket className="w-4 h-4 text-violet-600" />
              <span className="text-violet-700 font-semibold text-sm uppercase tracking-wide">
                Final call
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
              Ready to look
              <br />
              <span className="text-violet-600">credible online?</span>
            </h2>

            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              Every day without a strong website is a missed opportunity for new
              clients, better trust, and more inquiries.
            </p>

            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-12 space-y-6">
              <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-500">
                <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  24h first delivery
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  Fully responsive
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  No obligation quote
                </div>
              </div>

              <MagneticButton
                href="/contact"
                className="cta-btn w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xl py-5 rounded-2xl items-center justify-center gap-3 group"
                strength={0.25}
              >
                Get a Free Quote
                <ArrowRight className="w-6 h-6 ml-3" />
              </MagneticButton>

              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-500" />
                  No obligation
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-violet-500" />
                  Responsive on all devices
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-teal-500" />
                  Support included
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
