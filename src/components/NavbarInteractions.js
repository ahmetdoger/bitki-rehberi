'use client';

import Link from 'next/link';
import FilterDropdown from './FilterDropdown'; 

export default function NavbarInteractions() {

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Arama yapıldı.");
    };

    return (
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
            
            {/* 1. SIRA: Arama Formu */}
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Bitki Ara..." 
                aria-label="Search" 
                style={{ width: 'auto' }} 
              />
              <button className="btn btn-outline-light" type="submit">Ara</button>
            </form>

            {/* 2. SIRA: Filtreler Dropdown (Dil seçeneğinin önüne alındı) */}
            <FilterDropdown /> 

            {/* 3. SIRA: Dil Seçeneği Dropdown (En sona alındı) */}
            <div className="dropdown">
              <button 
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                🇹🇷 TR
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li><Link className="dropdown-item active" href="#">🇹🇷 Türkçe</Link></li>
                <li><Link className="dropdown-item" href="#">🇬🇧 English</Link></li>
              </ul>
            </div>

        </div>
    );
}