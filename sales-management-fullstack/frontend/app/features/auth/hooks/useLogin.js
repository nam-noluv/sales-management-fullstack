"use client";

import { useState } from "react";
import { adminLoginRequest, loginRequest, saveSession } from "../services/authService";

export function useLogin({ adminOnly = false } = {}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [forbidden, setForbidden] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setForbidden(false);
        setLoading(true);

        try {
            const data = adminOnly
                ? await adminLoginRequest(email, password)
                : await loginRequest(email, password);

            saveSession(data);

            if (adminOnly) {
                window.location.href = '/admin/dashboard';
            } else {
                window.location.href = '/user/dashboard';
            }
        } catch (err) {
            if (err.status === 403) {
                setForbidden(true);
            }
            setError(err.message || "Lỗi kết nối đến server");
            console.error(err);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        showPassword, togglePassword,
        error, forbidden, loading,
        handleLogin,
    };
}