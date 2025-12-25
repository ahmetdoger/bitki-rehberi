const imagePool = {
    Indoor: [
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&q=80", // Monstera
        "https://images.unsplash.com/photo-1628120615598-ec5b6b66e01a?w=600&q=80", // Fiddle Leaf
        "https://images.unsplash.com/photo-1593482886870-17e909249e91?w=600&q=80", // Peace Lily
        "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=600&q=80", // ZZ Plant
        "https://images.unsplash.com/photo-1572688484279-a27d0354ea47?w=600&q=80", // Spider Plant
        "https://images.unsplash.com/photo-1598918230138-085e4c02224d?w=600&q=80", // Rubber Plant
        "https://images.unsplash.com/photo-1593489394625-f3ff432c2533?w=600&q=80", // Pothos
        "https://images.unsplash.com/photo-1520186994231-6ea0019d8cc2?w=600&q=80", // Fern
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=80", // Green plant
        "https://images.unsplash.com/photo-1599598425947-d3527b165bf2?w=600&q=80"  // Hanging plant
    ],
    Outdoor: [
        "https://images.unsplash.com/photo-1517480447814-22b629851727?w=600&q=80", // Lavender
        "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=600&q=80", // Garden
        "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80", // Green Bush
        "https://images.unsplash.com/photo-1566956249339-44569cb2cc35?w=600&q=80"  // Wildflowers
    ],
    Flowering: [
        "https://images.unsplash.com/photo-1550950664-500eccc82136?w=600&q=80", // Rose
        "https://images.unsplash.com/photo-1620857731737-183d21ad52b3?w=600&q=80", // Tulip
        "https://images.unsplash.com/photo-1470509037663-253afd7f0fdd?w=600&q=80", // Sunflower
        "https://images.unsplash.com/photo-1566933553250-9c8821437146?w=600&q=80", // Orchid
        "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?w=600&q=80", // Colorful mix
        "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=600&q=80", // Hydrangea
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80", // Purple flower
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80"  // Cherry Blossom
    ],
    Succulent: [
        "https://images.unsplash.com/photo-1596547610015-a681329d5b54?w=600&q=80", // Aloe
        "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&q=80", // Cactus
        "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80", // Jade
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80"  // Succulent mix
    ],
    Herb: [
        "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=600&q=80", // Basil
        "https://images.unsplash.com/photo-1626469279075-8494902b97c0?w=600&q=80", // Mint
        "https://images.unsplash.com/photo-1596131499923-28c0570b5514?w=600&q=80"  // Rosemary
    ]
};

const basePlants = [
    { name: "Monstera Deliciosa", sci: ["Monstera deliciosa"], cat: "Indoor", light: ["part_shade"], water: "average" },
    { name: "Fiddle Leaf Fig", sci: ["Ficus lyrata"], cat: "Indoor", light: ["full_sun"], water: "average" },
    { name: "Snake Plant", sci: ["Sansevieria trifasciata"], cat: "Indoor", light: ["full_shade"], water: "minimum" },
    { name: "Peace Lily", sci: ["Spathiphyllum"], cat: "Indoor", light: ["full_shade"], water: "frequent" },
    { name: "Aloe Vera", sci: ["Aloe vera"], cat: "Succulent", light: ["full_sun"], water: "minimum" },
    { name: "ZZ Plant", sci: ["Zamioculcas zamiifolia"], cat: "Indoor", light: ["full_shade"], water: "minimum" },
    { name: "Rose", sci: ["Rosa"], cat: "Flowering", light: ["full_sun"], water: "average" },
    { name: "Tulip", sci: ["Tulipa"], cat: "Flowering", light: ["full_sun"], water: "average" },
    { name: "Sunflower", sci: ["Helianthus annuus"], cat: "Flowering", light: ["full_sun"], water: "frequent" },
    { name: "Mint", sci: ["Mentha"], cat: "Herb", light: ["part_shade"], water: "frequent" },
    { name: "Hydrangea", sci: ["Hydrangea macrophylla"], cat: "Flowering", light: ["part_shade"], water: "frequent" },
    { name: "Orchid", sci: ["Orchidaceae"], cat: "Flowering", light: ["part_shade"], water: "average" },
    { name: "Lavender", sci: ["Lavandula"], cat: "Outdoor", light: ["full_sun"], water: "minimum" },
    { name: "Basil", sci: ["Ocimum basilicum"], cat: "Herb", light: ["full_sun"], water: "frequent" },
    { name: "Cactus", sci: ["Cactaceae"], cat: "Succulent", light: ["full_sun"], water: "minimum" },
    { name: "Fern", sci: ["Polypodiopsida"], cat: "Indoor", light: ["part_shade"], water: "frequent" },
    { name: "Pothos", sci: ["Epipremnum aureum"], cat: "Indoor", light: ["part_shade"], water: "average" },
    { name: "Rubber Plant", sci: ["Ficus elastica"], cat: "Indoor", light: ["part_sun"], water: "average" },
    { name: "Jade Plant", sci: ["Crassula ovata"], cat: "Succulent", light: ["full_sun"], water: "minimum" },
    { name: "Rosemary", sci: ["Salvia rosmarinus"], cat: "Herb", light: ["full_sun"], water: "minimum" }
];

const generatedPlants = [];
const variations = ["Variegated", "Giant", "Dwarf", "Golden", "Silver", "Red", "Blue", "Wild", "Hybrid", "Royal"];

// Generate 160 items
for (let i = 0; i < 160; i++) {
    const baseIndex = i % basePlants.length;
    const base = basePlants[baseIndex];
    const variationIndex = Math.floor(i / basePlants.length) % variations.length;
    const variation = variations[variationIndex];

    let name = base.name;
    if (i >= basePlants.length) {
        name = `${variation} ${base.name}`;
    }

    // Pick random image from category pool
    const pool = imagePool[base.cat] || imagePool.Indoor;
    const randomImage = pool[Math.floor(Math.random() * pool.length)];

    generatedPlants.push({
        id: i + 1,
        common_name: name,
        scientific_name: base.sci,
        image: randomImage,
        sunlight: base.light,
        watering: base.water,
        category: base.cat,
        cycle: "Perennial",
        description: `This ${name} is a stunning example of ${base.cat.toLowerCase()} flora. Known for its distinct foliage and resilience.`,
        indoor: base.cat === "Indoor" || base.cat === "Succulent",
        care_level: ["Low", "Medium", "High"][i % 3],
        maintenance: ["Low", "Medium", "High"][i % 3],
        growth_rate: ["Slow", "Moderate", "Fast"][i % 3],
        hardiness: { min: "5", max: "11" }
    });
}

export const plants = generatedPlants.map(p => ({
    id: p.id,
    name: p.common_name,
    common_name: p.common_name,
    scientific_name: p.scientific_name[0],
    full_scientific_name: p.scientific_name,
    image: p.image,
    light: p.sunlight[0],
    sunlight: p.sunlight,
    water: p.watering,
    category: p.category,
    description: p.description,
    indoor: p.indoor ? "Yes" : "No",
    care_level: p.care_level,
    maintenance: p.maintenance,
    hardiness: p.hardiness,
    growth_rate: p.growth_rate
}));