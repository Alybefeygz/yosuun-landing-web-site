import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yosuun | Ya da Hepsini O Yapsın",
  description: "Yosuun - E-ticaret yapmadan e-ticaret yapmanın en kolay yolu.",
  icons: {
    icon: "https://hscaphuhndggoryhceoz.supabase.co/storage/v1/object/public/foto/sekme-foto.png",
  },
  other: {
    "google": "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" translate="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased notranslate`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
