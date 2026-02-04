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
                        <a href="https://www.instagram.com/yosuun.tr/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold cursor-pointer hover:text-slate-900 transition-colors">@</a>
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
