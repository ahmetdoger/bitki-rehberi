import React from 'react';
// src klasöründen import etmek için ../components kullanıyoruz
import HeroSlider from '../components/HeroSlider'; 

export default function Home() {
  return (
      <div className="container-fluid p-0 py-lg-4 px-lg-4" style={{ height: '85vh' }}> 
        <HeroSlider />
      </div>
  );
}