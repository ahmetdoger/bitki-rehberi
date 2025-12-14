import React from 'react';

export default function Footer() {
  return (
    // Navbar ile aynı stili kullanıyoruz: bg-success ve navbar-dark
    <footer className="bg-success text-white py-3 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Bitki Rehberi. Tüm Hakları Saklıdır.</p>
        <div className="d-flex gap-3">
          <a href="/gizlilik" className="text-white text-decoration-none small">Gizlilik</a>
          <a href="/kullanim-kosullari" className="text-white text-decoration-none small">Kullanım Koşulları</a>
        </div>
      </div>
    </footer>
  );
}