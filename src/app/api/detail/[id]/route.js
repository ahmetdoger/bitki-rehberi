import { NextResponse } from 'next/server';

const API_KEY = process.env.PERENUAL_API_KEY;
const BASE_URL = 'https://perenual.com/api';

export async function GET(request, { params }) {
    // URL'den ID'yi almamız lazım ama Route Handler'da params async gelir veya context'ten gelir.
    // Ancak folder yapısı src/app/api/detail/[id]/route.js ise params direkt gelir.
    // Fakat kodda context params kullanacağız.
    const id = params.id;

    // URL: .../api/detail/[id] -> params.id

    // NOT: params'in await edilmesi gerekebilir Next.js sürümüne göre ama 
    // şimdilik context.params olarak alalım.

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const targetUrl = `${BASE_URL}/v2/species/details/${id}?key=${API_KEY}`;

    try {
        const res = await fetch(targetUrl);
        if (!res.ok) {
            return NextResponse.json({ error: 'Detail API Error' }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch detail' }, { status: 500 });
    }
}
