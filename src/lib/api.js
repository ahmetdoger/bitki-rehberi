import { plants as localPlants } from '../data/plants';

// API Key server-side (route handler) üzerinden yönetiliyor.
// const API_KEY = '...'; // REMOVED

const BASE_URL = 'https://perenual.com/api';

// --- YARDIMCI FONKSİYON: GÜNEŞ VERİSİNİ ZORLA DÜZELT ---
function normalizeSunlight(input) {
    if (!input || input.length === 0) return 'unknown';
    const text = Array.isArray(input) ? input.join(' ').toLowerCase() : input.toString().toLowerCase();

    if (text.includes('full_sun') || (text.includes('full') && text.includes('sun'))) return 'full_sun';
    if (text.includes('part_shade') || (text.includes('part') && text.includes('shade'))) return 'part_shade';
    if (text.includes('part_sun') || (text.includes('part') && text.includes('sun'))) return 'part_sun';
    if (text.includes('full_shade') || (text.includes('full') && text.includes('shade'))) return 'full_shade';

    if (text.includes('sun')) return 'full_sun';
    return 'unknown';
}

// 1. DATA FETCHING - HYBRID (Try API -> Fallback to Local)
export async function getPlants(params = {}) {
    // Proxy Route'a istek atıyoruz (API Key orada gizli)
    let url = `/api/plants?page=1`;

    // 🔍 ARAMA PARAMETRESİ EKLENDİ (q)
    if (params.q) {
        url += `&q=${params.q}`;
    }

    // Kategori Filtreleri
    if (params.category) {
        const cat = params.category.toLowerCase();
        if (cat === 'indoor') url += '&indoor=1';
        else if (cat === 'outdoor') url += '&indoor=0';
        else if (cat === 'flowering') url += '&q=flower';
        else if (cat === 'cyclemix') url += '&cycle=perennial';
        else if (!params.q) url += `&q=${cat}`;
    }

    if (params.sunlight) url += `&sunlight=${params.sunlight}`;
    if (params.watering) url += `&watering=${params.watering}`;

    try {
        console.log("Fetching from API:", url);
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) {
            const errText = await res.text();
            console.warn(`Real API Failed (${res.status}): ${errText}`);
            throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();
        if (data.error || !data.data || data.data.length === 0) throw new Error('Veri yok');

        console.log("API Success! Returning real data.");
        return data.data.map(item => {
            const cleanSun = normalizeSunlight(item.sunlight);
            return {
                id: item.id,
                name: item.common_name || 'Bitki',
                scientific_name: item.scientific_name ? item.scientific_name[0] : '',
                image: item.default_image?.regular_url || 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80',
                light: cleanSun,
                water: item.watering ? item.watering.toLowerCase() : 'average',
                category: params.category || 'General'
            };
        });

    } catch (error) {
        console.warn("API Erişilemedi, Gelişmiş Yedek Veri kullanılıyor.", error.message);
        return filterLocalData(localPlants, params);
    }
}

// ... (Diğer fonksiyonlar: getPlantDetail, getSpecificRandomImage AYNI KALIYOR) ...
// (Lütfen dosyanın geri kalanını olduğu gibi koruyun, sadece getPlants'i güncelleyin)

// YEDEK FİLTRELEME (Aramayı da destekleyecek şekilde güncelleyelim)
function filterLocalData(data, params) {
    return data.filter(plant => {
        // Arama (İsimde geçiyor mu?)
        if (params.q) {
            const term = params.q.toLowerCase();
            if (!plant.name.toLowerCase().includes(term) &&
                !plant.scientific_name.toLowerCase().includes(term)) {
                return false;
            }
        }

        if (params.category) {
            const pCat = plant.category.toLowerCase();
            const qCat = params.category.toLowerCase();
            if (qCat !== 'cyclemix' && !pCat.includes(qCat) && !qCat.includes(pCat)) return false;
        }
        if (params.sunlight) {
            const suns = params.sunlight.split(',');
            if (!suns.includes(plant.light)) return false;
        }
        if (params.watering) {
            const waters = params.watering.split(',');
            if (!waters.includes(plant.water)) return false;
        }
        return true;
    });
}

// NOT: getPlantDetail ve getSpecificRandomImage fonksiyonlarını önceki cevaptan aynen koru.
// Eksik kalmasın diye getPlantDetail'i tekrar yazmama gerek yok, sadece getPlants ve filterLocalData değişti.
// Ancak "export async function getPlantDetail..." kısmının silinmediğinden emin ol.
export async function getPlantDetail(id) {
    const localPlant = localPlants.find(p => p.id.toString() === id.toString());

    if (localPlant) {
        return {
            id: localPlant.id,
            name: localPlant.name,
            scientific_name: localPlant.scientific_name,
            description: localPlant.description || "A wonderful plant.",
            cycle: "Perennial", // Mock default
            propagation: "Seeds, Division",
            sunlight: Array.isArray(localPlant.sunlight) ? localPlant.sunlight.join(', ') : localPlant.light,
            watering: localPlant.water,
            hardiness: "Zone 5-11",
            maintenance: localPlant.maintenance || "Medium",
            growth_rate: localPlant.growth_rate || "Moderate",
            indoor: localPlant.indoor,
            care_level: localPlant.care_level || "Medium",
            image: localPlant.image
        };
    }
    return null;
}
export async function getSpecificRandomImage(categoryType) {
    // ... (Önceki kodun aynısı) ...
    return 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80';
}