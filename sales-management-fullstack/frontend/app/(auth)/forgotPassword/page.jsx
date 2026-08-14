'use client';

import Link from 'next/link';
import s from '../../features/auth/styles/forgotPasswordStyles';
import { useForgotPassword } from '../../features/auth/hooks/useForgotPassword';
import ForgotPasswordSteps from '../../features/auth/components/ForgotPasswordSteps';
import EmailStep from '../../features/auth/components/EmailStep';
import ResetPasswordStep from '../../features/auth/components/ResetPasswordStep';

export default function ForgotPasswordPage() {
    const {
        step, email, setEmail, otp, handleOtpChange,
        newPassword, setNewPassword, confirmPassword, setConfirmPassword,
        showPassword, togglePassword, showConfirm, toggleConfirm,
        loading, error, success,
        handleSendOtp, handleResetPassword,
    } = useForgotPassword();

    return (
        <div style={s.page}>
            <div style={s.card}>
                <div style={s.iconWrap}>
                    {step === 1 ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </div>

                <h1 style={s.title}>{step === 1 ? 'Quên mật khẩu' : 'Đặt lại mật khẩu'}</h1>
                <p style={s.sub}>
                    {step === 1 ? 'Nhập email để nhận mã xác nhận' : `Mã OTP đã gửi đến ${email}`}
                </p>

                <ForgotPasswordSteps step={step} />

                <hr style={s.hr} />

                {error ? <div style={s.errorMsg}>{error}</div> : null}
                {success ? <div style={s.successMsg}>{success}</div> : null}

                {step === 1 ? (
                    <EmailStep email={email} setEmail={setEmail} onSubmit={handleSendOtp} />
                ) : (
                    <ResetPasswordStep
                        otp={otp} onOtpChange={handleOtpChange} onResend={handleSendOtp} loading={loading}
                        newPassword={newPassword} setNewPassword={setNewPassword}
                        showPassword={showPassword} togglePassword={togglePassword}
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                        showConfirm={showConfirm} toggleConfirm={toggleConfirm}
                    />
                )}

                <button
                    type="button"
                    onClick={step === 1 ? handleSendOtp : handleResetPassword}
                    disabled={loading}
                    style={{ ...s.btn, opacity: loading ? 0.8 : 1 }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.background = '#1d4ed8')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.background = '#2563eb')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {loading ? 'Đang xử lý...' : step === 1 ? 'Gửi mã xác nhận' : 'Đặt lại mật khẩu'}
                </button>

                <p style={s.footer}>
                    <Link href="/login" style={s.link}>← Quay lại đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}