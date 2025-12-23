'use client';

import Link from 'next/link';
import FilterDropdown from './FilterDropdown'; 
import { useLanguage } from '../context/LanguageContext'; 

// Dil Listesi (Bayraklar ve Kodlar)
const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export default function NavbarInteractions() {
    const { language, setLanguage, t } = useLanguage();

    // Şu an seçili dilin bayrağını bul
    const currentFlag = languages.find(l => l.code === language)?.flag || '🇬🇧';

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search triggered");
    };

    return (
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
            
            {/* 1. Arama */}
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder={t('search_placeholder')} 
                aria-label="Search" 
                style={{ width: 'auto', minWidth: '150px' }} 
              />
              <button className="btn btn-outline-light" type="submit">{t('search_button')}</button>
            </form>

            {/* 2. Filtreler */}
            <FilterDropdown /> 

            {/* 3. Dil Seçici (6 Dilli) */}
            <div className="dropdown">
              <button 
                className="btn btn-outline-light dropdown-toggle text-nowrap"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentFlag} {language.toUpperCase()}
              </button>
              
              <ul className="dropdown-menu dropdown-menu-end shadow" style={{ minWidth: '150px' }}>
                {languages.map((lang) => (
                    <li key={lang.code}>
                        <button 
                            className={`dropdown-item d-flex align-items-center justify-content-between ${language === lang.code ? 'active' : ''}`} 
                            onClick={() => setLanguage(lang.code)}
                        >
                            <span>{lang.flag} {lang.label}</span>
                            {language === lang.code && <span>✓</span>}
                        </button>
                    </li>
                ))}
              </ul>
            </div>

        </div>
    );
}