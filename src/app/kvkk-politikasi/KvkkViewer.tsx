"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Ana Sayfa", sectionId: "ana-sayfa" },
  { label: "Ajans mı?", sectionId: "ajans-mi" },
  { label: "Nasıl Çalışır", sectionId: "nasil-calisir" },
  { label: "Kimler İçin", sectionId: "kimler-icin" },
  { label: "Deneyimler", sectionId: "deneyimler" },
  { label: "Demo", sectionId: "demo" },
  { label: "SSS", sectionId: "sss" },
];

const pages = [
  {
    src: "/kvkk/kvkk-sayfa-1.jpg",
    label: "Sayfa 1",
    alt: "Yosuun KVKK politikası birinci sayfa",
  },
  {
    src: "/kvkk/kvkk-sayfa-2.jpg",
    label: "Sayfa 2",
    alt: "Yosuun KVKK politikası ikinci sayfa",
  },
  {
    src: "/kvkk/kvkk-sayfa-3.jpg",
    label: "Sayfa 3",
    alt: "Yosuun KVKK politikası üçüncü sayfa",
  },
];

type TransitionPhase = "idle" | "out" | "enter" | "show";

function ArrowIcon({ direction = "right" }: Readonly<{ direction?: "left" | "right" }>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${direction === "left" ? "rotate-180" : ""}`}
      fill="none"
    >
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

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
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

export default function KvkkViewer() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const documentViewportRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const transitionTimersRef = useRef<number[]>([]);
  const transitionFrameRef = useRef<number | null>(null);

  const changePage = useCallback(
    (nextPage: number) => {
      if (
        transitionPhase !== "idle" ||
        nextPage === selectedPage ||
        nextPage < 0 ||
        nextPage >= pages.length
      ) {
        return;
      }

      setTransitionPhase("out");

      const swapTimer = window.setTimeout(() => {
        documentViewportRef.current?.scrollTo({ top: 0, behavior: "auto" });
        setSelectedPage(nextPage);
        setTransitionPhase("enter");

        transitionFrameRef.current = window.requestAnimationFrame(() => {
          transitionFrameRef.current = window.requestAnimationFrame(() => {
            setTransitionPhase("show");

            const finishTimer = window.setTimeout(() => {
              setTransitionPhase("idle");
            }, 320);
            transitionTimersRef.current.push(finishTimer);
          });
        });
      }, 200);

      transitionTimersRef.current.push(swapTimer);
    },
    [selectedPage, transitionPhase],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        changePage(selectedPage - 1);
      }

      if (event.key === "ArrowRight") {
        changePage(selectedPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changePage, selectedPage]);

  useEffect(() => {
    const timers = transitionTimersRef.current;

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleWindowScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsMenuOpen(false);
      }

      if (contactBtnRef.current && !contactBtnRef.current.contains(target)) {
        setIsContactExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToSection = (sectionId: string) => {
    router.push(`/?scrollTo=${sectionId}`);
  };

  const currentPage = pages[selectedPage];
  const documentTransitionClass =
    transitionPhase === "out" || transitionPhase === "enter"
      ? "scale-[0.995] opacity-0"
      : "scale-100 opacity-100";

  return (
    <main className="h-[100dvh] overflow-hidden bg-gradient-to-br from-[#e8ffe6] via-[#f8faf7] to-white text-slate-950">
      <header
        className={`fixed top-5 left-0 right-0 z-[100] mx-auto flex w-[95%] max-w-[1440px] items-center justify-between gap-2 px-3 transition-all duration-300 min-[500px]:gap-12 min-[500px]:px-6 md:px-8 min-[1000px]:grid min-[1000px]:grid-cols-[1fr_auto_1fr] ${
          isScrolled
            ? "rounded-full bg-white/70 py-3 shadow-lg shadow-black/5 backdrop-blur-md"
            : "py-6"
        }`}
      >
        <Link
          href="/"
          aria-label="Yosuun ana sayfasına dön"
          className="relative z-0 flex h-12 shrink-0 cursor-pointer items-center justify-self-start overflow-visible transition-all duration-300"
        >
          <Image
            src="/logo-mobile.png"
            alt="Yosuun"
            width={1563}
            height={1563}
            className="h-[64px] min-[724px]:hidden"
            priority
          />
          <Image
            src="/yosuun-new-logo.png"
            alt="Yosuun"
            width={1563}
            height={1563}
            className="hidden h-[200px] w-auto max-w-[240px] min-[724px]:block min-[1400px]:max-w-none"
            priority
          />
        </Link>

        <nav
          aria-label="Ana menü"
          className={`absolute left-1/2 z-10 flex -translate-x-1/2 origin-center items-center rounded-full border border-white/20 bg-white/50 p-1.5 backdrop-blur transition-all duration-300 ${
            isContactExpanded
              ? "invisible scale-95 opacity-0"
              : "visible scale-100 opacity-100"
          }`}
        >
          <div className="hidden items-center gap-1 min-[1400px]:flex">
            {navItems.map((item, index) => (
              <button
                key={`nav-desktop-${item.sectionId}`}
                type="button"
                onClick={() => navigateToSection(item.sectionId)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition ${
                  index === 0
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden w-[338px] overflow-hidden min-[1000px]:block min-[1400px]:hidden">
            <div className="flex translate-x-0 items-center gap-1 transition-transform duration-300 ease-out">
              {navItems.map((item, index) => (
                <button
                  key={`nav-tablet-${item.sectionId}`}
                  type="button"
                  onClick={() => navigateToSection(item.sectionId)}
                  className={`w-[110px] flex-shrink-0 whitespace-nowrap rounded-full py-2 text-center text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={dropdownRef} className="relative min-[1000px]:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              className="flex min-w-[140px] items-center justify-between gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 shadow-sm transition"
            >
              <span>Ana Sayfa</span>
              <span className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}>
                <ChevronDownIcon />
              </span>
            </button>

            {isMenuOpen && (
              <div className="absolute top-full left-1/2 z-50 mt-2 w-48 -translate-x-1/2 rounded-2xl border border-white/20 bg-white/95 py-2 shadow-lg backdrop-blur-md">
                {navItems.map((item, index) => (
                  <button
                    key={`nav-mobile-${item.sectionId}`}
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigateToSection(item.sectionId);
                    }}
                    className={`w-full px-4 py-2.5 text-center text-sm font-medium transition ${
                      index === 0
                        ? "bg-[#78f666]/20 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="ml-1 flex shrink-0 items-center justify-self-end gap-2 min-[724px]:ml-0 min-[1000px]:col-start-3">
          <div className="relative h-9 w-9 min-[724px]:hidden">
            <button
              ref={contactBtnRef}
              type="button"
              aria-label={isContactExpanded ? "Giriş yap" : "Giriş butonunu aç"}
              className={`absolute right-0 top-1/2 z-50 flex -translate-y-1/2 cursor-pointer items-center justify-end rounded-full transition-all duration-500 ease-spring ${
                isContactExpanded ? "w-[115px] py-1.5 pr-1.5 pl-5" : "h-9 w-9"
              }`}
              onClick={() => {
                if (isContactExpanded) {
                  window.location.href = "https://app.yosuun.com.tr/";
                } else {
                  setIsContactExpanded(true);
                }
              }}
            >
              <span
                className={`absolute left-5 overflow-hidden whitespace-nowrap text-sm font-semibold text-white transition-all duration-300 ${
                  isContactExpanded
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none -translate-x-4 opacity-0"
                }`}
              >
                Giriş Yap
              </span>
              <span
                className={`relative z-10 grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900 transition-all duration-300 ${
                  isContactExpanded ? "rotate-0" : "shadow-md"
                }`}
              >
                <ArrowIcon />
              </span>
              <span
                className={`absolute -z-10 rounded-full bg-black transition-all duration-500 ease-spring ${
                  isContactExpanded ? "inset-0" : "-inset-[4px]"
                }`}
              />
            </button>
          </div>

          <Link
            href="https://app.yosuun.com.tr/"
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-black py-1.5 pr-1.5 pl-5 text-sm font-semibold !text-white shadow-md transition hover:-translate-y-px hover:bg-slate-900 min-[724px]:flex"
          >
            Giriş Yap
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-900">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full px-3 pt-32 pb-4 sm:px-5 sm:pt-36 sm:pb-6 lg:px-7">
        <section
          aria-label={`Seçili KVKK belgesi, ${currentPage.label}`}
          className="mx-auto w-full min-w-0 overflow-hidden rounded-[24px] border border-black/10 bg-[#f8f9f6] shadow-[0_18px_55px_rgba(15,23,42,0.09)] sm:rounded-[30px] md:w-3/4"
        >
          <div
            ref={documentViewportRef}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            tabIndex={0}
            onScroll={(event) => setIsScrolled(event.currentTarget.scrollTop > 20)}
            className="h-[calc(100dvh-212px)] touch-pan-y overflow-y-scroll overscroll-contain bg-slate-100/70 p-2 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#78f666] sm:h-[calc(100dvh-244px)] sm:p-3 lg:p-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div
              className={`mx-auto w-full overflow-hidden rounded-xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.10)] transition-[opacity,transform] duration-300 ease-out will-change-transform ${documentTransitionClass}`}
            >
              <Image
                key={currentPage.src}
                src={currentPage.src}
                alt={currentPage.alt}
                width={1241}
                height={1755}
                sizes="100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-black/5 bg-white/70 px-4 py-3 sm:px-6 sm:py-4">
            <button
              type="button"
              onClick={() => changePage(selectedPage - 1)}
              disabled={selectedPage === 0 || transitionPhase !== "idle"}
              aria-label="Önceki sayfa"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowIcon direction="left" />
              <span className="hidden sm:inline">Önceki</span>
            </button>

            <p className="text-sm font-semibold tabular-nums text-slate-600">
              {selectedPage + 1} / {pages.length}
            </p>

            <button
              type="button"
              onClick={() => changePage(selectedPage + 1)}
              disabled={selectedPage === pages.length - 1 || transitionPhase !== "idle"}
              aria-label="Sonraki sayfa"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-black px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <span className="hidden sm:inline">Sonraki</span>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
