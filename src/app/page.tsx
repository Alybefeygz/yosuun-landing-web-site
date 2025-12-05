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
  { name: "Amir", from: "#fdd6a7", to: "#f47c2c" },
  { name: "Jade", from: "#b4e1fa", to: "#4d7cfe" },
  { name: "Noah", from: "#ffc2d0", to: "#ff6b81" },
];

const logoStrip = [
  { name: "Logoipsum", color: "#1f2937" },
  { name: "Logoipsum", color: "#111827" },
  { name: "Logoipsum", color: "#4338ca" },
  { name: "Logoipsum", color: "#15803d" },
  { name: "Logoipsum", color: "#0f172a" },
  { name: "Logoipsum", color: "#1d4ed8" },
  { name: "Logoipsum", color: "#047857" },
];

const statBlocks = [
  { label: "Total Projects Completed", value: "40" },
  { label: "Years of Experience", value: "15" },
  { label: "Design Awards", value: "12" },
];

const services = [
  { title: "Brand Strategy", icon: "🪡", bg: "#efe5ff", text: "#5b3db4" },
  { title: "Web Development", icon: "🧩", bg: "#f9e5e8", text: "#c45d6d" },
  { title: "Digital Marketing", icon: "🚙", bg: "#e6f3ff", text: "#2a74c7" },
  { title: "UI/UX Designing", icon: "🪢", bg: "#ffe9d9", text: "#c46c2f" },
  { title: "Analytics & Reporting", icon: "📊", bg: "#e3f7e8", text: "#3c9158" },
  { title: "Product Innovation", icon: "🔬", bg: "#f3f0ff", text: "#6657c4" },
];

