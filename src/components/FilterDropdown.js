'use client';

import React, { useState } from 'react';

const filterOptions = [
    { label: 'Tam Güneş', value: 'Tam Güneş', group: 'light' },
    { label: 'Kısmi Gölge', value: 'Kısmi Gölge', group: 'light' },
    { label: 'Gölge', value: 'Gölge', group: 'light' },
    { label: 'Düşük', value: 'Düşük', group: 'water' },
    { label: 'Orta', value: 'Orta', group: 'water' },
    { label: 'Yüksek', value: 'Yüksek', group: 'water' },
];

export default function FilterDropdown() {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedFilters(prev => [...prev, value]);
        } else {
            setSelectedFilters(prev => prev.filter(filter => filter !== value));
        }
        console.log("Seçilen filtreler:", selectedFilters);
    };

    return (
        <div className="dropdown">
            <button 
              className="btn btn-warning dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              🔍 Filtreler
            </button>
            
            {/* DÜZELTME BURADA YAPILDI: */}
            {/* dropdown-menu-end: Menüyü sağa yaslar, sola doğru açılır. Ekran dışına taşmayı engeller. */}
            {/* shadow: Menüye gölge ekler, daha belirgin olur. */}
            <div className="dropdown-menu dropdown-menu-end shadow p-3" style={{ minWidth: '300px' }} data-bs-auto-close="outside">
              <h6 className="dropdown-header">Bakım Gereksinimleri</h6>
              
              <label className="fw-bold d-block mt-2">Işık İhtiyacı</label>
              {filterOptions.filter(f => f.group === 'light').map(f => (
                <div className="form-check" key={f.value}>
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={f.value} 
                    id={`light_${f.value}`} 
                    onChange={handleFilterChange} 
                  />
                  <label className="form-check-label" htmlFor={`light_${f.value}`}>{f.label}</label>
                </div>
              ))}
              
              <div className="dropdown-divider"></div>
              
              <label className="fw-bold d-block mt-2">Su İhtiyacı</label>
              {filterOptions.filter(f => f.group === 'water').map(f => (
                <div className="form-check" key={f.value}>
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={f.value} 
                    id={`water_${f.value}`} 
                    onChange={handleFilterChange} 
                  />
                  <label className="form-check-label" htmlFor={`water_${f.value}`}>{f.label}</label>
                </div>
              ))}
              
              <p className="small text-muted mt-3 mb-0">Seçimleriniz anlık uygulanacaktır.</p>
            </div>
        </div>
    );
}