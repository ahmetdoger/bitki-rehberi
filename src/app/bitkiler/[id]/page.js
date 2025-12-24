'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getPlantDetail } from '../../../lib/api'; 
import { useLanguage } from '../../../context/LanguageContext';
import { translate as tr } from '../../../i18n/translations';

export default function PlantDetailPage({ params }) {
    const { id } = use(params);
    const { t, language } = useLanguage();
    
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetail() {
            setLoading(true);
            const data = await getPlantDetail(id);
            setPlant(data);
            setLoading(false);
        }
        if(id) fetchDetail();
    }, [id]);

    // --- AKILLI ÇEVİRİ FONKSİYONU ---
    const translatePropagation = (propString) => {
        if (!propString || propString === 'Natural' || propString === 'Unknown') return propString;
        
        return propString.split(',').map(item => {
            const rawItem = item.trim().toLowerCase();
            const key = rawItem.replace(/ /g, '_');
            
            // Önce sözlükte direkt ara
            const translated = tr(key, language);
            
            // Eğer çeviri İngilizce kaldıysa, içinde tanıdık kök ara
            if (translated === key || translated.toLowerCase() === rawItem) {
                if (rawItem.includes('cutting')) return tr('cuttings', language);
                if (rawItem.includes('seed')) return tr('seeds', language);
                if (rawItem.includes('layer')) return tr('layering', language);
                if (rawItem.includes('graft')) return tr('grafting', language);
                if (rawItem.includes('bulb')) return tr('bulbs', language);
                if (rawItem.includes('offset')) return tr('offsets', language);
                if (rawItem.includes('sucker')) return tr('suckers', language);
            }
            
            return translated;
        }).join(', ');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-success" role="status"></div>
            </div>
        );
    }

    if (!plant) {
        return (
            <div className="container py-5 text-center">
                <h3>{t('no_plants_found')}</h3>
                <Link href="/bitkiler" className="btn btn-primary mt-3">← {t('plants')}</Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* ÜST KISIM: HİZALAMA DÜZELTİLDİ (align-items-start) */}
            <div className="row mb-5 align-items-start">
                
                {/* SOL: RESİM */}
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="rounded-4 overflow-hidden shadow-lg position-relative" style={{ height: '400px' }}>
                        <img 
                            src={plant.image} 
                            alt={plant.name} 
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>
                </div>

                {/* SAĞ: YAZI (Tepeden başlıyor ve resmi geçmiyor) */}
                <div className="col-lg-6 d-flex flex-column justify-content-start" style={{ height: '400px' }}> 
                    <h1 className="display-4 fw-bold text-success mb-2 mt-0 lh-1">{plant.name}</h1>
                    <h4 className="text-muted fst-italic mb-3">{plant.scientific_name}</h4>
                    
                    {/* Kaydırma çubuğu (scroll) eklenmiş açıklama alanı */}
                    <div className="flex-grow-1 overflow-auto pe-2 custom-scrollbar">
                        <p className="lead text-secondary mb-0">
                            {plant.description || (language === 'tr' ? 
                                "Bu bitki hakkında detaylı açıklama şu anda hazırlanmaktadır. Aşağıdaki teknik tablodan tüm bakım ihtiyaçlarını detaylıca inceleyebilirsiniz." : 
                                "Detailed description for this plant is currently being prepared. Please verify care requirements in the table below.")}
                        </p>
                    </div>
                    
                    <div className="mt-3">
                        <Link href="/bitkiler" className="btn btn-outline-dark rounded-pill px-4">
                            ← {t('plants')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ALT KISIM: DASHBOARD */}
            <div className="row g-4">
                <div className="col-md-12">
                    <div className="card border-0 shadow-sm h-100 bg-light">
                        <div className="card-body p-4">
                            <h3 className="card-title fw-bold mb-4 text-success border-bottom pb-2">
                                📋 {t('care_guide_title')}
                            </h3>
                            
                            <div className="row g-4">
                                {/* 1. SATIR: TEMEL İHTİYAÇLAR */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-warning">
                                        <small className="text-muted text-uppercase fw-bold">☀️ {t('sunlight_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">
                                            {tr(plant.sunlight.split(',')[0].trim().replace(/ /g,'_'), language)}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-primary">
                                        <small className="text-muted text-uppercase fw-bold">💧 {t('water_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{tr(plant.watering, language)}</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-success">
                                        <small className="text-muted text-uppercase fw-bold">🔄 {t('cycle_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{tr(plant.cycle, language)}</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-danger">
                                        <small className="text-muted text-uppercase fw-bold">🌍 {t('hardiness_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{plant.hardiness}</p>
                                    </div>
                                </div>

                                {/* 2. SATIR: BAKIM DETAYLARI */}
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-info">
                                        <small className="text-muted text-uppercase fw-bold">{t('care_level_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{tr(plant.care_level, language)}</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-success">
                                        <small className="text-muted text-uppercase fw-bold">{t('growth_rate_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{tr(plant.growth_rate, language)}</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-warning">
                                        <small className="text-muted text-uppercase fw-bold">{t('maintenance_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{tr(plant.maintenance, language)}</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="p-3 bg-white rounded shadow-sm h-100 border-start border-4 border-secondary">
                                        <small className="text-muted text-uppercase fw-bold">{t('indoor_label')}</small>
                                        <p className="fs-5 fw-semibold mb-0 text-dark">{tr(plant.indoor, language)}</p>
                                    </div>
                                </div>

                                {/* 3. SATIR: GENİŞ KUTULAR (Çoğaltma Yöntemi) */}
                                <div className="col-lg-12">
                                    <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-4 border-dark">
                                        <small className="text-muted text-uppercase fw-bold">🌱 {t('propagation_label')}</small>
                                        {/* Akıllı çeviri burada kullanılıyor */}
                                        <p className="fs-5 fw-semibold mb-0 text-dark mt-2">{translatePropagation(plant.propagation)}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}