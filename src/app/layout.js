import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS burada
import BootstrapClient from "../components/BootstrapClient"; // 1. Adımda oluşturulan JS tetikleyicisi

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bitki Rehberi",
  description: "Türkiye'nin Kapsamlı Bitki Bilgi Sitesi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <BootstrapClient /> {/* BURASI KRİTİK: JS Bileşenlerinin çalışmasını sağlar */}
      </body>
    </html>
  );
}