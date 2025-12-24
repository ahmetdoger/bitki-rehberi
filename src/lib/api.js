import { plants as localPlants } from '../data/plants'; 

const API_KEY = 'sk-NKLS69418ed0d186d13981'; 
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

// 1. LİSTELEME FONKSİYONU
export async function getPlants(params = {}) {
    let url = `${BASE_URL}/v2/species-list?key=${API_KEY}&page=1`;

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
        else if (!params.q) url += `&q=${cat}`; // Eğer özel arama yoksa kategoriyi arama gibi kullan
    }

    if (params.sunlight) url += `&sunlight=${params.sunlight}`;
    if (params.watering) url += `&watering=${params.watering}`;

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`API Hatası: ${res.status}`);
        const data = await res.json();
        
        if(data.error || !data.data || data.data.length === 0) throw new Error('Veri yok');

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
        console.warn("API sorunu, yedek veri dönülüyor.", error.message);
        // Yedek veride arama yapmak için filtre fonksiyonunu da güncellememiz gerekir ama şimdilik API odaklıyız.
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
        if (params.sunlight && plant.light !== params.sunlight) return false;
        if (params.watering && plant.water !== params.watering) return false;
        return true;
    });
}

// NOT: getPlantDetail ve getSpecificRandomImage fonksiyonlarını önceki cevaptan aynen koru.
// Eksik kalmasın diye getPlantDetail'i tekrar yazmama gerek yok, sadece getPlants ve filterLocalData değişti.
// Ancak "export async function getPlantDetail..." kısmının silinmediğinden emin ol.
export async function getPlantDetail(id) {
    // ... (Önceki kodun aynısı) ...
    const localPlant = localPlants.find(p => p.id.toString() === id.toString());
    try {
        const res = await fetch(`${BASE_URL}/v2/species/details/${id}?key=${API_KEY}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Detay API Hatası');
        const data = await res.json();
        return {
            id: data.id,
            name: data.common_name || 'Bilinmeyen Bitki',
            scientific_name: data.scientific_name ? data.scientific_name[0] : '',
            description: data.description || null,
            cycle: data.cycle || 'Unknown',
            propagation: data.propagation ? data.propagation.join(', ') : 'Natural',
            sunlight: data.sunlight ? data.sunlight.join(', ') : 'Unknown',
            watering: data.watering || 'Average',
            hardiness: data.hardiness ? `${data.hardiness.min} - ${data.hardiness.max}` : 'Adaptable',
            maintenance: data.maintenance || 'Medium',
            growth_rate: data.growth_rate || 'Moderate',
            indoor: data.indoor ? 'Yes' : 'No',
            care_level: data.care_level || 'Medium',
            image: data.default_image?.regular_url || (localPlant ? localPlant.image : 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80')
        };
    } catch (error) {
        if (localPlant) {
            return { ...localPlant, description: "API erişilemiyor.", cycle: "Perennial", propagation: "Seeds", sunlight: localPlant.light, watering: localPlant.water, hardiness: "Zone 5-9", maintenance: "Low", growth_rate: "High", indoor: "Yes", care_level: "Easy" };
        }
        return null;
    }
}
export async function getSpecificRandomImage(categoryType) {
    // ... (Önceki kodun aynısı) ...
    return 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80';
}