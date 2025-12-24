'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import FilterDropdown from './FilterDropdown';

export default function NavbarInteractions() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e) => {
    e.preventDefault();
    // Boşsa işlem yapma
    if (!searchTerm.trim()) return;
    
    // Arama sayfasına yönlendir (Query Parametresi ile)
    router.push(`/bitkiler?q=${encodeURIComponent(searchTerm)}`);
  };

  const toggleLanguage = () => {
    const newLang = language === 'tr' ? 'en' : 'tr'; // Basit geçiş, istersen 6 dili dropdown yapabilirsin
    setLanguage(newLang);
  };
  
  // 6 Dil Seçeneği İçin Dropdown (Opsiyonel, yer varsa açılabilir)
  const languages = [
      { code: 'tr', label: '🇹🇷 TR' },
      { code: 'en', label: '🇬🇧 EN' },
      { code: 'de', label: '🇩🇪 DE' },
      { code: 'fr', label: '🇫🇷 FR' },
      { code: 'es', label: '🇪🇸 ES' },
      { code: 'it', label: '🇮🇹 IT' },
  ];

  return (
    <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center">
      
      {/* 1. ARAMA FORMU */}
      <form onSubmit={handleSearch} className="d-flex" role="search">
        <div className="input-group">
            <input 
                className="form-control border-success" 
                type="search" 
                placeholder={t('search_placeholder')} 
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light bg-success" type="submit">
                {t('search_button')}
            </button>
        </div>
      </form>

      {/* 2. FİLTRE BUTONU (Mobil uyumlu olması için buraya aldım) */}
      <FilterDropdown />

      {/* 3. DİL SEÇİMİ */}
      <div className="dropdown">
        <button className="btn btn-outline-light dropdown-toggle text-uppercase" type="button" data-bs-toggle="dropdown">
            {languages.find(l => l.code === language)?.label || '🌐'}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
            {languages.map((lang) => (
                <li key={lang.code}>
                    <button 
                        className={`dropdown-item ${language === lang.code ? 'active bg-success' : ''}`} 
                        onClick={() => setLanguage(lang.code)}
                    >
                        {lang.label}
                    </button>
                </li>
            ))}
        </ul>
      </div>

    </div>
  );
}