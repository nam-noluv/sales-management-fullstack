"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerRequest } from "../services/authService";

export function useRegister() {
    const router = useRouter();

    // CUSTOMER hoặc SELLER
    const [role, setRole] = useState("CUSTOMER");

    // Field dùng chung
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // CUSTOMER
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // SELLER
    const [shopName, setShopName] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirm = () => {
        setShowConfirm((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Validate field chung
        if (!email || !password || !confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        // Validate CUSTOMER
        if (
            role === "CUSTOMER" &&
            (!name || !phone || !address)
        ) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        // Validate SELLER
        if (role === "SELLER" && !shopName) {
            setError("Vui lòng nhập tên cửa hàng");
            return;
        }

        // Confirm password
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        // Password length
        if (password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setLoading(true);

        try {
            const payload =
                role === "CUSTOMER"
                    ? {
                        role: "CUSTOMER",
                        name,
                        phone,
                        address,
                        email,
                        password,
                    }
                    : {
                        role: "SELLER",
                        shopName,
                        email,
                        password,
                    };

            await registerRequest(payload);

            setSuccess(
                role === "SELLER"
                    ? "Đăng ký cửa hàng thành công!"
                    : "Tạo tài khoản thành công!"
            );

            // Cả CUSTOMER và SELLER dùng chung trang login
            setTimeout(() => {
                router.push("/login");
            }, 600);
        } catch (err) {
            setError(
                err?.message ||
                "Lỗi kết nối đến server"
            );

            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        role,
        setRole,

        name,
        setName,
        phone,
        setPhone,
        address,
        setAddress,

        shopName,
        setShopName,

        email,
        setEmail,
        password,
        setPassword,

        confirmPassword,
        setConfirmPassword,

        showPassword,
        togglePassword,

        showConfirm,
        toggleConfirm,

        loading,
        error,
        success,

        handleSubmit,
    };
}