'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // 👈 YENİ EKLENDİ

import { getPlants } from '../../lib/api'; 
import { useLanguage } from '../../context/LanguageContext';
import { translate as tr } from '../../i18n/translations';

function BitkiListesiContent() {
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryQuery = searchParams.get('category');
  const sunlightParam = searchParams.get('sunlight'); 
  const wateringParam = searchParams.get('watering'); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      const params = {};
      if (categoryQuery) params.category = categoryQuery;
      if (sunlightParam) params.sunlight = sunlightParam.split(',')[0];
      if (wateringParam) params.watering = wateringParam.split(',')[0];

      const data = await getPlants(params);
      setPlants(data);
      setLoading(false);
    }
    fetchData();
  }, [categoryQuery, sunlightParam, wateringParam]);

  return (
    <div className="container py-5">
      {/* BAŞLIK */}
      <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
        <h1 className="h2 fw-bold text-success mb-1">
            {categoryQuery 
                ? `${t('results_for')} "${t(categoryQuery.toLowerCase())}"` 
                : t('discover_plants')
            }
        </h1>
        <span className="badge bg-secondary rounded-pill px-3 py-2">
            {loading ? '...' : `${plants.length} ${t('items_count')}`}
        </span>
      </div>

      {loading && <div className="text-center py-5">{t('loading')}</div>}

      {!loading && plants.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {plants.map(plant => (
            <div className="col" key={plant.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="position-relative" style={{ height: '220px', overflow: 'hidden'}}>
                    <img src={plant.image} className="card-img-top w-100 h-100" style={{ objectFit: 'cover' }} alt={plant.name} />
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold text-success">{plant.name}</h5>
                  <p className="small text-muted">{plant.scientific_name}</p>
                  
                  <div className="row g-2 mt-3">
                      <div className="col-6 bg-light p-2 rounded">
                          <small>☀️ {tr(plant.light, language)}</small>
                      </div>
                      <div className="col-6 bg-light p-2 rounded">
                          <small>💧 {tr(plant.water, language)}</small>
                      </div>
                  </div>

                  {/* 👇 KRİTİK DEĞİŞİKLİK BURADA: Buton Link'e dönüştü */}
                  <Link 
                    href={`/bitkiler/${plant.id}`} 
                    className="btn btn-outline-success w-100 btn-sm mt-3 fw-bold"
                  >
                      {t('view_details')} ➜
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && plants.length === 0 && (
         <div className="alert alert-light text-center py-5">{t('no_plants_found')}</div>
      )}
    </div>
  );
}

export default function BitkilerPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BitkiListesiContent />
        </Suspense>
    );
}