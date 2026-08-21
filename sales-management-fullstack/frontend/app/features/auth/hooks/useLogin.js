"use client";

import { useState } from "react";
import { loginRequest, saveSession } from "../services/authService";

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await loginRequest(email, password);

            saveSession(data);

            if (data.user?.role === 'ADMIN') {
                window.location.href = '/admin/dashboard';
            } else {
                window.location.href = '/user/dashboard';
            }
        } catch (err) {
            setError(err.message || "Lỗi kết nối đến server");
            console.error(err);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        showPassword, togglePassword,
        error, loading,
        handleLogin,
    };
}