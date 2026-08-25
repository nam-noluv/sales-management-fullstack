const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function loginRequest(email, password) {
    return requestLogin('/auth/login', email, password);
}

export async function adminLoginRequest(email, password) {
    return requestLogin('/auth/admin/login', email, password);
}

async function requestLogin(path, email, password) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || 'Đăng nhập thất bại');
        error.status = res.status;
        throw error;
    }

    return data;
}

export function saveSession(data) {
    if (data.access_token) {
        localStorage.setItem('token', data.access_token);
    }
    if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('email', data.user.email);
    }
}

export async function sendOtpRequest(email) {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message || 'Không tìm thấy email này');
    }
    return data;
}

export async function resetPasswordRequest(email, otp, newPassword) {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(data?.message || 'OTP không hợp lệ hoặc đã hết hạn');
    }
    return data;
}

export async function registerRequest(payload) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || 'Tạo tài khoản thất bại');
    }

    return data;
}