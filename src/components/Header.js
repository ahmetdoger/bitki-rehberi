'use client'; 

import Link from "next/link";
import NavbarInteractions from "./NavbarInteractions"; 
import { useLanguage } from '../context/LanguageContext'; 

export default function Header() {
  const { t } = useLanguage(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm sticky-top" style={{ zIndex: 1040 }}>
      <div className="container-fluid container">
        <Link className="navbar-brand fw-bold" href="/">
          Bitki Rehberi
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#navbarOffcanvas" 
          aria-controls="navbarOffcanvas"
          aria-label="Menüyü Aç"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div 
            className="offcanvas-lg offcanvas-end flex-grow-1" 
            tabIndex="-1" 
            id="navbarOffcanvas" 
            aria-labelledby="navbarOffcanvasLabel"
        >
          <div className="offcanvas-header bg-success text-white border-bottom border-white-50">
            {/* GÜNCELLEME: Menü başlığı çevrildi */}
            <h5 className="offcanvas-title" id="navbarOffcanvasLabel">{t('menu')}</h5>
            <button 
                type="button" 
                className="btn-close btn-close-white" 
                data-bs-dismiss="offcanvas" 
                data-bs-target="#navbarOffcanvas" 
                aria-label="Kapat"
            ></button>
          </div>
          <div className="offcanvas-body p-4 p-lg-0">
             <div className="ms-lg-auto">
                <NavbarInteractions /> 
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
}