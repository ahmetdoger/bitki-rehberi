'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// DİKKAT: Dosya yolu önemlidir. components ile lib kardeştir (src altında)
import { getSpecificRandomImage } from '../lib/api'; 

const initialCategories = [
    { 
        id: 1,
        title: 'İç Mekan Bitkileri', 
        subtitle: 'Evinizin havasını değiştiren yeşil dostlar', 
        categoryParam: 'Indoor', 
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1920' 
    },
    { 
        id: 2,
        title: 'Dış Mekan ve Bahçe', 
        subtitle: 'Doğayı açık havada hissedin', 
        categoryParam: 'Outdoor', 
        image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?q=80&w=1920' 
    },
    { 
        id: 3,
        title: 'Çiçekli Bitkiler', 
        subtitle: 'Doğanın en renkli ve canlı hali', 
        categoryParam: 'Flowering',
        image: 'https://images.unsplash.com/photo-1566956249339-44569cb2cc35?q=80&w=1920'
    },
    { 
        id: 4,
        title: 'Dönemsel ve Çok Yıllıklar', 
        subtitle: 'İster bir mevsimlik, ister ömürlük güzellikler', 
        categoryParam: 'CycleMix', 
        image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1920'
    },
];

export default function HeroSlider() {
    const [slides, setSlides] = useState(initialCategories);

    useEffect(() => {
        async function loadImages() {
            const promises = slides.map(async (slide) => {
                const newImage = await getSpecificRandomImage(slide.categoryParam);
                return {
                    ...slide,
                    image: newImage || slide.image 
                };
            });
            const updatedSlides = await Promise.all(promises);
            setSlides(updatedSlides);
        }
        loadImages();
    }, []); 

    return (
        <div id="heroCarousel" className="carousel slide h-100 rounded-4 shadow overflow-hidden position-relative" data-bs-ride="carousel" data-bs-interval="6000">
            <div className="carousel-indicators pb-3">
                {slides.map((_, index) => (
                    <button key={index} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''}></button>
                ))}
            </div>

            <div className="carousel-inner h-100">
                {slides.map((item, index) => (
                    <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''} h-100`}>
                        <div style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                filter: 'blur(8px) brightness(0.5)', 
                                transform: 'scale(1.1)', 
                                transition: 'background-image 1s ease-in-out',
                                zIndex: 0
                            }}></div>
                        
                        <div className="d-flex flex-column h-100 w-100 align-items-center justify-content-center text-center text-white position-relative" style={{ zIndex: 1 }}>
                            <div className="p-4" style={{ maxWidth: '800px' }}>
                                <h1 className="display-2 fw-bold mb-3" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>{item.title}</h1>
                                <p className="lead fs-3 mb-4 opacity-90" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{item.subtitle}</p>
                                <Link href={`/bitkiler?category=${item.categoryParam}`} className="btn btn-lg btn-outline-light rounded-pill px-5 py-3 fw-bold text-uppercase border-2 hover-scale">Keşfet</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" style={{ zIndex: 2 }}>
                <span className="carousel-control-prev-icon bg-dark bg-opacity-25 rounded-circle p-4" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" style={{ zIndex: 2 }}>
                <span className="carousel-control-next-icon bg-dark bg-opacity-25 rounded-circle p-4" aria-hidden="true"></span>
            </button>
        </div>
    );
}