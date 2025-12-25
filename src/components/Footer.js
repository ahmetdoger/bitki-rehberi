'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    // py-2: Daha ince ve kibar
    // fixed-bottom: Sayfayla birlikte hareket eder (en altta sabit)
    <footer className="bg-dark text-light py-3 fixed-bottom border-top border-secondary border-opacity-25 shadow-lg" style={{ zIndex: 1030 }}>
      <div className="container-fluid px-4 px-lg-5">

        {/* Mobilde alt alta, Masaüstünde sağ-sol yaslı */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small">

          {/* SOL TARAFA: Logo + Çevirili Haklar Yazısı */}
          <div className="d-flex flex-column flex-md-row align-items-center gap-1 gap-md-2 mb-2 mb-md-0 opacity-75">
            <div className="d-flex align-items-center gap-2">
              <span>🌿</span>
              <span className="fw-semibold">BitkiRehberi</span>
            </div>

            {/* Masaüstünde araya çizgi koy, mobilde gizle */}
            <span className="d-none d-md-inline">|</span>

            {/* SENİN İSTEDİĞİN ÇEVİRİ KISMI BURADA GERİ GELDİ 👇 */}
            <span>{t('rights_reserved')} &copy; {new Date().getFullYear()}</span>
          </div>

          {/* SAĞ TARAFA: Menüler */}
          <div className="d-flex gap-4">
            <Link href="/" className="text-light text-decoration-none opacity-75 hover-opacity-100 transition-all">
              {t('home')}
            </Link>
            <Link href="/bitkiler" className="text-light text-decoration-none opacity-75 hover-opacity-100 transition-all">
              {t('plants')}
            </Link>
            {/* Tek link: Privacy & Terms */}
            <Link href="/privacy" className="text-light text-decoration-none opacity-75 hover-opacity-100 transition-all">
              Privacy & Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}