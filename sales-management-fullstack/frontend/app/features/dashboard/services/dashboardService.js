import { fetchWithToken } from '../../../lib/fetchWithToken';

export async function fetchDashboardStats() {
    const res = await fetchWithToken('/dashboard/stats');
    return res.json();
}

export async function fetchTopProducts() {
    // Lấy nhiều 1 chút (limit=50) để có đủ dữ liệu mà sắp xếp/chọn top 5
    const res = await fetchWithToken('/products?limit=50');
    const data = await res.json();

    // Từ Phase 7, GET /products trả về { items, total, page, ... } chứ không
    // còn là mảng trực tiếp nữa -> phải lấy đúng data.items
    const items = Array.isArray(data) ? data : (data.items || []);

    const sorted = items.sort(
        (a, b) => (b.sold ?? b.revenue ?? 0) - (a.sold ?? a.revenue ?? 0)
    );
    return sorted.slice(0, 5);
}