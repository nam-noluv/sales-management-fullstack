const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function fetchWithToken(path, options = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    return fetch(url, { ...options, headers });
}
export { API_BASE_URL };