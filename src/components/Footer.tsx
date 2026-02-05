"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <footer className="mx-auto section-spacing-sm w-full max-w-6xl container-padding pb-6 sm:pb-12 md:pb-16">
            <div className="grid gap-4 sm:gap-8 grid-cols-1 min-[601px]:grid-cols-2 md:grid-cols-4 md:gap-6 border-t border-slate-200/70 pt-6 sm:pt-10">
                <div className="space-y-3 sm:space-y-4 md:col-span-1">
                    <Link
                        href="/"
                        className="flex items-center -mt-8 sm:-mt-12 md:-mt-16 -mb-5 sm:-mb-8 md:-mb-10 cursor-pointer w-fit"
                    >
                        <img
                            src="https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/yosuun-new-logo.png"
                            alt="Yosuun"
                            className="h-20 sm:h-32 md:h-40 w-auto object-contain"
                        />
                    </Link>
                    <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
                        Sen hayatını yaşa, e-ticaret kendi kendine ilerlesin. Yosuun arkada düşünür ve senin
                        adına hareket eder.
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 text-slate-700">
                        <a href="https://x.com/yosuunturkey" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold cursor-pointer hover:text-slate-900 transition-colors">X</a>
                        <a href="https://www.linkedin.com/company/yosuun/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold cursor-pointer hover:text-slate-900 transition-colors">in</a>
                        <a href="https://www.instagram.com/yosuunturkey/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-slate-900 transition-colors">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Empty columns for spacing on desktop, hidden on mobile if not needed */}
                <div className="hidden md:block"></div>
                <div className="hidden md:block"></div>

                <div className="space-y-2 sm:space-y-3 md:col-start-4 text-right">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">İletişim Bilgileri</p>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                        <p>Ostim Teknik Üniversitesi Cezeri Teknoloji ve Araştırma Merkezi</p>
                        <p>Ostim/Ankara</p>
                        <p>info@yosuun.com - (539) 319 22 60</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
