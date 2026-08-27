import { fetchWithToken } from '../../../lib/fetchWithToken';

export async function fetchProducts(params = '') {

    const res = await fetchWithToken(`/products${params}`);

    if (!res.ok) {
        throw new Error("Lỗi tải sản phẩm");
    }

    const data = await res.json();

    return data;
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