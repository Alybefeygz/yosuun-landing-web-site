"use client";

import { useState, useRef, useEffect, useLayoutEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";

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

const faqs = [
    {
        question: "Yosuun tam olarak ne yapar?",
        answer: "Yosuun, e-ticaret operasyonunu senin adına izler, analiz eder ve gerekli izinlerle uygular. Ürün, stok, rakip ve planlama süreçlerini tek sistemde toplar ve yükü üzerinden alır."
    },
    {
        question: "Yosuun benim yerime karar mı verir?",
        answer: "Normal akışta hayır. Kontrol sende kalır. Yosuun veriyi okur, aksiyonları üretir, sana gösterir ve onayladığında uygular. İstersen gerekli izinleri ve kuralları tanımladığında, bu aksiyonları sana sormadan otomatik olarak da uygular. Yapılan tüm işlemler her zaman görünür ve kayıt altındadır."
    },
    {
        question: "Rakiplerimi nasıl takip ediyor?",
        answer: "Sen rakip mağazaların linklerini eklersin. Yosuun bu mağazalar için özel bir sanal alan oluşturur ve ürün, fiyat, içerik ve yorum değişikliklerini düzenli olarak izler."
    },
    {
        question: "Yosuun yaptığı işlemleri görebilir miyim?",
        answer: "Evet. Yapılan tüm işlemler takvimde tarih ve saat bilgisiyle kayıt altındadır. Hangi gün, hangi aksiyon alındı net şekilde görünür."
    },
    {
        question: "Demo nasıl ilerliyor?",
        answer: "Demo’da Yosuun’u canlı olarak gösteriyoruz. İstersen örnek bir yapı üzerinden, istersen kendi mağazanı bağlayarak sistemi birebir görürsün. Demo sonrasında dilediğin anda kendi mağazaların için kullanmaya başlayabilirsin."
    }
];

// Character data for the "Yosuun hakkında en çok merak edilenler" heading
const allChars6 = [
    { char: "Y", className: "font-serif italic", color: "120, 246, 102" },
    { char: "o", className: "font-serif italic", color: "120, 246, 102" },
    { char: "s", className: "font-serif italic", color: "120, 246, 102" },
    { char: "u", className: "font-serif italic", color: "120, 246, 102" },
    { char: "u", className: "font-serif italic", color: "120, 246, 102" },
    { char: "n", className: "font-serif italic", color: "120, 246, 102" },
    { char: " ", className: "", color: "28, 42, 60" },
    { char: "h", className: "", color: "28, 42, 60" },
    { char: "a", className: "", color: "28, 42, 60" },
    { char: "k", className: "", color: "28, 42, 60" },
    { char: "k", className: "", color: "28, 42, 60" },
    { char: "ı", className: "", color: "28, 42, 60" },
    { char: "n", className: "", color: "28, 42, 60" },
    { char: "d", className: "", color: "28, 42, 60" },
    { char: "a", className: "", color: "28, 42, 60" },
    { char: "\n", className: "", color: "" },
    { char: "e", className: "", color: "28, 42, 60" },
    { char: "n", className: "", color: "28, 42, 60" },
    { char: " ", className: "", color: "28, 42, 60" },
    { char: "ç", className: "", color: "28, 42, 60" },
    { char: "o", className: "", color: "28, 42, 60" },
    { char: "k", className: "", color: "28, 42, 60" },
    { char: " ", className: "", color: "28, 42, 60" },
    { char: "m", className: "font-serif italic", color: "120, 246, 102" },
    { char: "e", className: "font-serif italic", color: "120, 246, 102" },
    { char: "r", className: "font-serif italic", color: "120, 246, 102" },
    { char: "a", className: "font-serif italic", color: "120, 246, 102" },
    { char: "k", className: "font-serif italic", color: "120, 246, 102" },
    { char: " ", className: "", color: "28, 42, 60" },
    { char: "e", className: "", color: "28, 42, 60" },
    { char: "d", className: "", color: "28, 42, 60" },
    { char: "i", className: "", color: "28, 42, 60" },
    { char: "l", className: "", color: "28, 42, 60" },
    { char: "e", className: "", color: "28, 42, 60" },
    { char: "n", className: "", color: "28, 42, 60" },
    { char: "l", className: "", color: "28, 42, 60" },
    { char: "e", className: "", color: "28, 42, 60" },
    { char: "r", className: "", color: "28, 42, 60" },
    { char: ".", className: "", color: "28, 42, 60" },
];

function ChevronDownIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
        </svg>
    );
}

