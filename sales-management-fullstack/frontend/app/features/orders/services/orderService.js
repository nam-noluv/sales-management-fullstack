import { fetchWithToken } from '../../../lib/fetchWithToken';


export async function fetchMyOrders() {
    const res = await fetchWithToken('/orders/my-orders');
    return res.json();
}

export async function fetchAllOrders() {
    const res = await fetchWithToken('/orders');
    return res.json();
}

export async function fetchCustomersList() {
    const res = await fetchWithToken('/customers');
    return res.json();
}

export async function fetchProductsList() {
    const res = await fetchWithToken('/products');
    const data = await res.json();
    return data.items || [];
}

export async function createOrderRequest(body) {
    const res = await fetchWithToken('/orders', {
        method: 'POST',
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        const message = Array.isArray(error.message)
            ? error.message.join(', ')
            : error.message || `Tạo đơn hàng thất bại (${res.status})`;
        throw new Error(message);
    }

    return res;
}

export async function updateOrderRequest(id, body) {
    return fetchWithToken(`/orders/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
}

export async function deleteOrderRequest(id) {
    return fetchWithToken(`/orders/${id}`, {
        method: 'DELETE',
    });
}