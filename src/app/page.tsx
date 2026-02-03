"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";

const navItems = [
  "Ana Sayfa",
  "Nasıl Düşünür",
  "Kimler İçin",
  "Nasıl Çalışır",
  "Deneyimler",
  "Demo",
  "SSS",
];

const avatarPalette = [
  { name: "Sofia", from: "#d6b6ff", to: "#3f2bff", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/21.jpg" },
  { name: "Mateo", from: "#c6f6d5", to: "#2ec4b6", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/22.jpg" },
  { name: "Amir", from: "#fdd6a7", to: "#f47c2c", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/23.jpg" },
  { name: "Jade", from: "#b4e1fa", to: "#4d7cfe", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/24.jpg" },
  { name: "Noah", from: "#ffc2d0", to: "#ff6b81", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/pp1.jpeg" },
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
  { label: "Kendi Kendine Karar", value: <span className="inline-block infinity-translate text-[2em] leading-[0]">∞</span> },
];

const services = [
  { title: "Ajans", icon: "", bg: "#ccfac5", text: "#5b3db4", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/Ajans.png" },
  { title: "Girişimci", icon: "", bg: "#ccfac5", text: "#c45d6d", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/girisimci.png" },
  { title: "Satıcı", icon: "", bg: "#ccfac5", text: "#2a74c7", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/satici.png" },
  { title: "Markalar", icon: "", bg: "#ccfac5", text: "#5b3db4", image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/marka.png" },
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
    name: "Arda Güner",
    role: "Wordpress Developer",
    photo: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/Arda.jpeg",
    backdrop:
      "radial-gradient(circle at 20% 30%, #3d32ff 0 30%, transparent 30%), radial-gradient(circle at 80% 35%, #2a22ff 0 30%, transparent 30%), radial-gradient(circle at 50% 80%, #4f46ff 0 36%, transparent 36%), #2f23ff",
  },
  {
    name: "Muhammet Mustafa Dincer",
    role: "Social Media Specialist",
    photo: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/Muhammet.jpeg",
    backdrop:
      "radial-gradient(circle at 30% 25%, #f0f0f0 0 32%, transparent 32%), radial-gradient(circle at 70% 65%, #d8d8d8 0 28%, transparent 28%), #bfbfbf",
  },
  {
    name: "Yağız Efe Alaybay",
    role: "Product Designer",
    photo: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/Yagiz.jpeg",
    backdrop:
      "radial-gradient(circle at 40% 30%, #f7f1c7 0 34%, transparent 34%), radial-gradient(circle at 70% 60%, #ffeaa0 0 30%, transparent 30%), #f5d96b",
  },
];

const testimonial = {
  quote:
    "Kontrol hâlâ bende ama yük artık değil. Birden fazla markayı yönetirken e-ticaret arka planda kendi kendine ilerliyor ve ben asıl işime odaklanıyorum.",
  author: "Serhat ATİK",
  title: "Swifty E-Ticaret Marka Yönetim Ajansı | E-Ticaret Eğitmeni",
  image: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/customer-story.jpg",
  stat: "%147",
  statLabel: "Artık e-ticarette neyi ne zaman yapacağımızı düşünmüyoruz.",
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
    ],
    bg: "#ccfac5",
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
    ],
    bg: "#000000",
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
    question: "Yosuun tam olarak ne yapar?",
    answer:
      "Yosuun, e-ticaret operasyonunu senin adına izler, analiz eder ve gerekli izinlerle uygular. Ürün, stok, rakip ve planlama süreçlerini tek sistemde toplar ve yükü üzerinden alır.",
  },
  {
    question: "Yosuun benim yerime karar mı verir?",
    answer:
      "Normal akışta hayır. Kontrol sende kalır. Yosuun veriyi okur, aksiyonları üretir, sana gösterir ve onayladığında uygular. İstersen gerekli izinleri ve kuralları tanımladığında, bu aksiyonları sana sormadan otomatik olarak da uygular. Yapılan tüm işlemler her zaman görünür ve kayıt altındadır.",
  },
  {
    question: "Rakiplerimi nasıl takip ediyor?",
    answer:
      "Sen rakip mağazaların linklerini eklersin. Yosuun bu mağazalar için özel bir sanal alan oluşturur ve ürün, fiyat, içerik ve yorum değişikliklerini düzenli olarak izler.",
  },
  {
    question: "Yosuun yaptığı işlemleri görebilir miyim?",
    answer:
      "Evet. Yapılan tüm işlemler takvimde tarih ve saat bilgisiyle kayıt altındadır. Hangi gün, hangi aksiyon alındı net şekilde görünür.",
  },
  {
    question: "Demo nasıl ilerliyor?",
    answer:
      "Demo’da Yosuun’u canlı olarak gösteriyoruz. İstersen örnek bir yapı üzerinden, istersen kendi mağazanı bağlayarak sistemi birebir görürsün. Demo sonrasında dilediğin anda kendi mağazaların için kullanmaya başlayabilirsin.",
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

function useInView(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, isInView };
}

function HomeContent() {
  const searchParams = useSearchParams();
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

  const textSegments3 = [
    { text: "Yosuun, e-ticareti " },
    { text: "baştan sona", className: "font-serif italic", color: "120, 246, 102" },
    { text: "\n" },
    { text: "kendi", className: "font-serif italic", color: "120, 246, 102" },
    { text: " " },
    { text: "başına", className: "font-serif italic", color: "120, 246, 102" },
    { text: " yürütür." },
  ];

  const allChars3 = useMemo(
    () =>
      textSegments3.flatMap((seg) =>
        seg.text.split("").map((char) => ({ char, className: seg.className, color: seg.color }))
      ),
    []
  );

  const textSegments4 = [
    { text: "Tercih edenler, " },
    { text: "e-ticarette", className: "font-serif italic", color: "120, 246, 102" },
    { text: "\nneleri artık " },
    { text: "düşünmediklerini", className: "font-serif italic", color: "120, 246, 102" },
    { text: "\nanlatıyor." },
  ];

  const allChars4 = useMemo(
    () =>
      textSegments4.flatMap((seg) =>
        seg.text.split("").map((char) => ({ char, className: seg.className, color: seg.color }))
      ),
    []
  );

  const textSegments5 = [
    { text: "Yosuun'u " },
    { text: "yakından", className: "font-serif italic", color: "120, 246, 102" },
    { text: " görmek için\n" },
    { text: "demo", className: "font-serif italic", color: "120, 246, 102" },
    { text: " talep et" },
  ];

  const allChars5 = useMemo(
    () =>
      textSegments5.flatMap((seg) =>
        seg.text.split("").map((char) => ({ char, className: seg.className, color: seg.color }))
      ),
    []
  );

  const textSegments6 = [
    { text: "Yosuun", className: "font-serif italic", color: "120, 246, 102" },
    { text: " hakkında\n" },
    { text: "en çok " },
    { text: "merak", className: "font-serif italic", color: "120, 246, 102" },
    { text: " edilenler." },
  ];

  const allChars6 = useMemo(
    () =>
      textSegments6.flatMap((seg) =>
        seg.text.split("").map((char) => ({ char, className: seg.className, color: seg.color }))
      ),
    []
  );

  const textSegments7 = [
    { text: "E-ticareti " },
    { text: "senin yerine", className: "font-serif italic", color: "120, 246, 102" },
    { text: " yöneten bir " },
    { text: "sistemle" },
    { text: " tanış." },
  ];

  const allChars7 = useMemo(
    () =>
      textSegments7.flatMap((seg) =>
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
  const [revealProgress4, setRevealProgress4] = useState(0);
  const revealRef4 = useRef<HTMLHeadingElement | null>(null);
  const [revealProgress5, setRevealProgress5] = useState(0);
  const revealRef5 = useRef<HTMLHeadingElement | null>(null);
  const [revealProgress6, setRevealProgress6] = useState(0);
  const revealRef6 = useRef<HTMLHeadingElement | null>(null);
  const [revealProgress7, setRevealProgress7] = useState(0);
  const revealRef7 = useRef<HTMLHeadingElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [timelineTop, setTimelineTop] = useState<number>(9999);
  const [openFaqs, setOpenFaqs] = useState<boolean[]>(faqs.map(() => false));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const { ref: headingRef, isInView: isHeadingVisible } = useInView({ threshold: 0.1 });
  const { ref: pillsRef, isInView: isPillsVisible } = useInView({ threshold: 0.1 });
  const { ref: statsRef, isInView: isStatsVisible } = useInView({ threshold: 0.1 });
  const { ref: whoForHeadingRef, isInView: isWhoForHeadingVisible } = useInView({ threshold: 0.1 });
  const { ref: servicesRef, isInView: isServicesVisible } = useInView({ threshold: 0.1 });
  const { ref: ctaRef, isInView: isCtaVisible } = useInView({ threshold: 0.1 });
  const { ref: howItWorksHeadingRef, isInView: isHowItWorksHeadingVisible } = useInView({ threshold: 0.1 });
  const { ref: testimonialsHeadingRef, isInView: isTestimonialsHeadingVisible } = useInView({ threshold: 0.1 });
  const { ref: testimonialsContentRef, isInView: isTestimonialsContentVisible } = useInView({ threshold: 0.1 });
  const { ref: demoHeadingRef, isInView: isDemoHeadingVisible } = useInView({ threshold: 0.1 });
  const { ref: featureCardsRef, isInView: isFeatureCardsVisible } = useInView({ threshold: 0.1 });
  const { ref: demoCtaRef, isInView: isDemoCtaVisible } = useInView({ threshold: 0.1 });
  const { ref: faqHeadingRef, isInView: isFaqHeadingVisible } = useInView({ threshold: 0.1 });
  const { ref: faqItemsRef, isInView: isFaqItemsVisible } = useInView({ threshold: 0.1 });

  const handleFaqToggle = (idx: number) => {
    const currentOpenIdx = openFaqs.findIndex((isOpen) => isOpen);

    if (currentOpenIdx === idx) {
      setOpenFaqs((prev) => prev.map(() => false));
      return;
    }

    if (currentOpenIdx !== -1) {
      setOpenFaqs((prev) => prev.map(() => false));
      setTimeout(() => {
        setOpenFaqs((prev) => prev.map((_, i) => i === idx));
      }, 500);
    } else {
      setOpenFaqs((prev) => prev.map((_, i) => i === idx));
    }
  };

  const sectionIds = ['ana-sayfa', 'nasil-dusunur', 'kimler-icin', 'nasil-calisir', 'deneyimler', 'demo', 'sss'];

  const scrollToSection = (idx: number) => {
    // Ana sayfaya tıklanınca sadece scroll yap, animasyonu yeniden tetikleme
    const sectionId = sectionIds[idx];
    const section = document.getElementById(sectionId);
    if (section) {
      const viewportHeight = window.innerHeight;
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;

      // Navbar yüksekliği için offset
      const navbarHeight = 180;

      // Eğer bölüm viewport'tan kısa ise: ortalayarak göster
      // Eğer bölüm viewport'tan uzun ise: başlığı navbar altında göster
      let scrollPosition;
      if (sectionHeight <= viewportHeight * 0.7) {
        // Kısa bölümler: ortala
        const centerOffset = (viewportHeight - sectionHeight) / 2;
        scrollPosition = elementPosition - centerOffset;
      } else {
        // Uzun bölümler: başlığı navbar altında göster
        scrollPosition = elementPosition - navbarHeight;
      }

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scrollTo query parameter from other pages (e.g., /iletisim)
  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo) {
      // Longer delay to ensure page is fully loaded and rendered
      const timeout = setTimeout(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          const sectionIdx = sectionIds.indexOf(scrollTo);

          // For external navigation, scroll directly without triggering heroKey animation reset
          const section = document.getElementById(scrollTo);
          if (section) {
            const viewportHeight = window.innerHeight;
            const sectionRect = section.getBoundingClientRect();
            const sectionHeight = sectionRect.height;
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;

            const navbarHeight = 180;

            let scrollPosition;
            if (sectionHeight <= viewportHeight * 0.7) {
              const centerOffset = (viewportHeight - sectionHeight) / 2;
              scrollPosition = elementPosition - centerOffset;
            } else {
              scrollPosition = elementPosition - navbarHeight;
            }

            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
          }

          // Clean up URL after scrolling
          window.history.replaceState({}, '', '/');
        });
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

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

    const handleScroll4 = () => {
      const node = revealRef4.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress4(clamped);
    };

    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleScroll5 = () => {
      const node = revealRef5.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress5(clamped);
    };

    const handleScroll6 = () => {
      const node = revealRef6.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress6(clamped);
    };

    const handleScroll7 = () => {
      const node = revealRef7.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const start = viewport * 0.55;
      const end = viewport * 0.15;
      const distance = start - end || 1;
      const raw = (start - rect.top) / distance;
      const clamped = Math.min(1, Math.max(0, raw));
      setRevealProgress7(clamped);
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
    handleScroll4();
    handleScroll5();
    handleScroll6();
    handleScroll7();
    handleTimelineScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll2, { passive: true });
    window.addEventListener("scroll", handleScroll3, { passive: true });
    window.addEventListener("scroll", handleScroll4, { passive: true });
    window.addEventListener("scroll", handleScroll5, { passive: true });
    window.addEventListener("scroll", handleScroll6, { passive: true });
    window.addEventListener("scroll", handleScroll7, { passive: true });
    window.addEventListener("scroll", handleTimelineScroll, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll2);
      window.removeEventListener("scroll", handleScroll3);
      window.removeEventListener("scroll", handleScroll4);
      window.removeEventListener("scroll", handleScroll5);
      window.removeEventListener("scroll", handleScroll6);
      window.removeEventListener("scroll", handleScroll7);
      window.removeEventListener("scroll", handleTimelineScroll);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sectionData = [
      { id: 'ana-sayfa', index: 0 },
      { id: 'nasil-dusunur', index: 1 },
      { id: 'kimler-icin', index: 2 },
      { id: 'nasil-calisir', index: 3 },
      { id: 'deneyimler', index: 4 },
      { id: 'demo', index: 5 },
      { id: 'sss', index: 6 },
    ];

    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Calculate how much of the section is visible in viewport
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with highest visibility
        let maxVisibility = 0;
        let mostVisibleSection = -1;

        sectionData.forEach(({ id, index }) => {
          const visibility = visibilityMap.get(id) || 0;
          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            mostVisibleSection = index;
          }
        });

        // Only update if we have a visible section
        if (maxVisibility > 0) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        // Multiple thresholds for granular visibility tracking
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        // Adjust root margin to account for fixed header
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    // Observe all sections
    sectionData.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#e8ffe6] via-white to-white text-slate-900 overflow-x-hidden">
      <header
        className={`fixed top-5 left-0 right-0 z-[100] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 min-[500px]:gap-12 px-3 min-[500px]:px-6 md:px-8 transition-all duration-300 w-[95%] max-w-[1440px] ${isScrolled
          ? "bg-white/70 py-3 shadow-lg shadow-black/5 backdrop-blur-md rounded-full"
          : "py-6"
          }`}
      >
        <div
          onClick={() => scrollToSection(0)}
          className="relative flex h-12 items-center shrink-0 overflow-visible z-0 justify-self-start cursor-pointer"
        >
          {/* Mobile logo - sabit boyut, sıkıştırılmaz, doğal oran korunur */}
          <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/logo-mobile.png" alt="Yosuun" className="min-[724px]:hidden h-[64px]" />
          {/* Desktop logo */}
          <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/yosuun-new-logo.png" alt="Yosuun" className="hidden min-[724px]:block h-[200px] w-auto max-w-[240px] min-[1400px]:max-w-none" />
        </div>
        <nav className="relative flex items-center rounded-full border border-white/20 bg-white/50 p-1.5 backdrop-blur z-10 justify-self-center">
          {/* Desktop Navigation - 1400px ve üstü: tüm butonlar görünür */}
          <div className="hidden min-[1400px]:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const current = activeSection === -1 ? 0 : activeSection;
              const isActive = idx === current;

              return (
                <button
                  key={`nav-desktop-${idx}`}
                  onClick={() => scrollToSection(idx)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap ${isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                    }`}
                  type="button"
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Tablet Navigation - 1000px-1400px arası: 7 buton, horizontal scroll */}
          <div className="hidden min-[1000px]:block min-[1400px]:hidden overflow-hidden w-[338px]">
            <div
              className="flex items-center gap-1 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${(() => {
                  const section = activeSection === -1 ? 0 : activeSection;
                  const itemWidth = 114; // 110px buton + 4px gap
                  if (section <= 1) return 0;
                  if (section >= 5) return -(4 * itemWidth);
                  return -((section - 1) * itemWidth);
                })()
                  }px)`
              }}
            >
              {navItems.map((item, idx) => {
                const current = activeSection === -1 ? 0 : activeSection;
                const isActive = idx === current;

                return (
                  <button
                    key={`nav-tablet-${idx}`}
                    onClick={() => scrollToSection(idx)}
                    className={`rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center ${isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                      }`}
                    type="button"
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Navigation - 1000px altı: dropdown tarzı */}
          <div className="min-[1000px]:hidden relative" ref={dropdownRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-between gap-2 rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap bg-white text-slate-900 shadow-sm min-w-[140px]"
              type="button"
            >
              <span>{navItems[activeSection === -1 ? 0 : activeSection]}</span>
              <span className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-md shadow-lg py-2 z-50">
                {navItems.map((item, idx) => {
                  const current = activeSection === -1 ? 0 : activeSection;
                  const isActive = idx === current;

                  return (
                    <button
                      key={`nav-mobile-${idx}`}
                      onClick={() => {
                        scrollToSection(idx);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-center px-4 py-2.5 text-sm font-medium transition ${isActive
                        ? "bg-[#78f666]/20 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      type="button"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-2 shrink-0 justify-self-end ml-1 min-[724px]:ml-0">
          {/* Mobile: sadece ok ikonu */}
          <Link href="/iletisim" className="min-[724px]:hidden relative">
            <div className="absolute -inset-[0.125rem] bg-black rounded-full"></div>
            <div className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900 shadow-md transition hover:translate-y-[-1px] p-2">
              <ArrowIcon />
            </div>
          </Link>
          {/* Desktop: tam buton */}
          <Link href="/iletisim" className="hidden min-[724px]:flex items-center gap-2 rounded-full bg-black pl-5 pr-1.5 py-1.5 text-sm font-semibold !text-white shadow-md transition hover:translate-y-[-1px] hover:bg-slate-900 whitespace-nowrap">
            Bize Ulaşın
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </header>
      <div id="ana-sayfa" className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col container-padding pb-4 pt-10">

        <main className="flex flex-1 flex-col items-center text-center">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 w-full translate-y-16">
            <div className="flex flex-col items-center gap-2">
              <p className="max-w-4xl heading-hero font-semibold leading-tight tracking-tight text-black">
                {"Sen hayatını yaşa".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-slide-in-right opacity-0"
                    style={{ animationDelay: `${i * 0.015}s` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
              <p className="max-w-4xl heading-hero leading-tight tracking-tight text-slate-800">
                <span className="font-serif italic text-black">
                  {"E-ticaret sessizce çalışsın".split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block animate-slide-in-right opacity-0"
                      // Offset delay by first string length (approx 17 chars * 0.015s = ~0.25s)
                      style={{ animationDelay: `${(17 + i) * 0.015}s` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              </p>
            </div>

            <p
              className="max-w-3xl px-6 md:px-0 text-responsive text-slate-600 animate-slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Yosuun, e-ticaretteki yükü senden alır. Zamanı okur, doğru aksiyonları kendi başına uygular. Sen hayatını yaşarken, e-ticaret arka planda çalışır.
            </p>

            <div className="flex flex-row items-center gap-responsive-lg">
              <Link href="/iletisim" className="btn-responsive group inline-flex items-center justify-between rounded-full bg-[#78f666] font-semibold !text-white shadow-lg shadow-[#25f707]/30 transition hover:translate-y-[-1px]">
                Yosuun’u Keşfet
                <span className="btn-icon grid place-items-center rounded-full bg-white text-slate-900">
                  <ArrowIcon />
                </span>
              </Link>

              <div className="flex flex-row items-center gap-4">
                <div className="flex -space-x-3">
                  {avatarPalette.map((avatar) => (
                    <div
                      key={avatar.name}
                      className="avatar-responsive relative flex items-center justify-center overflow-hidden rounded-full font-semibold uppercase text-white shadow ring-4 ring-white"
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

                <div className="flex flex-col items-center gap-1 text-sm-responsive text-slate-600 md:items-start">
                  <div className="flex items-center gap-1 text-amber-500 flex-shrink-0">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx} className="star-responsive">
                        <StarIcon />
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-800">Birçok markanın tercihi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center translate-y-2">
            <div className="mt-10 h-6 flex items-center justify-center md:mt-0 -translate-y-5">
              <p className="text-sm-responsive text-slate-500">
                Markalar işine odaklanırken, Yosuun geri kalanını halleder
              </p>
            </div>

            <div className="logo-marquee-margin logo-marquee relative w-full overflow-hidden opacity-60">
              <div className="logo-track flex w-[200%] items-center justify-around gap-[25px]">
                {[
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/7.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/8.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/9.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/10.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/11.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/12.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/13.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/7.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/8.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/9.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/10.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/11.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/12.png",
                  "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/13.png",
                ].map((logo, idx) => (
                  <div key={idx} className="relative logo-item-responsive flex items-center justify-center">
                    <img
                      src={logo}
                      alt="Yosuun Referans"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <section id="nasil-dusunur" className="mx-auto section-spacing-sm flex w-full max-w-6xl flex-col items-center container-padding scroll-mt-[180px] min-[724px]:scroll-mt-[200px] min-[1500px]:scroll-mt-[250px]">




        <div className="mt-0 flex w-full flex-col items-center gap-6 text-center">
          <div ref={headingRef} className="w-full">
            <h2
              ref={revealRef}
              className={`max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800 ${isHeadingVisible ? "animate-slide-in-up" : "opacity-0"}`}
            >
              {allChars.map((item, idx) => {
                const totalChars = allChars.length;
                const step = 0.85 / totalChars; // Dinamik step: tüm karakterler %85 progress'te tamamlanır
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
          </div>

          <div
            ref={pillsRef}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <span
              className={`flex items-center justify-center gap-2 rounded-full bg-[#78f666] pill-responsive font-serif italic text-white ${isPillsVisible ? "animate-slide-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              Akıl
            </span>
            <span
              className={`flex items-center justify-center gap-2 rounded-full bg-[#78f666] pill-responsive font-serif italic text-white ${isPillsVisible ? "animate-slide-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.6s" }}
            >
              Süreklilik
            </span>
            <span
              className={`flex items-center justify-center gap-2 rounded-full bg-[#78f666] pill-responsive font-serif italic text-white ${isPillsVisible ? "animate-slide-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.8s" }}
            >
              Uyum
            </span>
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-stats-responsive grid w-full grid-cols-3 gap-0"
        >
          {statBlocks.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center ${idx !== statBlocks.length - 1
                ? "border-r border-slate-200"
                : ""
                } ${isStatsVisible ? "animate-slide-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${1.0 + idx * 0.2}s` }}
            >
              <div className="flex items-start justify-center text-[#1a1a1a]">
                {idx === 0 && (
                  <span className="mr-1 mt-2 stat-plus-responsive font-medium leading-none">+</span>
                )}
                <span className="stat-number-responsive font-medium tracking-tighter">
                  {stat.value}
                </span>
              </div>
              <p className="mt-4 stat-label-responsive font-normal text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="kimler-icin" className="mx-auto section-spacing w-full max-w-6xl container-padding scroll-mt-[180px] min-[724px]:scroll-mt-[200px] min-[1500px]:scroll-mt-[250px]">
        <div ref={whoForHeadingRef} className="flex flex-col items-center gap-3 text-center">
          <h2
            ref={revealRef2}
            className={`max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800 ${isWhoForHeadingVisible ? "animate-slide-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            {allChars2.map((item, idx) => {
              const totalChars = allChars2.length;
              const step = 0.85 / totalChars;
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

        <div
          ref={servicesRef}
          className="mt-10 service-cards-grid"
        >
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`flex service-card-responsive flex-col justify-between ${isServicesVisible ? "animate-slide-in-up" : "opacity-0"}`}
              style={{
                backgroundColor: service.bg,
                animationDelay: `${0.5 + idx * 0.2}s`
              }}
            >
              {service.image ? (
                <img src={service.image} alt={service.title} className="service-icon-responsive object-contain" />
              ) : (
                <div className="service-title-responsive">{service.icon}</div>
              )}
              <p
                className="whitespace-pre-line service-title-responsive font-semibold text-slate-800"
              >
                {service.title}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className={`flex flex-row gap-responsive cta-banner-responsive bg-black text-white shadow-xl shadow-black/25 items-center justify-between ${isCtaVisible ? "animate-slide-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.5s" }}
        >
          <div>
            <p className="cta-title-responsive font-semibold">Kim Olursan Ol</p>
            <p className="cta-subtitle-responsive text-slate-300">Sende Yükünü Devretmek İstiyorsan</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-white cta-button-responsive font-semibold !text-black shadow-sm transition hover:translate-y-[-1px]">
              Bize Ulaşın
              <span className="grid cta-icon-responsive place-items-center rounded-full bg-slate-900/10 text-slate-900">
                <ArrowIcon />
              </span>
            </Link>
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full border border-white/40 cta-button-responsive font-semibold text-white transition hover:bg-white/10">
              Sizi Arayalım
              <span className="grid cta-icon-responsive place-items-center rounded-full bg-white/15">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>


      </section>

      <section id="nasil-calisir" className="mx-auto section-spacing w-full max-w-6xl container-padding scroll-mt-[180px] min-[724px]:scroll-mt-[200px] min-[1500px]:scroll-mt-[250px]">
        <div
          ref={howItWorksHeadingRef}
          className="flex flex-col items-center gap-3 text-center mb-16"
        >
          <h2
            ref={revealRef3}
            className={`max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800 ${isHowItWorksHeadingVisible ? "animate-slide-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            {allChars3.map((item, idx) => {
              const totalChars = allChars3.length;
              const step = 0.85 / totalChars;
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
            const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

            // Responsive itemHeight based on screen size
            let itemHeight = 288; // Default for large screens
            if (viewportWidth <= 450) {
              itemHeight = 160; // Very small screens
            } else if (viewportWidth <= 600) {
              itemHeight = 200; // Small screens
            } else if (viewportWidth <= 750) {
              itemHeight = 240; // Medium screens
            }

            const itemTop = timelineTop + (idx * itemHeight);

            // Responsive animation triggers based on viewport height
            let startMultiplier = 0.8;
            let endMultiplier = 0.5;
            if (viewportHeight < 700) {
              startMultiplier = 0.75;
              endMultiplier = 0.45;
            }
            if (viewportHeight < 500) {
              startMultiplier = 0.7;
              endMultiplier = 0.4;
            }

            const animationStartY = viewportHeight * startMultiplier;
            const animationEndY = viewportHeight * endMultiplier;
            const animationRange = animationStartY - animationEndY;
            const traveled = animationStartY - itemTop;
            const rawProgress = traveled / animationRange;
            const lineFill = Math.min(1, Math.max(0, rawProgress));
            const isActive = itemTop <= viewportHeight * endMultiplier;

            return (
              <div key={step} className="flex flex-col items-center">
                {/* Node */}
                <div
                  className={`grid place-items-center rounded-full font-semibold shadow-sm z-10 transition-all duration-300 ${step === "06" ? "timeline-circle-large-responsive overflow-visible" : "timeline-circle-responsive"}`}
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
                      <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/kucuk-logo.png" alt="Yosuun Active" className="h-[70px] w-[70px] object-contain translate-x-1" />
                    ) : (
                      <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/logo-mobile.png" alt="Yosuun" className="h-[70px] w-[70px] object-contain translate-x-1" />
                    )
                  ) : (
                    step
                  )}
                </div>
                {/* Connecting Line (not for last item) */}
                {idx < arr.length - 1 && (
                  <div className={`relative w-0.5 bg-slate-200 overflow-visible ${idx === 4 ? "timeline-line-last-responsive" : "timeline-line-responsive"}`}>
                    <div
                      className="absolute top-0 left-0 w-full bg-slate-900 transition-all duration-150"
                      style={{ height: `${lineFill * 100}%` }}
                    />
                    {/* Animated Card */}
                    <div
                      className={`absolute top-1/2 feature-card-responsive bg-slate-50 shadow-2xl border border-white flex flex-col justify-center ${idx % 2 === 0 ? "left-10" : "right-10"}`}
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
                        <img
                          src={[
                            "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/takvim.png",
                            "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/rakip.png",
                            "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/Aksiyon.png",
                            "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/izleme.png",
                            "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/rapor.png"
                          ][idx]}
                          alt="Yosuun Feature"
                          className="w-full h-[120px] mb-4 object-contain"
                        />
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



      <section id="deneyimler" className="mx-auto section-spacing w-full max-w-6xl container-padding scroll-mt-[150px]">
        <div
          ref={testimonialsHeadingRef}
          className="flex flex-col items-center gap-3 text-center mb-6"
        >
          <h2
            ref={revealRef4}
            className={`max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800 ${isTestimonialsHeadingVisible ? "animate-slide-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            {allChars4.map((item, idx) => {
              const totalChars = allChars4.length;
              const step = 0.85 / totalChars;
              const perChar = Math.min(
                1,
                Math.max(0, (revealProgress4 - idx * step) / 0.05)
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

        <div
          ref={testimonialsContentRef}
          className="mt-6 grid gap-responsive-lg sm:grid-cols-3 sm:items-stretch"
        >
          <div className={`sm:col-span-2 ${isTestimonialsContentVisible ? "animate-slide-in-left" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
            <div className="relative overflow-hidden rounded-[28px] bg-slate-900 shadow-xl shadow-black/20">
              <div
                className="absolute inset-0 bg-cover bg-top"
                style={{ backgroundImage: `url(${testimonial.image})` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/45 to-black/20" />
              <div className="relative flex testimonial-card-responsive flex-col justify-end gap-3 text-white">
                <p className="testimonial-label-responsive font-semibold tracking-[0.2em] text-white/70">
                  KULLANICI HİKAYESİ
                </p>
                <p className="testimonial-quote-responsive font-semibold mt-auto">
                  {testimonial.quote}
                </p>
                <div className="mt-3 text-white/80 flex items-end justify-between">
                  <div>
                    <p className="testimonial-author-responsive font-semibold">{testimonial.author}</p>
                    <p className="testimonial-desc-responsive">{testimonial.title}</p>
                  </div>
                  <Link
                    href="/kullanici-hikayesi"
                    className="text-white/70 hover:text-white transition testimonial-desc-responsive font-medium underline underline-offset-2"
                  >
                    Detay Gör
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`flex flex-col justify-between testimonial-green-card-responsive bg-[#ccfac5] text-slate-900 shadow-lg shadow-black/10 ${isTestimonialsContentVisible ? "animate-slide-in-right" : "opacity-0"}`} style={{ animationDelay: "0.7s" }}>
            <p className="testimonial-label-responsive font-semibold tracking-[0.2em] text-slate-700">PAW & MORE</p>
            <div className="testimonial-green-content-spacing flex flex-col gap-3">
              <p className="testimonial-number-responsive font-semibold leading-none">{testimonial.stat}</p>
              <p className="testimonial-subtitle-responsive font-semibold leading-6 text-slate-800">
                {testimonial.statLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto section-spacing w-full max-w-6xl container-padding scroll-mt-[150px]">
        <div ref={demoHeadingRef} className="text-center">
          <h2
            ref={revealRef5}
            className={`max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800 ${isDemoHeadingVisible ? "animate-slide-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            {allChars5.map((item, idx) => {
              const totalChars = allChars5.length;
              const step = 0.85 / totalChars;
              const perChar = Math.min(
                1,
                Math.max(0, (revealProgress5 - idx * step) / 0.05)
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

        <div
          ref={featureCardsRef}
          className="demo-section-spacing demo-cards-grid"
        >
          {[...pricingPlans, ...pricingPlans].map((plan, idx) => {
            const cardNames = ["Mağaza", "Stok", "Rakip", "Otomasyon"];
            const cardFeatures = [
              ["Mağaza Entegrasyonu", "Sanal Mağaza Paneli", "Detaylı Ürün Düzenleme", "Toplu Ürün Yükleme", "Sipariş Takibi"],
              ["Anlık Stok Takibi", "Tekli & Toplu Stok Güncelleme", "Detaylı Stok Seviye Belirlemesi", "Stok Alt Limit Uyarıları", "Anında Stok Değişikliği"],
              ["Rakip Mağaza Ekleme", "Rakip Sanal Mağaza Oluşturma", "Detaylı Rakip Ürün Takibi", "Detaylı Rakip Fiyat Takibi", "Rakip Değişikliklerini Sürekli İzleme"],
              ["Tüm İşlemleri Yosuun'a Devretme", "Takvim Bazlı İş Planlama", "Geleceğe Yönelik Aksiyon Alma", "Geçmişteki İşlemleri Görüntüleme"],
            ];

            let animClass = "";
            let animDelay = "0s";

            if (idx === 1) { // Stok
              animClass = "animate-slide-in-left";
              animDelay = "0s";
            } else if (idx === 2) { // Rakip
              animClass = "animate-slide-in-right";
              animDelay = "0.2s";
            } else if (idx === 0) { // Mağaza
              animClass = "animate-slide-in-left";
              animDelay = "0.4s";
            } else if (idx === 3) { // Otomasyon
              animClass = "animate-slide-in-right";
              animDelay = "0.6s";
            }

            return (
              <div
                key={`${plan.name}-${idx}`}
                className={`flex flex-col demo-card-responsive shadow-lg shadow-black/15 ${isFeatureCardsVisible ? animClass : "opacity-0"}`}
                style={{ backgroundColor: plan.bg, color: plan.text, animationDelay: animDelay }}
              >
                <div className="space-y-6">
                  <span
                    className="inline-flex items-center rounded-full demo-badge-responsive font-semibold"
                    style={{
                      backgroundColor: (idx === 1 || idx === 3) ? "#ffffff" : plan.pillBg,
                      color: (idx === 1 || idx === 3) ? "#000000" : (idx === 0 || idx === 2) ? "#ffffff" : plan.pillText
                    }}
                  >
                    {cardNames[idx]}
                  </span>
                  <div className="space-y-2">
                    <div className="space-y-2 demo-feature-text-responsive">
                      {cardFeatures[idx].map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <svg
                            aria-hidden
                            viewBox="0 0 24 24"
                            className={`demo-icon-responsive ${(idx === 1 || idx === 3) ? "text-white" : "text-slate-900"}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m5 13 4 4 10-10" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Element */}
        <div
          ref={demoCtaRef}
          className={`flex flex-row gap-responsive cta-banner-responsive bg-black text-white shadow-xl shadow-black/25 items-center justify-between ${isDemoCtaVisible ? "animate-slide-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.5s" }}
        >
          <div>
            <p className="cta-title-responsive font-semibold">Demo Talep Et</p>
            <p className="cta-subtitle-responsive text-slate-300">Bu kadar detayı tek tek yönetmek zorunda değilsin.</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-white cta-button-responsive font-semibold !text-black shadow-sm transition hover:translate-y-[-1px]">
              Bize Ulaşın
              <span className="grid cta-icon-responsive place-items-center rounded-full bg-slate-900/10 text-slate-900">
                <ArrowIcon />
              </span>
            </Link>
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full border border-white/40 cta-button-responsive font-semibold text-white transition hover:bg-white/10">
              Sizi Arayalım
              <span className="grid cta-icon-responsive place-items-center rounded-full bg-white/15">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="sss" className="mx-auto mt-48 mb-48 w-full max-w-4xl px-6 scroll-mt-[150px]">
        <div>
          <div
            ref={faqHeadingRef}
            className="text-center"
          >
            <h2
              ref={revealRef6}
              className={`max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800 ${isFaqHeadingVisible ? "animate-slide-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              {allChars6.map((item, idx) => {
                const totalChars = allChars6.length;
                const step = 0.85 / totalChars;
                const perChar = Math.min(
                  1,
                  Math.max(0, (revealProgress6 - idx * step) / 0.05)
                );
                const alpha = 0.2 + perChar * 0.8;
                const baseRgb = item.color || "28, 42, 60";
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

          <div
            ref={faqItemsRef}
            className="mt-10 space-y-4"
          >
            {faqs.map((item, idx) => {
              const isOpen = openFaqs[idx];
              return (
                <div
                  key={idx}
                  className={`overflow-hidden rounded-[18px] border border-[#CCFAC5] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] ${isFaqItemsVisible ? "animate-slide-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-8 py-6 text-left text-xs sm:text-lg font-semibold text-[#1c2a3c]"
                    onClick={() => handleFaqToggle(idx)}
                  >
                    <span>{item.question}</span>
                    <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDownIcon />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-8 pb-8 text-[0.65rem] sm:text-base leading-5 sm:leading-6 text-[#465568]">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="footer-cta" className="mx-auto section-spacing w-full max-w-6xl container-padding">
        <div className="overflow-hidden footer-cta-container bg-gradient-to-r from-[#ccfac5] via-white to-white text-center shadow-[0_16px_40px_rgba(0,0,0,0.08)]">

          <h2
            ref={revealRef7}
            className="max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800"
          >
            {allChars7.map((item, idx) => {
              const alpha = 1;
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

          <p className="footer-cta-text text-slate-600">
            Yosuun, mağaza, stok, rakip ve planlama yükünü devralır. <br />Sen sadece kontrolü elinde tutarsın.
          </p>
          <div className="footer-cta-button-wrapper flex justify-center">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-black footer-cta-button font-semibold !text-white shadow-md transition hover:translate-y-[-1px] hover:bg-slate-900 whitespace-nowrap">
              Bize Ulaşın
              <span className="grid footer-cta-icon place-items-center rounded-full bg-white text-slate-900">
                <ArrowIcon />
              </span>
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-gradient-to-br from-[#e8ffe6] via-white to-white" />}>
      <HomeContent />
    </Suspense>
  );
}
