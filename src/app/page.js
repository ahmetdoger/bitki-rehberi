import Link from 'next/link';
import React from 'react';

// Kategori Verileri
const mainCategories = [
    { title: 'Süs Bitkileri', subtitle: 'Evinize Zarif Dokunuşlar', color: '#106c59', href: '/bitkiler?category=Süs Bitkileri' },
    { title: 'Çiçekli Bitkiler', subtitle: 'Rengarenk Çiçek Açan Türler', color: '#6c4310', href: '/bitkiler?category=Çiçekli Bitkiler' },
    { title: 'İç Mekan Bitkileri', subtitle: 'Yaşam Alanınızı Canlandırın', color: '#103a6c', href: '/bitkiler?category=İç Mekan' },
    { title: 'Bakımı Kolay Bitkiler', subtitle: 'Yeni Başlayanlar İçin İdeal', color: '#4B0082', href: '/bitkiler?category=Kolay Bakım' },
];

export default function Home() {
  return (
      // Navbar ve Footer BURADAN SİLİNDİ.
      // py-5: Üstten ve alttan boşluk bırakır (Layout'taki navbar ve footer'a yapışmaz).
      <div className="container-fluid py-5" style={{ height: '85vh' }}> 
        
        {/* Slider Başlangıç */}
        <div id="mainCategoryCarousel" className="carousel slide h-100 rounded-3 shadow overflow-hidden" data-bs-ride="carousel" data-bs-interval="5000">
          
          {/* Alt Çizgiler (Indicators) */}
          <div className="carousel-indicators">
            {mainCategories.map((_, index) => (
              <button 
                key={index} 
                type="button" 
                data-bs-target="#mainCategoryCarousel" 
                data-bs-slide-to={index} 
                className={index === 0 ? 'active' : ''}
              ></button>
            ))}
          </div>
          
          {/* İçerik */}
          <div className="carousel-inner h-100"> 
            {mainCategories.map((item, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} style={{ backgroundColor: item.color }}>
                {/* Tıklanabilir Link Alanı */}
                <Link 
                  href={item.href} 
                  className="d-flex flex-column h-100 w-100 align-items-center justify-content-center text-center text-white text-decoration-none p-5"
                >
                    <h1 className="display-1 fw-bold">{item.title}</h1>
                    <p className="lead">{item.subtitle}</p>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Sağ/Sol Oklar */}
          <button className="carousel-control-prev" type="button" data-bs-target="#mainCategoryCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mainCategoryCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>

        </div>
        {/* Slider Bitiş */}
        
      </div>
  );
}