"use client";

import s from "../styles/forgotPasswordStyles";
import { EyeIcon, EyeOffIcon } from "../../../components/UI/eyeIcon";

export default function ResetPasswordStep({
    otp, onOtpChange, onResend, loading,
    newPassword, setNewPassword, showPassword, togglePassword,
    confirmPassword, setConfirmPassword, showConfirm, toggleConfirm,
}) {
    const mismatch = confirmPassword && confirmPassword !== newPassword;

    return (
        <>
            <div style={s.field}>
                <label style={s.label}>MÃ OTP</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Nhập mã 6 số"
                        value={otp}
                        onChange={e => onOtpChange(e.target.value)}
                        style={{ ...s.input, letterSpacing: '0.2em', fontWeight: '600' }}
                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#0f172a'; }}
                        onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.background = '#111827'; }}
                    />
                </div>
                <button type="button" onClick={onResend} style={s.resendBtn} disabled={loading}>
                    Gửi lại mã
                </button>
            </div>

            <div style={s.field}>
                <label style={s.label}>MẬT KHẨU MỚI</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ít nhất 6 ký tự"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        style={{ ...s.input, paddingRight: '40px' }}
                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#0f172a'; }}
                        onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.background = '#111827'; }}
                    />
                    <button type="button" onClick={togglePassword} style={s.eyeBtn} tabIndex={-1}>
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>

            <div style={s.field}>
                <label style={s.label}>XÁC NHẬN MẬT KHẨU</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        style={{
                            ...s.input,
                            paddingRight: '40px',
                            borderColor: mismatch ? '#f87171' : '#334155',
                            background: mismatch ? '#1f1a23' : '#111827',
                        }}
                        onFocus={e => { e.target.style.borderColor = mismatch ? '#f87171' : '#2563eb'; e.target.style.background = '#0f172a'; }}
                        onBlur={e => { e.target.style.borderColor = mismatch ? '#f87171' : '#334155'; e.target.style.background = mismatch ? '#1f1a23' : '#111827'; }}
                    />
                    <button type="button" onClick={toggleConfirm} style={s.eyeBtn} tabIndex={-1}>
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
                {mismatch && <p style={s.errorMsg}>Mật khẩu không khớp</p>}
            </div>
        </>
    );
}