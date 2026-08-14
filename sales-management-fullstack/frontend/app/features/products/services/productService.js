import { fetchWithToken } from '../../../lib/fetchWithToken';

export async function fetchProducts() {
    const res = await fetchWithToken('/products');
    if (!res.ok) {
        throw new Error("Lỗi tải sản phẩm");
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

export async function createProduct(payload) {
    return fetchWithToken('/products', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export async function updateProduct(id, payload) {
    return fetchWithToken(`/products/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

export async function deleteProductRequest(id) {
    return fetchWithToken(`/products/${id}`, {
        method: 'DELETE',
    });
}