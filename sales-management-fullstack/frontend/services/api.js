const API_BASE_URL = 'http://localhost:3001';

export const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export async function getProducts() {
    const res = await fetch(`${API_BASE_URL}/products`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Không thể lấy danh sách sản phẩm');
    }

    return res.json();
}

export async function getProfile() {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        cache: 'no-store',
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error('Không thể lấy thông tin người dùng');
    }

    return res.json();
}

export async function getCustomers() {
    const res = await fetch(`${API_BASE_URL}/customers`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error('Không thể lấy danh sách khách hàng');
    }

    return res.json();
}

export async function deleteCustomer(id) {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    const data = await res.json().catch(() => null);

    console.log('DELETE CUSTOMER STATUS:', res.status);
    console.log('DELETE CUSTOMER RESPONSE:', data);

    if (!res.ok) {
        throw new Error(data?.message || 'Không thể xóa khách hàng');
    }

    return data;
}

export async function addCustomer(data) {
    const res = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Không thể thêm khách hàng');
    }

    return res.json();
}

export async function updateCustomer(id, data) {
    const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Không thể cập nhật khách hàng');
    }

    return res.json();
}

export async function getOrders() {
    const res = await fetch(`${API_BASE_URL}/orders`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error('Không thể lấy danh sách đơn hàng');
    }
    return res.json();
}

export async function getMyOrders() {
    const res = await fetch(`${API_BASE_URL}/orders/my-orders`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error('Không thể lấy đơn hàng của bạn');
    }
    return res.json();
}
