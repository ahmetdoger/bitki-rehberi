'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import FilterDropdown from './FilterDropdown';

export default function NavbarInteractions() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const languages = [
    { code: 'tr', label: 'TR' }, // Kısaltılmış etiketler daha modern durur
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'fr', label: 'FR' },
    { code: 'es', label: 'ES' },
    { code: 'it', label: 'IT' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/bitkiler?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 w-100">

      {/* 1. ARAMA KISMI */}
      <form className="d-flex flex-grow-1 position-relative me-lg-2" role="search" onSubmit={handleSearch}>
        <input
          className="form-control rounded-pill shadow-sm nav-input-responsive"
          type="search"
          placeholder={t('search_placeholder')}
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ backdropFilter: 'blur(5px)' }}
        />
        {searchTerm.trim() === '' && (
          <button
            className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0 nav-btn-responsive"
            type="submit"
            style={{ zIndex: 5 }}
          >
            🔍
          </button>
        )}
      </form>

      {/* 2. AKSİYONLAR GRUBU (Filtre + Dil) */}
      <div className="d-flex align-items-center gap-2">

        <Suspense fallback={<div className="spinner-border spinner-border-sm text-light"></div>}>
          <FilterDropdown />
        </Suspense>

        <div className="vr h-50 my-auto bg-white opacity-25 mx-1 d-none d-lg-block"></div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle rounded-pill px-3 fw-semibold text-uppercase nav-btn-responsive"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {language}
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 mt-2 overflow-hidden">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  className={`dropdown-item py-2 px-3 ${language === lang.code ? 'active bg-success' : ''}`}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}