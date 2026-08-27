'use client';

import Link from 'next/link';
import s from '../../features/auth/styles/registerStyles';
import { useRegister } from '../../features/auth/hooks/useRegister';
import RegisterForm from '../../features/auth/components/RegisterForm';

export default function RegisterPage() {
    const {
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
    } = useRegister();

    return (
        <div style={s.page}>
            <div style={s.card}>
                <div style={s.iconWrap}>
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3b5bdb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>

                <h1 style={s.title}>Tạo tài khoản</h1>
                <p style={s.sub}>Sale Management System</p>

                <hr style={s.hr} />

                {error ? (
                    <div style={{ ...s.alert, ...s.errorMsg }}>
                        {error}
                    </div>
                ) : null}

                {success ? (
                    <div style={{ ...s.alert, ...s.successMsg }}>
                        {success}
                    </div>
                ) : null}

                <RegisterForm
                    role={role}
                    setRole={setRole}

                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    address={address}
                    setAddress={setAddress}

                    shopName={shopName}
                    setShopName={setShopName}

                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}

                    showPassword={showPassword}
                    togglePassword={togglePassword}
                    showConfirm={showConfirm}
                    toggleConfirm={toggleConfirm}

                    loading={loading}
                    onSubmit={handleSubmit}
                />

                <p style={s.footer}>
                    Đã có tài khoản?{' '}
                    <Link href="/login" style={s.link}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}