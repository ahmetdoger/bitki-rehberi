'use client';

import Link from 'next/link';
// FilterDropdown'un aynı dizinde (src/components) olduğu varsayılır:
import FilterDropdown from './FilterDropdown'; 

/**
 * Navbar'daki interaktif öğeleri (Arama Formu, Dil Seçimi, Filtreler) barındırır.
 * Bu bir İstemci Bileşeni'dir.
 */
export default function NavbarInteractions() {

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Arama yapıldı.");
    };

    return (
        <div className="d-flex align-items-center">
            
            {/* 1. Arama Formu */}
            <form className="d-flex me-3" role="search" onSubmit={handleSearchSubmit}>
              <input 
                className="form-control" 
                type="search" 
                placeholder="Bitki Ara..." 
                aria-label="Search" 
              />
              <button className="btn btn-outline-light ms-2" type="submit">Ara</button>
            </form>

            {/* 2. Dil Seçeneği Dropdown */}
            <div className="dropdown me-3">
              <button 
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                🇹🇷 TR
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item active" href="#">🇹🇷 Türkçe</Link></li>
                <li><Link className="dropdown-item" href="#">🇬🇧 English</Link></li>
              </ul>
            </div>

            {/* 3. Filtreler Dropdown */}
            <FilterDropdown /> 

        </div>
    );
}