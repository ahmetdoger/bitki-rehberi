'use client';

import Link from 'next/link';
import NavbarInteractions from './NavbarInteractions';

export default function Navbar() {
  return (
    // py-3: Dikey boşluk (Footer ile uyumlu olsun diye)
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm py-3">
      
      {/* 👇 DEĞİŞİKLİK BURADA: Footer ile birebir aynı sınıfı kullandık */}
      <div className="container-fluid px-4 px-lg-5">
        
        {/* LOGO KISMI */}
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
           <span className="fs-1">🌿</span>
           <div className="d-flex flex-column lh-1">
              <span className="fw-bold fs-4 tracking-tight">BitkiRehberi</span>
              <small className="fs-7 opacity-75" style={{ letterSpacing: '1px' }}>BOTANICAL GUIDE</small>
           </div>
        </Link>

        {/* MOBİL MENÜ BUTONU (Hamburger) */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* SAĞ TARAFA YASLANACAK İÇERİK */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            
            {/* Mobilde arama ve dil seçenekleri aşağı inerken biraz boşluk bırak */}
            <div className="mt-3 mt-lg-0 w-100 w-lg-auto">
                <NavbarInteractions />
            </div>

        </div>
      </div>
    </nav>
  );
}