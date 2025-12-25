'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { translate as tr } from '../i18n/translations';

const filterOptions = [
    { labelKey: 'full_sun', value: 'full_sun', group: 'sunlight' },
    { labelKey: 'part_shade', value: 'part_shade', group: 'sunlight' },
    { labelKey: 'full_shade', value: 'full_shade', group: 'sunlight' },

    { labelKey: 'frequent', value: 'frequent', group: 'watering' },
    { labelKey: 'average', value: 'average', group: 'watering' },
    { labelKey: 'minimum', value: 'minimum', group: 'watering' },
];

export default function FilterDropdown() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { language, t } = useLanguage();

    const handleFilterChange = (group, value, checked) => {
        const params = new URLSearchParams(searchParams.toString());

        const currentParam = params.get(group);
        let activeValues = currentParam ? currentParam.split(',') : [];

        if (checked) {
            if (!activeValues.includes(value)) {
                activeValues.push(value);
            }
        } else {
            activeValues = activeValues.filter(v => v !== value);
        }

        if (activeValues.length > 0) {
            params.set(group, activeValues.join(','));
        } else {
            params.delete(group);
        }

        if (window.location.pathname === '/') {
            router.push(`/bitkiler?${params.toString()}`);
        } else {
            router.replace(`?${params.toString()}`);
        }
    };

    const isChecked = (group, value) => {
        const currentParam = searchParams.get(group);
        if (!currentParam) return false;
        const activeValues = currentParam.split(',');
        return activeValues.includes(value);
    };

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle rounded-pill px-3 fw-semibold nav-btn-responsive" type="button" data-bs-toggle="dropdown">
                {t('filters_button')}
            </button>

            <div
                className="dropdown-menu dropdown-menu-end shadow p-3"
                style={{ minWidth: '300px', maxWidth: '90vw' }}
                data-bs-auto-close="outside"
            >
                <h6 className="dropdown-header text-uppercase">{t('sunlight_label')}</h6>
                {filterOptions.filter(f => f.group === 'sunlight').map(f => (
                    <div className="form-check" key={f.value}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isChecked('sunlight', f.value)}
                            onChange={(e) => handleFilterChange('sunlight', f.value, e.target.checked)}
                        />
                        <label className="form-check-label">
                            {tr(f.labelKey, language)}
                        </label>
                    </div>
                ))}

                <div className="dropdown-divider"></div>

                <h6 className="dropdown-header text-uppercase">{t('water_label')}</h6>
                {filterOptions.filter(f => f.group === 'watering').map(f => (
                    <div className="form-check" key={f.value}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isChecked('watering', f.value)}
                            onChange={(e) => handleFilterChange('watering', f.value, e.target.checked)}
                        />
                        <label className="form-check-label">
                            {tr(f.labelKey, language)}
                        </label>
                    </div>
                ))}

                <div className="dropdown-divider"></div>
                {/* GÜNCELLEME: Çeviri hook'u kullanıldı */}
                <p className="small text-muted mb-0">
                    {t('multiple_selection')}
                </p>
            </div>
        </div>
    );
}