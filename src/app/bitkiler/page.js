'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getPlants } from '../../lib/api';
import { useLanguage } from '../../context/LanguageContext';
import { translate as tr } from '../../i18n/translations';

function BitkiListesiContent() {
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL Parametreleri
  const categoryQuery = searchParams.get('category');
  const sunlightParam = searchParams.get('sunlight');
  const wateringParam = searchParams.get('watering');
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const params = {};
      if (categoryQuery) params.category = categoryQuery;
      if (sunlightParam) params.sunlight = sunlightParam;
      if (wateringParam) params.watering = wateringParam;
      if (searchQuery) params.q = searchQuery;

      try {
        const data = await getPlants(params);
        setPlants(data || []);
      } catch (err) {
        // Silent fallback
        setPlants([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryQuery, sunlightParam, wateringParam, searchQuery]);

  return (
    <div className="container py-5">
      {/* BAŞLIK */}
      <div className="mb-5 pb-3 border-bottom d-flex align-items-center justify-content-between">
        <div>
          <h1 className="h2 fw-bold text-success mb-1">
            {categoryQuery ? t(categoryQuery.toLowerCase()) : t('plants')}
          </h1>
          <p className="text-muted mb-0">
            {searchQuery ? `${t('results_for')} "${searchQuery}"` : t('discover_plants')}
          </p>
        </div>
        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
          {loading ? '...' : `${plants.length} ${t('items_count')}`}
        </span>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2 text-muted">{t('loading')}</p>
        </div>
      )}

      {!loading && plants.length === 0 && (
        <div className="text-center py-5 bg-light rounded-4">
          <h3>🌱</h3>
          <p className="lead text-muted">{t('no_plants_found')}</p>
        </div>
      )}

      {/* DÜZ LİSTE (Kategorileme Yok, Ama Kart Tasarımı Yeni) */}
      {!loading && plants.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {plants.map(plant => (
            <div className="col" key={plant.id}>
              <div className="card h-100 shadow-sm border-0 hover-shadow transition-all">
                <div className="position-relative">
                  <div style={{ height: '250px', overflow: 'hidden' }}>
                    <img
                      src={plant.image}
                      className="card-img-top w-100 h-100"
                      style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                      alt={plant.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80';
                      }}
                    />
                  </div>

                  {/* ROZETLER (KORUNDU) */}
                  <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-gradient-dark-transparent d-flex gap-2">
                    <span className="badge bg-warning text-dark d-flex align-items-center gap-1 shadow-sm">
                      <i className="bi bi-sun-fill"></i> {tr(plant.light, language)}
                    </span>
                    <span className="badge bg-primary text-white d-flex align-items-center gap-1 shadow-sm">
                      💧 {tr(plant.water, language)}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-title fw-bold text-success text-truncate" title={plant.name}>
                    {plant.name}
                  </h5>
                  <p className="small text-muted fst-italic mb-3">{plant.scientific_name}</p>

                  <Link
                    href={`/bitkiler/${plant.id}`}
                    className="btn btn-outline-success w-100 btn-sm fw-bold rounded-pill"
                  >
                    {t('view_details')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BitkilerPage() {
  return (
    <Suspense fallback={<div className="container py-5 text-center">Loading...</div>}>
      <BitkiListesiContent />
    </Suspense>
  );
}