// Character data for the main contact heading
const contactHeadingChars = [
    { char: "Y", className: "font-serif italic", color: "120, 246, 102" },
    { char: "o", className: "font-serif italic", color: "120, 246, 102" },
    { char: "s", className: "font-serif italic", color: "120, 246, 102" },
    { char: "u", className: "font-serif italic", color: "120, 246, 102" },
    { char: "u", className: "font-serif italic", color: "120, 246, 102" },
    { char: "n", className: "font-serif italic", color: "120, 246, 102" },
    { char: "'", className: "font-serif italic", color: "120, 246, 102" },
    { char: "u", className: "font-serif italic", color: "120, 246, 102" },
    { char: "n", className: "font-serif italic", color: "120, 246, 102" },
    { char: " ", className: "", color: "15, 23, 42" },
    { char: "s", className: "", color: "15, 23, 42" },
    { char: "e", className: "", color: "15, 23, 42" },
    { char: "n", className: "", color: "15, 23, 42" },
    { char: "i", className: "", color: "15, 23, 42" },
    { char: "n", className: "", color: "15, 23, 42" },
    { char: " ", className: "", color: "15, 23, 42" },
    { char: "i", className: "", color: "15, 23, 42" },
    { char: "ç", className: "", color: "15, 23, 42" },
    { char: "i", className: "", color: "15, 23, 42" },
    { char: "n", className: "", color: "15, 23, 42" },
    { char: "\n", className: "", color: "" },
    { char: "n", className: "", color: "15, 23, 42" },
    { char: "e", className: "", color: "15, 23, 42" },
    { char: "l", className: "", color: "15, 23, 42" },
    { char: "e", className: "", color: "15, 23, 42" },
    { char: "r", className: "", color: "15, 23, 42" },
    { char: " ", className: "", color: "15, 23, 42" },
    { char: "y", className: "", color: "15, 23, 42" },
    { char: "a", className: "", color: "15, 23, 42" },
    { char: "p", className: "", color: "15, 23, 42" },
    { char: "a", className: "", color: "15, 23, 42" },
    { char: "b", className: "", color: "15, 23, 42" },
    { char: "i", className: "", color: "15, 23, 42" },
    { char: "l", className: "", color: "15, 23, 42" },
    { char: "e", className: "", color: "15, 23, 42" },
    { char: "c", className: "", color: "15, 23, 42" },
    { char: "e", className: "", color: "15, 23, 42" },
    { char: "ğ", className: "", color: "15, 23, 42" },
    { char: "i", className: "", color: "15, 23, 42" },
    { char: "n", className: "", color: "15, 23, 42" },
    { char: "i", className: "", color: "15, 23, 42" },
    { char: " ", className: "", color: "15, 23, 42" },
    { char: "k", className: "font-serif italic", color: "120, 246, 102" },
    { char: "o", className: "font-serif italic", color: "120, 246, 102" },
    { char: "n", className: "font-serif italic", color: "120, 246, 102" },
    { char: "u", className: "font-serif italic", color: "120, 246, 102" },
    { char: "ş", className: "font-serif italic", color: "120, 246, 102" },
    { char: "a", className: "font-serif italic", color: "120, 246, 102" },
    { char: "l", className: "font-serif italic", color: "120, 246, 102" },
    { char: "ı", className: "font-serif italic", color: "120, 246, 102" },
    { char: "m", className: "font-serif italic", color: "120, 246, 102" },
];

function ContactContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [openFaqs, setOpenFaqs] = useState<boolean[]>(faqs.map(() => false));
    const [revealProgress6, setRevealProgress6] = useState(0);
    const [revealProgressContact, setRevealProgressContact] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [isContactExpanded, setIsContactExpanded] = useState(false);
    const contactBtnRef = useRef<HTMLDivElement | null>(null);

    // Close contact button when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contactBtnRef.current && !contactBtnRef.current.contains(event.target as Node)) {
                setIsContactExpanded(false);
            }
        };

        if (isContactExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isContactExpanded]);

    const navItems = ['Ana Sayfa', 'Ajans mı?', 'Nasıl Çalışır', 'Kimler İçin', 'Deneyimler', 'Demo', 'SSS'];
    const sectionIds = ['ana-sayfa', 'ajans-mi', 'nasil-calisir', 'kimler-icin', 'deneyimler', 'demo', 'sss'];

    // Form states
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        wantCall: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Check for wantCall query param
    useEffect(() => {
        const wantCallParam = searchParams.get('wantCall');
        if (wantCallParam === 'true') {
            setFormData(prev => ({ ...prev, wantCall: true }));
        }
    }, [searchParams]);

    const { ref: faqHeadingRef, isInView: isFaqHeadingVisible } = useInView({ threshold: 0.1 });
    const { ref: faqItemsRef, isInView: isFaqItemsVisible } = useInView({ threshold: 0.1 });
    const { ref: contactHeadingRef, isInView: isContactHeadingVisible } = useInView({ threshold: 0.1 });

    const revealRef6 = useRef<HTMLHeadingElement>(null);
    const revealRefContact = useRef<HTMLHeadingElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [id]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName || !formData.email || !formData.message) {
            alert('Lütfen gerekli alanları doldurun (Ad, E-posta, Mesaj)');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Email gönderilemedi');
            }

            setSubmitStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                message: '',
                wantCall: false
            });
        } catch (error) {
            console.error('Email Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const navigateToSection = (sectionId: string) => {
        router.push(`/?scrollTo=${sectionId}`);
    };

    useLayoutEffect(() => {
        // Disable browser's automatic scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        // Force scroll to top synchronously
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        document.title = "yosuun - İletişim";
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

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

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isContactHeadingVisible) {
            const timeout = setTimeout(() => {
                let startTimestamp: number | null = null;
                const duration = 2000;
                const step = (timestamp: number) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    setRevealProgressContact(progress);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }, 300);
            return () => clearTimeout(timeout);
        } else {
            setRevealProgressContact(0);
        }
    }, [isContactHeadingVisible]);

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
        <div className="min-h-[100dvh] bg-gradient-to-br from-[#e8ffe6] via-white to-white text-slate-900">
            {/* Navbar - Same as homepage */}
            <header className={`fixed top-5 left-0 right-0 z-[100] mx-auto flex justify-between min-[1000px]:grid min-[1000px]:grid-cols-[1fr_auto_1fr] items-center gap-2 min-[500px]:gap-12 px-3 min-[500px]:px-6 md:px-8 transition-all duration-300 w-[95%] max-w-[1440px] ${isScrolled ? "bg-white/70 py-3 shadow-lg shadow-black/5 backdrop-blur-md rounded-full" : "py-6"}`}>
                <Link href="/" className="relative flex h-12 items-center shrink-0 overflow-visible z-0 justify-self-start cursor-pointer transition-all duration-300">
                    <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/logo-mobile.png" alt="Yosuun" className="min-[724px]:hidden h-[64px]" />
                    <img src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/yosuun-new-logo.png" alt="Yosuun" className="hidden min-[724px]:block h-[200px] w-auto max-w-none" />
                </Link>
                <nav className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-white/20 bg-white/50 p-1.5 backdrop-blur z-10 transition-all duration-300 origin-center ${isContactExpanded ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100"}`}>
                    {/* Desktop Navigation - 1400px ve üstü: tüm butonlar görünür */}
                    <div className="hidden min-[1400px]:flex items-center gap-1">
                        <button onClick={() => navigateToSection('ana-sayfa')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Ana Sayfa</button>
                        <button onClick={() => navigateToSection('ajans-mi')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Ajans mı?</button>
                        <button onClick={() => navigateToSection('nasil-calisir')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Nasıl Çalışır</button>
                        <button onClick={() => navigateToSection('kimler-icin')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Kimler İçin</button>
                        <button onClick={() => navigateToSection('deneyimler')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Deneyimler</button>
                        <button onClick={() => navigateToSection('demo')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">Demo</button>
                        <button onClick={() => navigateToSection('sss')} className="rounded-full px-5 py-2 text-sm font-medium transition whitespace-nowrap text-slate-600 hover:bg-white/50 hover:text-slate-900">SSS</button>
                    </div>

                    {/* Tablet Navigation - 1000px-1400px arası: 7 buton, horizontal scroll */}
                    <div className="hidden min-[1000px]:block min-[1400px]:hidden overflow-hidden w-[338px]">
                        <div className="flex items-center gap-1">
                            <button onClick={() => navigateToSection('ana-sayfa')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Ana Sayfa</button>
                            <button onClick={() => navigateToSection('ajans-mi')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Ajans mı?</button>
                            <button onClick={() => navigateToSection('nasil-calisir')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Nasıl Çalışır</button>
                            <button onClick={() => navigateToSection('kimler-icin')} className="rounded-full py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 w-[110px] text-center text-slate-600 hover:bg-white/50 hover:text-slate-900">Kimler İçin</button>
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
                                <ChevronDownIcon />
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
                <div className="flex items-center gap-2 shrink-0 justify-self-end ml-1 min-[724px]:ml-0 min-[1000px]:col-start-3">
                    {/* Mobile: sadece ok ikonu */}
                    {/* Mobile/Tablet Expanding Contact Button */}
                    <div className="min-[724px]:hidden relative w-9 h-9">
                        <div
                            ref={contactBtnRef}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end rounded-full transition-all duration-500 ease-spring z-50 cursor-pointer ${isContactExpanded ? "pr-1.5 pl-5 py-1.5 w-[145px]" : "w-9 h-9"
                                }`}
                            onClick={(e) => {
                                if (!isContactExpanded) {
                                    e.preventDefault();
                                    setIsContactExpanded(true);
                                } else {
                                    router.push('/iletisim');
                                }
                            }}
                        >
                            {/* Expanded Text */}
                            <span
                                className={`text-sm font-semibold text-white whitespace-nowrap overflow-hidden transition-all duration-300 absolute left-5 ${isContactExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                                    }`}
                            >
                                Bize Ulaşın
                            </span>

                            {/* Icon Container */}
                            <div className={`relative grid h-9 w-9 place-items-center rounded-full transition-all duration-300 z-10 ${isContactExpanded ? "bg-white text-slate-900 rotate-0" : "bg-white text-slate-900 shadow-md"
                                }`}>
                                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                    <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>

                            {/* Unified Background Element with smooth transition */}
                            <div className={`absolute bg-black rounded-full -z-10 transition-all duration-500 ease-spring ${isContactExpanded ? "inset-0" : "-inset-[4px]"
                                }`}></div>
                        </div>
                    </div>
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

            {/* Page content */}
            <main className="pt-28 sm:pt-40 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col items-center gap-3 text-center" ref={contactHeadingRef}>
                    <h2
                        className="max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800"
                    >
                        {contactHeadingChars.map((item, idx) => {
                            const baseRgb = item.color || "15, 23, 42";
                            // All items are opaque in data, so alpha is 1
                            return (
                                <span
                                    key={idx}
                                    className={item.className}
                                    style={{
                                        color: `rgba(${baseRgb}, 1)`,
                                    }}
                                >
                                    {item.char}
                                </span>
                            );
                        })}
                    </h2>
                </div>

                <div className="mx-auto mt-8 sm:mt-12 mb-12 sm:mb-20 w-full max-w-5xl rounded-[20px] sm:rounded-[32px] bg-white p-5 sm:p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:gap-4">
                        <div className="grid grid-cols-1 gap-2.5 sm:gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="Adınız"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-3 sm:px-5 py-2 sm:py-3.5 text-xs sm:text-sm md:text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Soyadınız"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-3 sm:px-5 py-2 sm:py-3.5 text-xs sm:text-sm md:text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 sm:gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="0500 000 00 00"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-3 sm:px-5 py-2 sm:py-3.5 text-xs sm:text-sm md:text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="ornek@sirket.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-3 sm:px-5 py-2 sm:py-3.5 text-xs sm:text-sm md:text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 sm:gap-2">
                            <textarea
                                id="message"
                                rows={2}
                                placeholder="Mesajınızı buraya yazabilirsiniz..."
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full resize-none rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-3 sm:px-5 py-2 sm:py-3.5 text-xs sm:text-sm md:text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                            ></textarea>

                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    id="wantCall"
                                    checked={Boolean(formData.wantCall)}
                                    onChange={handleInputChange}
                                    className="peer h-4 w-4 sm:h-5 sm:w-5 cursor-pointer appearance-none rounded-[4px] sm:rounded-md border border-slate-300 bg-white transition-all checked:border-[#78f666] checked:bg-[#78f666] hover:border-[#78f666] focus:outline-none focus:ring-2 focus:ring-[#78f666]/20"
                                />
                                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <label htmlFor="wantCall" className="cursor-pointer select-none text-xs sm:text-sm font-medium text-slate-700">
                                Beni arayabilirsiniz
                            </label>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="rounded-xl sm:rounded-2xl bg-green-50 border border-green-200 px-3 sm:px-5 py-2 sm:py-3.5 text-green-700 text-center text-xs sm:text-sm">
                                ✅ Mesajınız başarıyla gönderildi! Size en kısa sürede dönüş yapacağız.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="rounded-xl sm:rounded-2xl bg-red-50 border border-red-200 px-3 sm:px-5 py-2 sm:py-3.5 text-red-700 text-center text-xs sm:text-sm">
                                ❌ Bir hata oluştu. Lütfen tekrar deneyin veya bize doğrudan e-posta gönderin.
                            </div>
                        )}

                        <div className="flex justify-center pt-1 sm:pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`group flex items-center gap-1.5 sm:gap-2 rounded-full bg-black px-5 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/25 active:translate-y-0 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                                <span className="grid h-5 w-5 sm:h-7 sm:w-7 place-items-center rounded-full bg-white text-slate-900 transition group-hover:bg-slate-200">
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 sm:h-4 sm:w-4" fill="none">
                                            <path d="M5 12h14m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mx-auto section-spacing mb-16 sm:mb-24 w-full max-w-4xl">
                    <div ref={faqHeadingRef} className="text-center">
                        <h2
                            ref={revealRef6}
                            className="max-w-full whitespace-pre-line heading-section font-semibold leading-tight tracking-tight text-slate-800"
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

                    <div ref={faqItemsRef} className="mt-10 space-y-4">
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
                                        className="flex w-full items-center justify-between px-8 py-6 text-left text-sm sm:text-xl font-semibold text-[#1c2a3c]"
                                        onClick={() => handleFaqToggle(idx)}
                                    >
                                        <span>{item.question}</span>
                                        <span className={`transition ${isOpen ? "rotate-180" : ""}`}>
                                            <ChevronDownIcon />
                                        </span>
                                    </button>
                                    <div
                                        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-8 pb-8 text-[0.78rem] sm:text-lg leading-5 sm:leading-7 text-[#465568]">
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div >
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-[100dvh] bg-gradient-to-br from-[#e8ffe6] via-white to-white" />}>
            <ContactContent />
        </Suspense>
    );
}
