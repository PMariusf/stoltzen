import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stoltzekleiven Opp",
    template: "%s | Stoltzekleiven Opp",
  },
  description:
    "Stoltzekleiven Opp i Bergen – påmelding, startlister, resultater, praktisk informasjon, bilder og historie.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] antialiased`}>
      <body className="min-h-screen bg-[#050505] font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
