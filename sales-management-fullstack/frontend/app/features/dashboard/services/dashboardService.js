import { fetchWithToken } from '../../../lib/fetchWithToken';

export async function fetchDashboardStats() {
    const res = await fetchWithToken('/dashboard/stats');
    return res.json();
}

export async function fetchTopProducts() {
    const res = await fetchWithToken('/products');
    const data = await res.json();
    const sorted = (data || []).sort(
        (a, b) => (b.sold ?? b.revenue ?? 0) - (a.sold ?? a.revenue ?? 0)
    );
    return sorted.slice(0, 5);
}