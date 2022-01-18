export default async function call<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, {
        signal: controller.signal,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    clearTimeout(timer);
    const data: T = await response.json();
    if (response.status === 404) {
        throw new Error('Not found');
    }
    if (response.status !== 200) {
        throw new Error('Error');
    }
    return data;
}
