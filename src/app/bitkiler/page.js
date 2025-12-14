'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { plants } from '../../data/plants'; // Data yolunu kontrol et

// İçerik Bileşeni
function BitkiListesiContent() {
  const searchParams = useSearchParams();

  // URL'den filtreleri çekiyoruz
  // Örnek: /bitkiler?category=İç Mekan&water=Düşük
  const categoryFilter = searchParams.get('category');
  const lightFilter = searchParams.get('light');
  const waterFilter = searchParams.get('water');

  // Filtreleme İşlemi
  const filteredPlants = plants.filter(plant => {
    // Eğer kategori seçiliyse VE bitkinin kategorisi uymuyorsa -> ELENDİ
    if (categoryFilter && !plant.category.includes(categoryFilter)) return false;
    
    // Eğer ışık seçiliyse VE uymuyorsa -> ELENDİ
    if (lightFilter && plant.light !== lightFilter) return false;
    
    // Eğer su seçiliyse VE uymuyorsa -> ELENDİ
    if (waterFilter && plant.water !== waterFilter) return false;
    
    return true; // Hepsini geçtiyse LİSTEYE EKLE
  });

  return (
    <div className="container py-5">
      
      {/* Üst Başlık */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h1 className="h2 fw-bold text-success">
            {categoryFilter ? `${categoryFilter}` : 'Tüm Bitkiler'}
        </h1>
        <span className="text-muted">
            {filteredPlants.length} sonuç bulundu
        </span>
      </div>

      {/* Bitki Kartları (Grid) */}
      {filteredPlants.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredPlants.map(plant => (
            <div className="col" key={plant.id}>
              <div className="card h-100 shadow-sm border-0">
                
                {/* Resim */}
                <div style={{ height: '250px', overflow: 'hidden' }}>
                    <img 
                        src={plant.image} 
                        className="card-img-top w-100 h-100" 
                        style={{ objectFit: 'cover' }}
                        alt={plant.name} 
                    />
                </div>
                
                {/* Kart Gövdesi */}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold mb-0">{plant.name}</h5>
                      <span className="badge bg-success bg-opacity-75">{plant.category}</span>
                  </div>
                  <p className="card-text text-muted small">
                    Doğal yaşam alanlarınıza tazelik katacak harika bir seçim.
                  </p>
                </div>

                {/* Kart Alt Bilgi (Footer) */}
                <div className="card-footer bg-white border-top-0 d-flex gap-2">
                    <span className="badge bg-light text-dark border">☀️ {plant.light}</span>
                    <span className="badge bg-light text-dark border">💧 {plant.water}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        // Sonuç Yoksa
        <div className="alert alert-warning text-center py-5" role="alert">
          <h4 className="alert-heading">Sonuç Bulunamadı!</h4>
          <p>Seçtiğiniz kriterlere uygun bir bitki şu an veritabanımızda yok.</p>
          <hr />
          <a href="/bitkiler" className="btn btn-outline-dark">Tüm Filtreleri Temizle</a>
        </div>
      )}
    </div>
  );
}

// Next.js Kuralı: useSearchParams kullanan sayfalar Suspense ile sarılmalı
export default function BitkilerPage() {
    return (
        <Suspense fallback={<div className="text-center py-5">Yükleniyor...</div>}>
            <BitkiListesiContent />
        </Suspense>
    );
}