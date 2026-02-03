"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function KullaniciHikayesiPage() {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const navItems = ['Ana Sayfa', 'Nasıl Düşünür', 'Kimler İçin', 'Nasıl Çalışır', 'Deneyimler', 'Demo', 'SSS'];
    const sectionIds = ['ana-sayfa', 'nasil-dusunur', 'kimler-icin', 'nasil-calisir', 'deneyimler', 'demo', 'sss'];
    const navigateToSection = (sectionId: string) => {
        router.push(`/?scrollTo=${sectionId}`);
    };

    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
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

    // ... (keeping imports and top part same)

    return (
        <div className="min-h-[100dvh] flex flex-col bg-gradient-to-br from-[#e8ffe6] via-white to-white text-slate-900">
            {/* Navbar - Same as homepage */}
            <header className={`fixed top-5 left-0 right-0 z-[100] mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 min-[500px]:gap-12 px-3 min-[500px]:px-6 md:px-8 transition-all duration-300 w-[95%] max-w-[1440px] ${isScrolled ? "bg-white/70 py-3 shadow-lg shadow-black/5 backdrop-blur-md rounded-full" : "py-6"}`}>
                <Link href="/" className="relative flex h-12 items-center shrink-0 overflow-visible z-0 justify-self-start cursor-pointer">
                    <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/logo-mobile.png" alt="Yosuun" className="min-[724px]:hidden h-[64px]" />
                    <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/yosuun-new-logo.png" alt="Yosuun" className="hidden min-[724px]:block h-[200px] w-auto max-w-none" />
                </Link>
                <nav className="flex items-center gap-1 rounded-full border border-white/20 bg-white/50 p-1.5 backdrop-blur z-10 justify-self-center">
                    {/* Desktop Navigation - 1400px ve üstü: tüm butonlar görünür */}
                    <div className="hidden min-[1400px]:flex items-center gap-1">
                        <button onClick={() => navigateToSection('ana-sayfa')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Ana Sayfa</button>
                        <button onClick={() => navigateToSection('nasil-dusunur')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Nasıl Düşünür</button>
                        <button onClick={() => navigateToSection('kimler-icin')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Kimler İçin</button>
                        <button onClick={() => navigateToSection('nasil-calisir')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Nasıl Çalışır</button>
                        <button onClick={() => navigateToSection('deneyimler')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Deneyimler</button>
                        <button onClick={() => navigateToSection('demo')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Demo</button>
                        <button onClick={() => navigateToSection('sss')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">SSS</button>
                    </div>

                    {/* Tablet Navigation - 1000px-1400px arası: 7 buton, horizontal scroll */}
                    <div className="hidden min-[1000px]:block min-[1400px]:hidden overflow-hidden w-[338px]">
                        <div className="flex items-center gap-1">
                            <button onClick={() => navigateToSection('ana-sayfa')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Ana Sayfa</button>
                            <button onClick={() => navigateToSection('nasil-dusunur')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Nasıl Düşünür</button>
                            <button onClick={() => navigateToSection('kimler-icin')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Kimler İçin</button>
                            <button onClick={() => navigateToSection('nasil-calisir')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Nasıl Çalışır</button>
                            <button onClick={() => navigateToSection('deneyimler')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Deneyimler</button>
                            <button onClick={() => navigateToSection('demo')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Demo</button>
                            <button onClick={() => navigateToSection('sss')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">SSS</button>
                        </div>
                    </div>

                    {/* Mobile Navigation - 1000px altı: dropdown tarzı */}
                    <div className="min-[1000px]:hidden relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center justify-between gap-2 rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap bg-white text-slate-900 shadow-sm min-w-[140px]"
                            type="button"
                        >
                            <span>Ana Sayfa</span>
                            <span className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}>
                                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6"></path>
                                </svg>
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-md shadow-lg py-2 z-50">
                                {navItems.map((item, idx) => (
                                    <button
                                        key={`nav-mobile-${idx}`}
                                        onClick={() => {
                                            navigateToSection(sectionIds[idx]);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-center px-4 py-2.5 text-sm font-medium transition text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        type="button"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
                <div className="flex items-center gap-2 shrink-0 justify-self-end ml-1 min-[724px]:ml-0">
                    {/* Mobile: sadece ok ikonu */}
                    <Link href="/iletisim" className="min-[724px]:hidden relative">
                        <div className="absolute -inset-[0.125rem] bg-black rounded-full"></div>
                        <div className="relative grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900 shadow-md transition hover:translate-y-[-1px] p-2">
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </Link>
                    <Link href="/iletisim" className="hidden min-[724px]:flex items-center gap-2 rounded-full bg-black pl-5 pr-1.5 py-1.5 text-sm font-semibold !text-white shadow-md transition hover:translate-y-[-1px] hover:bg-slate-900 whitespace-nowrap">
                        Bize Ulaşın
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900">
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                    </Link>
                </div>
            </header>

            {/* Page Content */}
            <main className="pt-[100px] w-[95%] max-w-[1440px] mx-auto px-3 min-[500px]:px-6 md:px-8 flex-grow">
                <div className="mx-auto max-w-4xl">


                    {/* Animated Heading */}
                    <AnimatedHeading
                        segments={[
                            { text: "Kontrol", className: "font-serif italic", color: "120, 246, 102" },
                            { text: " Hala Bende\n" },
                            { text: "Yük", className: "font-serif italic", color: "120, 246, 102" },
                            { text: " Artık Değil" },
                        ]}
                        className="mt-20 max-w-full whitespace-pre-line text-[clamp(2.5rem,5vw+1rem,3.75rem)] font-semibold leading-tight tracking-tight text-slate-800 text-center"
                        start={0.85}
                        end={0.35}
                    />
                </div>

                {/* Content Section */}
                <div className="mx-auto max-w-4xl mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
                    {/* Left: Text */}
                    <div className="space-y-6 text-[15px] sm:text-lg leading-relaxed text-slate-700 order-last md:order-first">
                        <p>
                            E-ticaret dışarıdan bakıldığında satış gibi görünür. Ama işin içinde olan herkes bilir ki asıl yük, satıştan önce başlar. Ürünler, stoklar, rakipler ve içerikler aynı anda ilerler ve zihni yorar.
                        </p>
                        <p>
                            Bugüne kadar birçok markayı farklı altyapılarda yönettim. Sorunun bilgi eksikliği değil, yükün her yerde olması olduğunu gördüm. Bu durumu, Swifty'de birlikte çalıştığımız dönemde Yağız Efe Alaybay'a da e-ticaret mentörlüğü yaparken yakından deneyimledik. Yosuun fikri de tam bu noktada şekillendi.
                        </p>
                    </div>

                    {/* Right: Visual Element */}
                    <div className="relative overflow-hidden rounded-[28px] bg-slate-900 shadow-xl shadow-black/20 w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
                        <div
                            className="absolute inset-0 bg-cover"
                            style={{ backgroundImage: `url(https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/serhat1.png)`, backgroundPosition: '60% center' }}
                            aria-hidden
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            {/* Optional caption or empty to just show image style */}
                        </div>
                    </div>
                </div>

                {/* Second Section: Image Left, Text Right */}
                <div className="mx-auto max-w-4xl mt-32 grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
                    {/* Left: Visual Element */}
                    <div className="relative overflow-hidden rounded-[28px] bg-slate-900 shadow-xl shadow-black/20 w-full aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
                        <div
                            className="absolute inset-0 bg-cover"
                            style={{ backgroundImage: `url(https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/serhat2.png)`, backgroundPosition: '85% center' }}
                            aria-hidden
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Right: Text */}
                    <div className="space-y-6 text-[15px] sm:text-lg leading-relaxed text-slate-700">
                        <p>
                            Yosuun kontrolü elimden almıyor, yükü alıyor. Rakip takibi, stok kontrolü ve ürün düzenlemeleri arka planda otomatik ilerliyor. Veriyi okuyor, karşılaştırıyor ve aksiyon üretiyor. Ben istersem onaylıyorum, istersem kurallar çerçevesinde kendi kendine uyguluyor.
                        </p>
                        <p>
                            En büyük fark şu: E-ticaret artık önümde değil, arka planda ilerliyor. Bu da bana stratejiye odaklanma alanı açıyor. Kısaca söylemek gerekirse: Kontrol hâlâ bende. Yük artık değil. Yosuun'u bu yüzden kullanıyorum.
                        </p>
                        <div className="mt-6 text-sm text-slate-600">
                            <p className="font-semibold">Serhat ATİK</p>
                            <p>Swifty E-Ticaret Marka Yönetim Ajansı | E-Ticaret Eğitmeni</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-6xl mt-48">
                    <div className="overflow-hidden footer-cta-container bg-gradient-to-r from-[#ccfac5] via-white to-white text-center shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                        <AnimatedHeading
                            segments={[
                                { text: "E-ticaret " },
                                { text: "senin yerine", className: "font-serif italic", color: "120, 246, 102" },
                                { text: " yöneten bir sistemle tanış." },
                            ]}
                            className="max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800"
                            start={0.85}
                            end={0.35}
                        />
                        <p className="footer-cta-text text-slate-600">
                            Yosuun, mağaza, stok, rakip ve planlama yükünü devralır. <br />Sen sadece kontrolü elinde tutarsın.
                        </p>
                        <div className="footer-cta-button-wrapper flex justify-center">
                            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-black footer-cta-button font-semibold !text-white shadow-md transition hover:translate-y-[-1px] hover:bg-slate-900 whitespace-nowrap">
                                Bize Ulaşın
                                <span className="grid footer-cta-icon place-items-center rounded-full bg-white text-slate-900">
                                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                        <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

// Type for animated heading segments
type AnimatedSegment = { text: string; className?: string; color?: string };

// AnimatedHeading component - copied from main page
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
