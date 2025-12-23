const API_KEY = 'sk-NKLS69418ed0d186d13981'; // <-- BURAYA GERÇEK KEY'İNİ YAPIŞTIR
const BASE_URL = 'https://perenual.com/api';

// 1. LİSTELEME FONKSİYONU
export async function getPlants(params = {}) {
    let url = `${BASE_URL}/species-list?key=${API_KEY}&page=1`;

    if (params.category) {
        const cat = params.category.toLowerCase();
        
        if (cat === 'indoor') url += '&indoor=1';
        else if (cat === 'outdoor') url += '&indoor=0';
        else if (cat === 'flowering') url += '&q=flower'; 
        else if (cat === 'cyclemix') url += '&cycle=perennial'; 
        else url += `&q=${cat}`;
    }

    if (params.sunlight) url += `&sunlight=${params.sunlight}`;
    if (params.watering) url += `&watering=${params.watering}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('API Hatası');
        const data = await res.json();
        
        if(data.error || !data.data) return [];

        return data.data.map(item => ({
            id: item.id,
            name: item.common_name || 'Bitki',
            scientific_name: item.scientific_name ? item.scientific_name[0] : '',
            image: item.default_image?.regular_url || 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80',
            light: item.sunlight && item.sunlight.length > 0 ? item.sunlight[0].toLowerCase().replace(/ /g, '_') : 'unknown',
            water: item.watering ? item.watering.toLowerCase() : 'average',
            category: params.category || 'General' 
        }));

    } catch (error) {
        console.error("Hata:", error);
        return [];
    }
}

// 2. SLIDER İÇİN RASTGELE RESİM FONKSİYONU
export async function getSpecificRandomImage(categoryType) {
    let url = `${BASE_URL}/species-list?key=${API_KEY}`;

    if (categoryType === 'Indoor') url += '&indoor=1';
    else if (categoryType === 'Outdoor') url += '&indoor=0';
    else if (categoryType === 'Flowering') url += '&q=flower';
    else if (categoryType === 'CycleMix') {
        const randomCycle = Math.random() > 0.5 ? 'annual' : 'perennial';
        url += `&cycle=${randomCycle}`;
    }
    else url += '&indoor=1'; 

    try {
        const randomPage = Math.floor(Math.random() * 5) + 1; 
        const res = await fetch(`${url}&page=${randomPage}`);
        const data = await res.json();

        if (!data.data || data.data.length === 0) return null;

        const plantsWithImage = data.data.filter(p => p.default_image?.regular_url);
        if (plantsWithImage.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * plantsWithImage.length);
        return plantsWithImage[randomIndex].default_image.regular_url;

    } catch (error) {
        return null;
    }
}