import { fetchWithToken } from '../../../lib/fetchWithToken';

export async function fetchProducts(params = '') {

    const res = await fetchWithToken(`/products${params}`);

    if (!res.ok) {
        throw new Error("Lỗi tải sản phẩm");
    }

    const data = await res.json();

    return data;
}

// Upload ảnh riêng, trả về { imageUrl }
export async function uploadProductImage(file) {
    const formData = new FormData();
    formData.append('image', file); // field name phải là 'image' khớp FileInterceptor('image', ...)

    const res = await fetchWithToken('/products/upload', {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) {
        throw new Error('Lỗi upload ảnh');
    }
    return res.json(); // { imageUrl: "/uploads/products/product-xxx.jpg" }
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