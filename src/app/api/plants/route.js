import { NextResponse } from 'next/server';

const API_KEY = process.env.PERENUAL_API_KEY;
const BASE_URL = 'https://perenual.com/api';

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    // Perenual API'ye gidecek parametreleri hazırla
    const targetUrl = new URL(`${BASE_URL}/v2/species-list`);
    // Debug Log
    console.log("Server API Call - Key:", API_KEY ? `${API_KEY.substring(0, 4)}...` : 'MISSING');

    targetUrl.searchParams.set('key', API_KEY);
    targetUrl.searchParams.set('page', '1');

    // Gelen tüm parametreleri (q, indoor, sunlight vs) aktar
    searchParams.forEach((value, key) => {
        targetUrl.searchParams.set(key, value);
    });

    try {
        console.log("Fetching:", targetUrl.toString());
        const res = await fetch(targetUrl.toString());

        if (!res.ok) {
            console.error(`API Error Status: ${res.status}`);
            const errorText = await res.text();
            console.error(`API Error Body: ${errorText}`);
            return NextResponse.json({ error: `API Error: ${res.status} - ${errorText}` }, { status: res.status });
        }
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
