'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-success text-white py-3 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Bitki Rehberi. {t('rights_reserved')}</p>
        <div className="d-flex gap-3">
          <a href="/gizlilik" className="text-white text-decoration-none small">{t('privacy')}</a>
          <a href="/kullanim-kosullari" className="text-white text-decoration-none small">{t('terms')}</a>
        </div>
      </div>
    </footer>
  );
}