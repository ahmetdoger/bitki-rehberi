import Link from 'next/link';
import NavbarInteractions from '../components/NavbarInteractions';
import Footer from '../components/Footer'; 
import React from 'react';

const mainCategories = [
    { title: 'Süs Bitkileri', subtitle: 'Evinize Zarif Dokunuşlar', color: '#106c59', href: '/bitkiler?category=sus' },
    { title: 'Çiçekli Bitkiler', subtitle: 'Rengarenk Çiçek Açan Türler', color: '#6c4310', href: '/bitkiler?category=cicekli' },
    { title: 'İç Mekan Bitkileri', subtitle: 'Yaşam Alanınızı Canlandırın', color: '#103a6c', href: '/bitkiler?category=icmekan' },
    { title: 'Bakımı Kolay Bitkiler', subtitle: 'Yeni Başlayanlar İçin İdeal', color: '#4B0082', href: '/bitkiler?category=kolaybakim' },
];

export default function Home() {
    
  return (
    <div className="d-flex flex-column vh-100"> 
      
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top">
        <div className="container-fluid container">
          <Link className="navbar-brand" href="/">
            <span className="h3 mb-0">Bitki Rehberi</span>
          </Link>
          <NavbarInteractions /> 
        </div>
      </nav>
      
      {/* ANA İÇERİK (Slider) */}
      <main className="flex-grow-1 d-flex flex-column my-5 p-0 overflow-hidden position-relative rounded container-fluid"> 
        
        <div id="mainCategoryCarousel" className="carousel slide flex-grow-1 h-100" data-bs-ride="carousel" data-bs-interval="5000">
          
          {/* Alt Göstergeler (Indicators) */}
          <div className="carousel-indicators">
            {mainCategories.map((_, index) => (
              <button 
                key={index}
                type="button" 
                data-bs-target="#mainCategoryCarousel" 
                data-bs-slide-to={index} 
                className={index === 0 ? 'active' : ''} 
                aria-current={index === 0 ? 'true' : undefined} 
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <div className="carousel-inner h-100"> 
            {mainCategories.map((item, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} h-100`} style={{ backgroundColor: item.color }}>
                
                {/* KRİTİK DEĞİŞİKLİK:
                  İçeriği saran div yerine doğrudan Link kullandık.
                  text-decoration-none: Link alt çizgisini kaldırır.
                  d-flex, h-100, w-100: Link'in tüm alanı kaplamasını sağlar.
                  cursor-pointer: Tıklanabilir olduğunu gösterir.
                */}
                <Link 
                  href={item.href} 
                  className="d-flex flex-column h-100 w-100 align-items-center justify-content-center text-center text-white text-decoration-none p-5"
                  style={{ cursor: 'pointer' }}
                >
                    <h1 className="display-1 fw-bold">{item.title}</h1>
                    <p className="lead">{item.subtitle}</p>
                    {/* Buton kaldırıldı, çünkü artık her yer buton! */}
                </Link>

              </div>
            ))}
          </div>
          
          {/* Sağ ve Sol Oklar (İçerik Linkinden bağımsız çalışır) */}
          <button className="carousel-control-prev" type="button" data-bs-target="#mainCategoryCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Önceki Kategori</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mainCategoryCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Sonraki Kategori</span>
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
      
    </div>
  );
}