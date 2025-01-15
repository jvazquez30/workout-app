export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    try {
        const response = await fetch('https://libapi.vercel.app/api/exercises?lang=en&page=0&limit=300', options);

        if (!response.ok) {
            console.error('API Error:', await response.text());
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
} 