const caseStudies = [
  {
    title: "FlowBank",
    subtitle: "Mobile banking made human",
    tags: ["UX Research", "Interface Design"],
    gradient: "linear-gradient(135deg, #c7f6d5 0%, #c3e9ff 50%, #e8f3d3 100%)",
    accent: "#3b8f62",
  },
  {
    title: "Academy.co",
    subtitle: "Education dashboard redesign",
    tags: ["Product Design", "Interaction Design"],
    gradient: "linear-gradient(135deg, #d9d6ff 0%, #e6e9ff 50%, #f5e8ff 100%)",
    accent: "#6c63ff",
  },
  {
    title: "NovaPay",
    subtitle: "Payments platform identity",
    tags: ["Brand Identity", "Design System"],
    gradient: "linear-gradient(135deg, #ffe2c8 0%, #ffd0e2 50%, #f9f0ff 100%)",
    accent: "#f28b44",
  },
  {
    title: "Homefy",
    subtitle: "Smart home commerce",
    tags: ["UI/UX", "Conversion"],
    gradient: "linear-gradient(135deg, #d2f0ff 0%, #e8f8f3 50%, #f8fff4 100%)",
    accent: "#2ea7a1",
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

export default function Home() {
  const marqueeItems = useMemo(() => [...logoStrip, ...logoStrip], []);
  const textToReveal =
    "Crafting exceptional, well experienced & technology driven strategies to drive impactful results with";

  const [revealProgress, setRevealProgress] = useState(0);
  const revealRef = useRef<HTMLHeadingElement | null>(null);

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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e4f2ff] via-[#fbf7f1] to-[#ffe9d7] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16 pt-10 md:px-12 lg:px-16">
        <header className="flex items-center justify-between rounded-full border border-white/40 bg-white/70 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-900/10 bg-white shadow-sm">
              <HexIcon />
            </div>
            <span className="text-lg font-semibold tracking-tight">Awake</span>
          </div>
          <nav className="hidden items-center gap-2 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item, idx) => (
              <button
                key={item}
                className={`rounded-full px-4 py-2 transition ${
                  idx === 0
                    ? "bg-white text-slate-900 shadow-sm"
                    : "hover:bg-white hover:text-slate-900"
                }`}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
          <button className="hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:translate-y-[-1px] hover:bg-black sm:flex">
            Let&apos;s Collaborate
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
              <ArrowIcon />
            </span>
          </button>
          <button className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:hidden">
            Menu
          </button>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mt-16 flex flex-col items-center gap-6 md:mt-20">
            <div className="flex flex-col items-center gap-2">
              <p className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
                Building bold brands
              </p>
              <p className="max-w-4xl text-5xl leading-tight tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
                <span className="font-serif italic text-[#2f1a10]">with thoughtful design</span>
              </p>
            </div>

            <p className="max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              At Awake, we help small startups tackle the world&apos;s biggest challenges with tailored
              solutions, guiding you from strategy to success in a competitive market.
            </p>

            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
              <button className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#2713ff] via-[#3c2cff] to-[#5c41ff] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:translate-y-[-1px]">
                Get Started
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 transition group-hover:bg-white/30">
                  <ArrowIcon />
                </span>
              </button>

              <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
                <div className="flex -space-x-3">
                  {avatarPalette.map((avatar) => (
                    <div
                      key={avatar.name}
                      className="relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold uppercase text-white shadow ring-4 ring-white"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${avatar.from}, ${avatar.to})`,
                      }}
                      aria-label={avatar.name}
                    >
                      {avatar.name.slice(0, 1)}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-1 text-sm text-slate-600 md:items-start">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <StarIcon key={idx} />
                    ))}
                  </div>
                  <p className="text-slate-800">Trusted by 200+ clients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
          <p className="mt-5 text-sm text-slate-500">
            Loved by 100,00+ big and small brands around the worlds
          </p>
        </main>
      </div>

      <section className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center px-6 md:px-12 lg:px-16">
        <div className="flex w-full flex-col items-center gap-4 rounded-[18px] bg-white/70 px-6 py-4 shadow-sm shadow-black/5 backdrop-blur">
          <p className="text-sm font-medium text-slate-500">
            Loved by 100,00+ big and small brands around the worlds
          </p>
          <div className="logo-marquee relative w-full overflow-hidden">
            <div className="logo-track flex w-[200%] items-center gap-10">
              {marqueeItems.map((logo, idx) => (
                <div
                  key={`${logo.name}-${idx}`}
                  className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-base font-semibold text-slate-700 shadow-sm"
                  style={{ color: logo.color }}
                >
                  <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: logo.color }} />
                  {logo.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex w-full flex-col items-center gap-6 text-center">
          <h2
            ref={revealRef}
            className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-slate-800 md:text-5xl"
          >
            {textToReveal.split("").map((char, idx) => {
              const step = 0.0125;
              const perChar = Math.min(
                1,
                Math.max(0, (revealProgress - idx * step) / 0.4)
              );
              const alpha = 0.2 + perChar * 0.8;
              return (
                <span
                  key={idx}
                  style={{
                    color: `rgba(15, 23, 42, ${alpha})`,
                    transition: "color 120ms ease-out",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-2 rounded-full bg-[#f0e8ff] px-5 py-2.5 text-lg font-semibold text-[#7c4dff]">
              <span className="text-xl">🧵</span> Creativity
            </span>
            <span className="flex items-center gap-2 rounded-full bg-[#e3f1ff] px-5 py-2.5 text-lg font-semibold text-[#2b7de9]">
              <span className="text-xl">💡</span> Innovation
            </span>
            <span className="flex items-center gap-2 rounded-full bg-[#ffe9d7] px-5 py-2.5 text-lg font-semibold text-[#d46a1f]">
              <span className="text-xl">🕸</span> Strategy
            </span>
          </div>
        </div>

        <div className="mt-14 grid w-full grid-cols-1 gap-8 rounded-[24px] bg-white/80 px-10 py-10 shadow-lg shadow-black/5 backdrop-blur sm:grid-cols-3">
          {statBlocks.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-3 ${idx !== statBlocks.length - 1 ? "sm:border-r sm:border-slate-200/80 sm:pr-6" : ""} ${
                idx !== 0 ? "sm:pl-6" : ""
              }`}
            >
              <div className="text-5xl font-bold tracking-tight text-slate-900">
                <span className="mr-1 text-4xl text-slate-500">+</span>
                {stat.value}
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Where innovation
            <br />
            meets <span className="font-serif italic text-slate-400">aesthetics</span>
          </h3>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex h-44 flex-col justify-between rounded-2xl px-5 py-5 shadow-sm"
              style={{ backgroundColor: service.bg, color: service.text }}
            >
              <div className="text-2xl">{service.icon}</div>
              <p className="text-lg font-semibold leading-6 text-slate-800">
                {service.title}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-[26px] bg-slate-900 px-6 py-8 text-white shadow-xl shadow-black/25 md:flex-row md:items-center md:justify-between md:gap-6 md:px-10">
          <div>
            <p className="text-xl font-semibold leading-7">See Our Work in Action.</p>
            <p className="text-base text-slate-300">Start Your Creative Journey with Us!</p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:translate-y-[-1px]">
              Let&apos;s Collaborate
              <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-900/10 text-slate-900">
                <ArrowIcon />
              </span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View Portfolio
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <p className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            How we transformed a small
            <br />
            business&apos;s <span className="font-serif italic text-slate-400">online presence</span>
          </p>
        </div>

        <div className="mt-14 grid gap-12">
          {caseStudies.map((item) => (
            <div key={item.title} className="relative h-[78vh] min-h-[520px]">
              <div className="sticky top-24 flex flex-col gap-4">
                <div
                  className="relative h-full overflow-hidden rounded-[28px] shadow-xl shadow-black/15"
                  style={{ backgroundImage: item.gradient }}
                >
                  <div className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800">
                    Case Study
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.35),transparent_40%)]" />
                  <div className="flex h-full flex-col justify-end bg-gradient-to-t from-black/10 to-transparent p-8">
                    <div className="max-w-xl rounded-2xl bg-white/70 px-5 py-4 shadow-lg backdrop-blur">
                      <p className="text-2xl font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-4 py-2 text-sm font-medium text-slate-700"
                      style={{ borderColor: `${item.accent}33`, color: item.accent }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-16">
        <div className="text-center">
          <p className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Meet the creative minds
            <br />
            behind <span className="font-serif italic text-slate-400">our success</span>
          </p>
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
          <p className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            What our satisfied customers
            <br />
            are say<span className="text-slate-400">ing</span>{" "}
            <span className="font-serif italic text-slate-400">about us</span>
          </p>
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
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition hover:translate-y-[-1px] ${
                    plan.buttonInverted
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
    </div>
  );
}
