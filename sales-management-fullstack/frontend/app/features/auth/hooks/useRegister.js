"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRequest } from "../services/authService";

export function useRegister() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirm = () => setShowConfirm(prev => !prev);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !phone || !address || !email || !password || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setLoading(true);
        try {
            await registerRequest({ name, phone, address, email, password });
            setSuccess('Tạo tài khoản thành công!');
            setTimeout(() => router.push('/login'), 600);
        } catch (err) {
            setError(err.message || 'Lỗi kết nối đến server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        name, setName, phone, setPhone, address, setAddress,
        email, setEmail, password, setPassword,
        confirmPassword, setConfirmPassword,
        showPassword, togglePassword, showConfirm, toggleConfirm,
        loading, error, success,
        handleSubmit,
    };
}