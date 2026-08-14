"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOtpRequest, resetPasswordRequest } from "../services/authService";

export function useForgotPassword() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleOtpChange = (value) => setOtp(value.replace(/\D/g, '').slice(0, 6));
    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirm = () => setShowConfirm(prev => !prev);

    const handleSendOtp = async () => {
        if (!email) {
            setError('Vui lòng nhập email');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await sendOtpRequest(email);
            setStep(2);
            setSuccess('Mã xác nhận đã được gửi đến email của bạn.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await resetPasswordRequest(email, otp, newPassword);
            setSuccess('Đặt lại mật khẩu thành công!');
            setTimeout(() => router.push('/login'), 800);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        step, email, setEmail, otp, handleOtpChange,
        newPassword, setNewPassword, confirmPassword, setConfirmPassword,
        showPassword, togglePassword, showConfirm, toggleConfirm,
        loading, error, success,
        handleSendOtp, handleResetPassword,
    };
}