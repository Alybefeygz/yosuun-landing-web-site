"use client";

import { useEffect, useMemo, useRef, useState } from "react";
const navItems = [
  "Home",
  "About us",
  "Services",
  "Work",
  "Team",
  "Pricing",
  "Awards",
];

const avatarPalette = [
  { name: "Sofia", from: "#d6b6ff", to: "#3f2bff" },
  { name: "Mateo", from: "#c6f6d5", to: "#2ec4b6" },
  { name: "Amir", from: "#fdd6a7", to: "#f47c2c", image: "/sidrex.jpg" },
  { name: "Jade", from: "#b4e1fa", to: "#4d7cfe", image: "/fosil.jpg" },
  { name: "Noah", from: "#ffc2d0", to: "#ff6b81", image: "/swiftypartner_logo.jpeg" },
];

const logoStrip = [
  { name: "Swifty", color: "#1f2937" },
  { name: "Fosil", color: "#4338ca" },
  { name: "Sidrex", color: "#15803d" },
  { name: "Shazel", color: "#0f172a" },
  { name: "Red Castel", color: "#1d4ed8" },
];

const statBlocks = [
  { label: "Manuel Müdahale", value: "0" },
  { label: "Otomatik Takip", value: <>24<span className="text-4xl">/</span>7</> },
  { label: "Kendi Kendine Karar", value: <span className="inline-block translate-y-[36px] text-[2em] leading-[0]">∞</span> },
];

const services = [
  { title: "Ajans", icon: "", bg: "#ccfac5", text: "#5b3db4", image: "/Ajans.png" },
  { title: "Girişimci", icon: "", bg: "#ccfac5", text: "#c45d6d", image: "/girisimci.png" },
  { title: "Satıcı", icon: "", bg: "#ccfac5", text: "#2a74c7", image: "/satici.png" },
  { title: "Markalar", icon: "", bg: "#ccfac5", text: "#5b3db4", image: "/marka.png" },
];

const caseStudies = [
  {
    title: "Zamanı sadece takip etmez, anlamını çözer.",
    subtitle: "Sezonları, özel günleri ve piyasa hareketlerini önceden fark eder. Doğru anda doğru aksiyonun alınmasını sağlar.",
    tags: ["Zamanlama", "Öngörü", "Doğru An"],
    gradient: "linear-gradient(135deg, #efe5ff 0%, #d8ccf5 50%, #c4b5fd 100%)",
    accent: "#5b3db4",
    emoji: "⏱️",
    category: "Zamanı Okur",
  },
  {
    title: "Yosuun, rakip davranışlarını sürekli izler.",
    subtitle: "Fiyatları, içerikleri ve değişimleri sürekli izler. Avantaj oluştuğu anda sistemi harekete geçirir.",
    tags: ["Product Design", "Interaction Design"],
    gradient: "linear-gradient(135deg, #f9e5e8 0%, #ffd6e0 50%, #ffc2d1 100%)",
    accent: "#c45d6d",
    emoji: "👀",
    category: "Rakipleri İzler",
  },
  {
    title: "NovaPay",
    subtitle: "Payments platform identity",
    tags: ["Brand Identity", "Design System"],
    gradient: "linear-gradient(135deg, #e6f3ff 0%, #dbeafe 50%, #bfdbfe 100%)",
    accent: "#2a74c7",
    emoji: "🎯",
    category: "Doğru Aksiyonu Alır",
  },
  {
    title: "Homefy",
    subtitle: "Smart home commerce",
    tags: ["UI/UX", "Conversion"],
    gradient: "linear-gradient(135deg, #ffe9d9 0%, #ffdcc5 50%, #ffccaa 100%)",
    accent: "#c46c2f",
    emoji: "⚙️",
    category: "Ürünleri Optimize Eder",
  },

  {
    title: "HealthWell",
    subtitle: "Telemedicine app interface",
    tags: ["Mobile App", "User Flow"],
    gradient: "linear-gradient(135deg, #e3f7e8 0%, #c1e8c9 50%, #a3d9b0 100%)",
    accent: "#3c9158",
    emoji: "📦",
    category: "Stoku Planlar",
  },
  {
    title: "EcoMarket",
    subtitle: "Sustainable shopping platform",
    tags: ["Web Design", "Branding"],
    gradient: "linear-gradient(135deg, #f3f0ff 0%, #e0d6ff 50%, #c4b5fd 100%)",
    accent: "#6657c4",
    emoji: "📊",
    category: "Sonucu Raporlar",
  },
];

const teamMembers = [
  {
    name: "Logan Dang",
    role: "Wordpress Developer",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "radial-gradient(circle at 20% 30%, #3d32ff 0 30%, transparent 30%), radial-gradient(circle at 80% 35%, #2a22ff 0 30%, transparent 30%), radial-gradient(circle at 50% 80%, #4f46ff 0 36%, transparent 36%), #2f23ff",
  },
  {
    name: "Ana Belić",
    role: "Social Media Specialist",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "radial-gradient(circle at 30% 25%, #f0f0f0 0 32%, transparent 32%), radial-gradient(circle at 70% 65%, #d8d8d8 0 28%, transparent 28%), #bfbfbf",
  },
  {
    name: "Brian Hanley",
    role: "Product Designer",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "radial-gradient(circle at 40% 30%, #f7f1c7 0 34%, transparent 34%), radial-gradient(circle at 70% 60%, #ffeaa0 0 30%, transparent 30%), #f5d96b",
  },
  {
    name: "Darko Stanković",
    role: "UI Designer",
    photo:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    backdrop:
      "radial-gradient(circle at 25% 25%, #48c0ff 0 32%, transparent 32%), radial-gradient(circle at 75% 55%, #4cb8ff 0 32%, transparent 32%), #2aa5f5",
  },
];

const testimonial = {
  quote:
    "Awake’s expertise transformed my vision into success with creativity, precision, and a deep understanding of my goals.",
  author: "Sarah Mitchell",
  title: "Founder of Chipsland",
  image:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  stat: "91%",
  statLabel: "clients recommend our design services.”",
};

const pricingPlans = [
  {
    name: "Starter",
    price: "$2500",
    cadence: "month",
    description: "For companies who need design support. One request at a time",
    features: [
      "Design Updates Every 2 Days",
      "Mid-level Designer",
      "SEO optimization",
      "Monthly analytics",
      "2x Calls Per Month",
      "License free assets",
    ],
    bg: "#f3dd6d",
    text: "#1f1b10",
    pillBg: "#1f1b10",
    pillText: "#f3dd6d",
    ctaBg: "#f3dd6d",
    ctaText: "#1f1b10",
    buttonInverted: false,
  },
  {
    name: "Pro",
    price: "$3500",
    cadence: "month",
    description: "2x the speed. Great for an MVP, Web App or complex problem",
    features: [
      "Design Updates Daily",
      "Senior-level Designer",
      "AI Advisory Framework",
      "Full-service Creative Team",
      "4x Calls Per Month",
      "License free assets",
    ],
    bg: "#3b32ff",
    text: "#f6f4ff",
    pillBg: "#161329",
    pillText: "#f6f4ff",
    ctaBg: "#f6f4ff",
    ctaText: "#161329",
    buttonInverted: true,
  },
];

const faqs = [
  {
    question: "What services does Awake Agency offer?",
    answer:
      "We deliver brand strategy, UI/UX design, web development, digital marketing, analytics, and ongoing optimization to keep your product moving forward.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most engagements run 4–10 weeks depending on scope. We set a clear milestone plan at kickoff and share weekly progress updates.",
  },
  {
    question: "How is pricing structured at Awake Agency?",
    answer:
      "We offer fixed-scope packages and retainer options. Our pricing is transparent—no hidden costs—and aligned to outcomes, not hours.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes. We provide continuous design and product support retainers, including experimentation, CRO, and design system upkeep.",
  },
  {
    question: "How often will I receive updates on my project?",
    answer:
      "You get weekly demos plus async updates via your shared workspace. Urgent items are handled in under one business day.",
  },
  {
    question: "How do I get started with Awake Agency?",
    answer:
      "Book a short discovery call, we’ll map goals and timelines, then propose a tailored plan with timeline, team, and budget.",
  },
];

function HexIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className="h-8 w-8 text-slate-900"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
    >
      <path d="M22 8h20l14 12v24L42 56H22L8 44V20Z" />
      <path d="M28 20h8l8 8v8l-8 8h-8l-8-8v-8Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M5 12h14m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="currentColor">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.7 1.1 6.6L12 17.6l-5.8 3 1.1-6.6-4.8-4.7 6.6-.9z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 text-slate-900"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 13 4 4 10-10" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 text-slate-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type AnimatedSegment = {
  text: string;
  className?: string;
  color?: string; // rgb string e.g. "28,42,60"
};

function AnimatedHeading({
  segments,
  className,
  start = 0.55,
  end = 0.15,
}: {
  segments: AnimatedSegment[];
  className?: string;
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const startPx = viewport * start;
      const endPx = viewport * end;
      const distance = startPx - endPx || 1;
      const raw = (startPx - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [start, end]);

  const baseColor = "28,42,60";

  return (
    <div ref={ref} className={className} style={{ lineHeight: "1.2" }}>
      {segments.map((seg, sIdx) => (
        <span key={sIdx} className={seg.className}>
          {seg.text.split("").map((char, idx) => {
            const step = 0.0125;
            const perChar = Math.min(1, Math.max(0, (progress - idx * step) / 0.05));
            const alpha = 0.2 + perChar * 0.8;
            const color = seg.color ? seg.color : baseColor;
            return (
              <span
                key={`${sIdx}-${idx}`}
                style={{
                  color: `rgba(${color}, ${alpha})`,
                  transition: "color 120ms ease-out",
                  whiteSpace: char === "\n" ? "pre" : undefined,
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  const marqueeItems = useMemo(() => [...logoStrip, ...logoStrip], []);
  const textSegments = [
    { text: "Yosuun, e-ticareti takip etmez.\n" },
    { text: "Zamanı", className: "font-serif italic", color: "120, 246, 102" },
    { text: ", ", color: "120, 246, 102" },
    { text: "veriyi", className: "font-serif italic", color: "120, 246, 102" },
    { text: " ve " },
    { text: "davranışı", className: "font-serif italic", color: "120, 246, 102" },
    { text: " okuyarak kendi kendine hareket eder." },
  ];

  const allChars = useMemo(
    () =>
      textSegments.flatMap((seg) =>
        seg.text.split("").map((char) => ({ char, className: seg.className, color: seg.color }))
      ),
    []
  );

  const textSegments2 = [
    { text: "E-ticareti " },
    { text: "kendi başına", className: "font-serif italic", color: "120, 246, 102" },
    { text: "\nyürütmek istemeyenler için" },
  ];

  const allChars2 = useMemo(
    () =>
      textSegments2.flatMap((seg) =>
        seg.text.split("").map((char) => ({ char, className: seg.className, color: seg.color }))
      ),
    []
  );

  const [revealProgress, setRevealProgress] = useState(0);
  const revealRef = useRef<HTMLHeadingElement | null>(null);
  const [revealProgress2, setRevealProgress2] = useState(0);
  const revealRef2 = useRef<HTMLHeadingElement | null>(null);
  const [revealProgress3, setRevealProgress3] = useState(0);
  const revealRef3 = useRef<HTMLHeadingElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [timelineTop, setTimelineTop] = useState<number>(9999);
  const [openFaqs, setOpenFaqs] = useState<boolean[]>(faqs.map((_, idx) => idx === 0));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const node = revealRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress(clamped);
    };

    const handleScroll2 = () => {
      const node = revealRef2.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress2(clamped);
    };

    const handleScroll3 = () => {
      const node = revealRef3.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress3(clamped);
    };

    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleTimelineScroll = () => {
      const node = timelineRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      setTimelineTop(rect.top);
    };

    handleScroll();
    handleScroll2();
    handleScroll3();
    handleTimelineScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll2, { passive: true });
    window.addEventListener("scroll", handleScroll3, { passive: true });
    window.addEventListener("scroll", handleTimelineScroll, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll2);
      window.removeEventListener("scroll", handleScroll3);
      window.removeEventListener("scroll", handleTimelineScroll);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e4f2ff] via-white to-white text-slate-900">
      <header
        className={`fixed top-5 left-0 right-0 z-[100] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 min-[500px]:gap-12 px-3 min-[500px]:px-6 md:px-8 transition-all duration-300 w-[95%] max-w-[1440px] ${isScrolled
          ? "bg-white/70 py-3 shadow-lg shadow-black/5 backdrop-blur-md rounded-full"
          : "py-6"
          }`}
      >
        <div className="relative flex h-12 items-center shrink-0 overflow-visible z-0 justify-self-end min-[724px]:justify-self-start">
          {/* Mobile logo - sabit boyut, sıkıştırılmaz, doğal oran korunur */}
          <img src="/logo-mobile.png" alt="Yosuun" className="min-[724px]:hidden h-[64px]" />
          {/* Desktop logo */}
          <img src="/yosuun-new-logo.png" alt="Yosuun" className="hidden min-[724px]:block h-[200px] w-auto" />
        </div>
        <nav className="flex items-center gap-1 rounded-full border border-white/20 bg-white/50 p-1.5 backdrop-blur z-10 justify-self-center">
          {navItems.map((item, idx) => (
            <button
              key={item}
              onClick={() => idx === 0 && setIsMenuOpen(!isMenuOpen)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap ${idx === 0
                ? "bg-white text-slate-900 shadow-sm w-full min-w-[140px] min-[1262px]:min-w-0 min-[1262px]:w-auto relative z-20"
                : "hidden min-[1262px]:block text-slate-600 hover:bg-white/50 hover:text-slate-900"
                }`}
              type="button"
            >
              {item}
              {idx === 0 && (
                <span className="min-[1262px]:hidden absolute right-4 top-1/2 -translate-y-1/2">
                  <ChevronDownIcon />
                </span>
              )}
            </button>
          ))}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 flex flex-col gap-1 rounded-[20px] border border-white/20 bg-white/90 p-2 shadow-xl backdrop-blur-md min-[1262px]:hidden z-10">
              {navItems.slice(1).map((item) => (
                <button
                  key={item}
                  className="rounded-full px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900 hover:shadow-sm text-center whitespace-nowrap"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </nav>
        <div className="flex items-center gap-2 shrink-0 justify-self-start min-[724px]:justify-self-end ml-1 min-[724px]:ml-0">
          {/* Mobile: sadece ok ikonu */}
          <button className="min-[724px]:hidden grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900 shadow-md transition hover:translate-y-[-1px]">
            <ArrowIcon />
          </button>
          {/* Desktop: tam buton */}
          <button className="hidden min-[724px]:flex items-center gap-2 rounded-full bg-slate-900 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-white shadow-md transition hover:translate-y-[-1px] hover:bg-black whitespace-nowrap">
            Bize Ulaşın
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </header>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-4 pt-10 md:px-12 lg:px-16">

        <main className="flex flex-1 flex-col items-center text-center">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 w-full translate-y-16">
            <div className="flex flex-col items-center gap-2">
              <p className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-black md:text-6xl lg:text-7xl">
                Sen hayatını yaşa
              </p>
              <p className="max-w-4xl text-5xl leading-tight tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
                <span className="font-serif italic text-black">E-ticaret sessizce çalışsın</span>
              </p>
            </div>

            <p className="max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Yosuun, e-ticaretteki yükü senden alır. Zamanı okur, doğru aksiyonları kendi başına uygular. Sen hayatını yaşarken, e-ticaret arka planda çalışır.
            </p>

            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
              <button className="group inline-flex w-56 items-center justify-between rounded-full bg-[#78f666] pl-6 pr-2 py-2.5 text-base font-semibold text-white shadow-lg shadow-[#25f707]/30 transition hover:translate-y-[-1px]">
                Yosuun’u Keşfet
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900">
                  <ArrowIcon />
                </span>
              </button>

              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
                <div className="flex -space-x-3">
                  {avatarPalette.map((avatar) => (
                    <div
                      key={avatar.name}
                      className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-sm font-semibold uppercase text-white shadow ring-4 ring-white"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${avatar.from}, ${avatar.to})`,
                      }}
                      aria-label={avatar.name}
                    >
                      {/* @ts-ignore */}
                      {avatar.image ? (
                        /* @ts-ignore */
                        <img src={avatar.image} alt={avatar.name} className="h-full w-full object-cover" />
                      ) : (
                        avatar.name.slice(0, 1)
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-1 text-sm text-slate-600 md:items-start">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarIcon key={idx} />
                    ))}
                  </div>
                  <p className="text-slate-800">Birçok markanın tercihi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center translate-y-10">
            <p className="mt-10 text-sm text-slate-500 md:mt-0">
              Markalar işine odaklanırken, Yosuun geri kalanını halleder
            </p>

            <div className="-mt-12 logo-marquee relative w-full overflow-hidden opacity-60">
              <div className="logo-track flex w-[200%] items-center justify-around">
                {Array.from({ length: 16 }).map((_, idx) => (
                  <div key={idx} className="relative h-48 w-60 flex items-center justify-center">
                    <img
                      src="/yosuun-new-logo.png"
                      alt="Yosuun"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <section className="mx-auto mt-32 flex w-full max-w-6xl flex-col items-center px-6 md:px-12 lg:px-16">


        <div className="mt-0 flex w-full flex-col items-center gap-6 text-center">
          <h2
            ref={revealRef}
            className="max-w-full whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight text-slate-800 md:text-5xl"
          >
            {allChars.map((item, idx) => {
              const step = 0.0125;
              const perChar = Math.min(
                1,
                Math.max(0, (revealProgress - idx * step) / 0.05)
              );
              const alpha = 0.2 + perChar * 0.8;
              const baseRgb = item.color || "15, 23, 42";
              return (
                <span
                  key={idx}
                  className={item.className}
                  style={{
                    color: `rgba(${baseRgb}, ${alpha})`,
                    transition: "color 120ms ease-out",
                  }}
                >
                  {item.char}
                </span>
              );
            })}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#78f666] px-10 py-4 text-3xl font-serif italic text-white">
              Akıl
            </span>
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#78f666] px-10 py-4 text-3xl font-serif italic text-white">
              Süreklilik
            </span>
            <span className="flex items-center justify-center gap-2 rounded-full bg-[#78f666] px-10 py-4 text-3xl font-serif italic text-white">
              Uyum
            </span>
          </div>
        </div>

        <div className="mt-20 grid w-full grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-0">
          {statBlocks.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center ${idx !== statBlocks.length - 1
                ? "sm:border-r sm:border-slate-200"
                : ""
                }`}
            >
              <div className="flex items-start justify-center text-[#1a1a1a]">
                {idx === 0 && (
                  <span className="mr-1 mt-2 text-5xl font-medium leading-none">+</span>
                )}
                <span className="text-8xl font-medium tracking-tighter md:text-9xl">
                  {stat.value}
                </span>
              </div>
              <p className="mt-4 text-lg font-normal text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-56 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            ref={revealRef2}
            className="max-w-full whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight text-slate-800 md:text-5xl"
          >
            {allChars2.map((item, idx) => {
              const step = 0.025;
              const perChar = Math.min(
                1,
                Math.max(0, (revealProgress2 - idx * step) / 0.05)
              );
              const alpha = 0.2 + perChar * 0.8;
              const baseRgb = item.color || "15, 23, 42";
              return (
                <span
                  key={idx}
                  className={item.className}
                  style={{
                    color: `rgba(${baseRgb}, ${alpha})`,
                    transition: "color 120ms ease-out",
                  }}
                >
                  {item.char}
                </span>
              );
            })}
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex h-40 w-40 flex-col justify-between rounded-3xl px-5 py-5"
              style={{ backgroundColor: service.bg }}
            >
              {service.image ? (
                <img src={service.image} alt={service.title} className="h-12 w-12 object-contain" />
              ) : (
                <div className="text-2xl">{service.icon}</div>
              )}
              <p
                className="whitespace-pre-line text-2xl font-semibold leading-7 text-slate-800"
              >
                {service.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 mb-12 flex flex-col gap-4 rounded-[26px] bg-black px-6 py-8 text-white shadow-xl shadow-black/25 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10">
          <div>
            <p className="text-xl font-semibold leading-7">Kim Olursan Ol</p>
            <p className="text-base text-slate-300">Sende Yükünü Devretmek İstiyorsan</p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:translate-y-[-1px]">
              Bize Ulaşın
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-900/10 text-slate-900">
                <ArrowIcon />
              </span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Sizi Arayalım
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>


      </section>

      <section className="mx-auto mt-56 w-full max-w-6xl px-6 md:px-12 lg:px-16">

        <div className="flex flex-col items-center gap-3 text-center mb-16">
          <h2
            ref={revealRef3}
            className="max-w-full whitespace-pre-line text-4xl font-semibold leading-tight tracking-tight text-slate-800 md:text-5xl"
          >
            {allChars2.map((item, idx) => {
              const step = 0.025;
              const perChar = Math.min(
                1,
                Math.max(0, (revealProgress3 - idx * step) / 0.05)
              );
              const alpha = 0.2 + perChar * 0.8;
              const baseRgb = item.color || "15, 23, 42";
              return (
                <span
                  key={idx}
                  className={item.className}
                  style={{
                    color: `rgba(${baseRgb}, ${alpha})`,
                    transition: "color 120ms ease-out",
                  }}
                >
                  {item.char}
                </span>
              );
            })}
          </h2>
        </div>

        <div ref={timelineRef} className="flex flex-col items-center justify-center gap-0 mb-16">
          {["01", "02", "03", "04", "05", "06"].map((step, idx, arr) => {
            // Per-item scroll-based animation
            const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
            const itemHeight = 288; // node (48px) + line (240px) approx
            const itemTop = timelineTop + (idx * itemHeight);

            // Animation triggers: start when item reaches 80% of viewport, end at 50%
            const animationStartY = viewportHeight * 0.8;
            const animationEndY = viewportHeight * 0.5;
            const animationRange = animationStartY - animationEndY;
            const traveled = animationStartY - itemTop;
            const rawProgress = traveled / animationRange;
            const lineFill = Math.min(1, Math.max(0, rawProgress));
            const isActive = itemTop <= viewportHeight * 0.5;

            return (
              <div key={step} className="flex flex-col items-center">
                {/* Node */}
                <div
                  className={`grid place-items-center rounded-full text-sm font-semibold shadow-sm z-10 transition-all duration-300 ${step === "06" ? "h-[84px] w-[84px] overflow-visible" : "h-12 w-12"}`}
                  style={{
                    backgroundColor: isActive ? (step === "06" ? "#78f666" : "#0f172a") : "#ffffff",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    borderWidth: isActive ? 0 : 1,
                    borderColor: "#e2e8f0",
                    boxShadow: isActive ? "0 10px 15px -3px rgba(0,0,0,0.1)" : "0 1px 2px 0 rgba(0,0,0,0.05)",
                  }}
                >
                  {step === "06" ? (
                    isActive ? (
                      <img src="/küçük-logo.png" alt="Yosuun Active" className="h-[70px] w-[70px] object-contain translate-x-1" />
                    ) : (
                      <img src="/logo-mobile.png" alt="Yosuun" className="h-[70px] w-[70px] object-contain translate-x-1" />
                    )
                  ) : (
                    step
                  )}
                </div>
                {/* Connecting Line (not for last item) */}
                {idx < arr.length - 1 && (
                  <div className={`relative w-0.5 bg-slate-200 overflow-visible ${idx === 4 ? "h-96" : "h-60"}`}>
                    <div
                      className="absolute top-0 left-0 w-full bg-slate-900 transition-all duration-150"
                      style={{ height: `${lineFill * 100}%` }}
                    />
                    {/* Animated Card */}
                    <div
                      className={`absolute top-1/2 w-72 rounded-[2rem] bg-slate-50 p-5 shadow-2xl border border-white flex flex-col justify-center h-[300px] ${idx % 2 === 0 ? "left-10" : "right-10"}`}
                      style={{
                        opacity: Math.max(0, (lineFill - 0.2) / 0.8), // Starts fading in after 20% fill
                        transformOrigin: idx % 2 === 0 ? "left center" : "right center",
                        transform: `translate(0, -49%) scale(${0.6 + 0.4 * lineFill})`,
                        visibility: lineFill > 0.1 ? "visible" : "hidden",
                        transition: "transform 0.1s linear, opacity 0.1s linear"
                      }}
                    >
                      {/* Card Text */}
                      <div className="text-left w-full">
                        <img src="/snap.png" alt="Yosuun Feature" className="w-full h-[120px] mb-4 object-contain" />
                        <h4 className="text-base font-semibold text-slate-900 mb-1">
                          {
                            [
                              "Zamanı Okur",
                              "Rakipleri Kıyaslar",
                              "Aksiyon Üretir & Satışa Hazırlar",
                              "Süreci İzler",
                              "Öğrenir & Raporlar",
                            ][idx]
                          }
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {
                            [
                              "Sezonları, özel günleri ve piyasa ritmini veriden çıkarır. Ne zaman ne yapılması gerektiğini önceden fark eder.",
                              "Kullanıcının eklediği rakipleri sürekli izler. Fiyatları, içerikleri ve değişimleri karşılaştırarak rekabet içindeki doğru konumu netleştirir.",
                              "Veriye göre karar alır, beklemez. Ürünleri, içerikleri ve detayları satışa hazır hale getirir.",
                              "Yapılanla yetinmez. Satış geldikçe, sonuçları anlık takip eder ve süreci yönlendirir.",
                              "Her hareketten öğrenir. Ne işe yaradı, ne yaramadı netleşir ve sonraki adımlar buna göre şekillenir.",
                            ][idx]
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>


      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-16">

        <div className="text-center">
          <AnimatedHeading
            className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl whitespace-pre-line text-center"
            segments={[
              { text: "Meet the creative minds\n", color: "28,42,60" },
              { text: "behind ", color: "28,42,60" },
              { text: "our success", color: "112,129,159", className: "font-serif italic" },
            ]}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[38%] shadow-lg shadow-black/15">
                <div
                  className="absolute inset-0"
                  style={{
                    background: member.backdrop,
                  }}
                />
                <div
                  className="absolute inset-[10%] rounded-[32%] bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.photo})` }}
                  role="img"
                  aria-label={member.name}
                />
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-xl font-semibold text-slate-900">{member.name}</p>
                <p className="text-sm text-slate-600">{member.role}</p>
              </div>
              <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full border border-slate-200 px-2.5 py-1">X</span>
                <span className="rounded-full border border-slate-200 px-2.5 py-1">in</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <AnimatedHeading
            className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl whitespace-pre-line text-center"
            segments={[
              { text: "What our satisfied customers\n", color: "28,42,60" },
              { text: "are saying ", color: "28,42,60" },
              { text: "about us", color: "112,129,159", className: "font-serif italic" },
            ]}
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-[28px] bg-slate-900 shadow-xl shadow-black/20">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${testimonial.image})` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/45 to-black/20" />
              <div className="relative flex min-h-[320px] flex-col justify-end gap-3 p-8 text-white md:min-h-[420px] md:p-10">
                <p className="text-xs font-semibold tracking-[0.2em] text-white/70">
                  CUSTOMER STORIES
                </p>
                <p className="text-xl font-semibold leading-8 md:text-2xl md:leading-9">
                  {testimonial.quote}
                </p>
                <div className="mt-3 text-sm text-white/80">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p>{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[28px] bg-[#f2df78] px-8 py-10 text-slate-900 shadow-lg shadow-black/10">
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-700">FACTS & NUMBERS</p>
            <div className="mt-10 flex flex-col gap-3">
              <p className="text-5xl font-semibold leading-none">{testimonial.stat}</p>
              <p className="text-lg font-semibold leading-7 text-slate-800">
                {testimonial.statLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <p className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Pick the plan that fits your <span className="font-serif italic text-slate-400">start-up</span>
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col justify-between rounded-[26px] p-8 shadow-lg shadow-black/15 lg:p-10"
              style={{ backgroundColor: plan.bg, color: plan.text }}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                <div className="flex-1 space-y-4">
                  <span
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                    style={{ backgroundColor: plan.pillBg, color: plan.pillText }}
                  >
                    {plan.name}
                  </span>
                  <p className="text-sm leading-6 opacity-90">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                    <span className="text-base font-semibold opacity-90">/{plan.cadence}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <p className="text-sm font-semibold opacity-90">Features</p>
                  <div className="space-y-3 text-sm">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckIcon />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition hover:translate-y-[-1px] ${plan.buttonInverted
                    ? "bg-white text-slate-900"
                    : "border border-current bg-white/0 text-current"
                    }`}
                  style={
                    plan.buttonInverted
                      ? { color: plan.ctaText }
                      : { backgroundColor: plan.ctaBg, color: plan.ctaText }
                  }
                >
                  Let&apos;s Collaborate
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full bg-black/10"
                    style={{ backgroundColor: plan.buttonInverted ? "#e6e6e6" : "#e6d660" }}
                  >
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-0 md:px-6">
        <div className="rounded-[32px] bg-[linear-gradient(180deg,#fff7ed_0%,#f8ebdf_100%)] px-4 py-12 shadow-sm md:px-10 lg:px-14">
          <div className="text-center">
            <AnimatedHeading
              className="text-4xl font-semibold tracking-tight text-[#1c2a3c] md:text-5xl whitespace-pre-line text-center"
              segments={[
                { text: "Got questions?\n", color: "28,42,60" },
                { text: "We've got ", color: "28,42,60" },
                { text: "answers", color: "112,129,159", className: "font-serif italic" },
              ]}
            />
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((item, idx) => {
              const isOpen = openFaqs[idx];
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-[18px] border border-[#e6dfd5] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-[#1c2a3c]"
                    onClick={() =>
                      setOpenFaqs((prev) =>
                        prev.map((open, i) => (i === idx ? !open : open))
                      )
                    }
                  >
                    <span>{item.question}</span>
                    <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDownIcon />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-250 ease-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div
                      className={`px-6 text-base leading-6 text-[#465568] ${isOpen ? "pb-6" : "pb-0"
                        }`}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#e5f4ff] via-white to-white px-6 py-16 text-center shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:px-14 lg:px-20">
          <h3 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Innovative Solutions for{" "}
            <span className="font-serif italic text-slate-500">bold brands</span>
          </h3>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Looking to elevate your brand? We craft immersive experiences that captivate, engage, and
            make your business unforgettable in every interaction.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:translate-y-[-1px]">
              Let&apos;s craft together
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-20 w-full max-w-6xl px-6 pb-16 md:px-12 lg:px-16">
        <div className="grid gap-10 border-t border-slate-200/70 pt-10 md:grid-cols-4 md:gap-6">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-900/10 bg-white shadow-sm">
                <HexIcon />
              </div>
              <span className="text-lg font-semibold tracking-tight text-slate-900">Awake</span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Empowering businesses with innovative solutions. Let&apos;s create something amazing
              together.
            </p>
            <div className="flex items-center gap-4 text-slate-700">
              <span className="text-sm font-semibold">X</span>
              <span className="text-sm font-semibold">in</span>
              <span className="text-sm font-semibold">@</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">Sitemap</p>
            <div className="space-y-2 text-sm text-slate-600">
              <a href="#">About us</a>
              <a href="#">Work</a>
              <a href="#">Services</a>
              <a href="#">Pricing</a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">Other Pages</p>
            <div className="space-y-2 text-sm text-slate-600">
              <a href="#">Contact Us</a>
              <a href="#">Error 404</a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">Contact Details</p>
            <div className="space-y-2 text-sm text-slate-600">
              <p>81 Rivington Street London</p>
              <p>EC2A 3AY</p>
              <p>hello@awake.agency</p>
              <p>0105 192 3556</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
