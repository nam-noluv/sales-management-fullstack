"use client";

import s from "../styles/registerStyles";
import { EyeIcon, EyeOffIcon } from "../../../components/UI/eyeIcon";

export default function RegisterForm({
    name, setName, phone, setPhone, address, setAddress,
    email, setEmail, password, setPassword,
    confirmPassword, setConfirmPassword,
    showPassword, togglePassword, showConfirm, toggleConfirm,
    loading, onSubmit,
}) {
    const mismatch = confirmPassword && confirmPassword !== password;

    return (
        <form onSubmit={onSubmit}>
            <div style={s.field}>
                <label style={s.label}>Họ Tên</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox='0 0 24 24' fill='none'
                        stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                        <circle cx='12' cy='7' r='4' />
                    </svg>
                    <input
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={s.input}
                        onFocus={(e) => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#030101'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#595a5c'; }}
                    />
                </div>
            </div>

            <div style={s.field}>
                <label style={s.label}>SỐ ĐIỆN THOẠI</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <input
                        type="tel"
                        placeholder="0912345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={s.input}
                        onFocus={(e) => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#030101'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#595a5c'; }}
                    />
                </div>
            </div>

            <div style={s.field}>
                <label style={s.label}>ĐỊA CHỈ</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <input
                        type="text"
                        placeholder="123 Đường ABC, Quận 1, TP.HCM"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={s.input}
                        onFocus={(e) => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#030101'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#595a5c'; }}
                    />
                </div>
            </div>

            <div style={s.field}>
                <label style={s.label}>EMAIL</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <input
                        type="email"
                        placeholder="ban@congty.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={s.input}
                        onFocus={(e) => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#030101'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#595a5c'; }}
                    />
                </div>
            </div>

            <div style={s.field}>
                <label style={s.label}>MẬT KHẨU</label>
                <div style={s.inputWrap}>
                    <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ít nhất 6 ký tự"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ ...s.input, paddingRight: '40px' }}
                        onFocus={(e) => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#030101'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'transparent'; e.target.style.background = '#595a5c'; }}
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
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                            ...s.input, paddingRight: '40px',
                            borderColor: mismatch ? '#fa5252' : 'transparent',
                            background: mismatch ? '#030101' : '#595a5c',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = mismatch ? '#fa5252' : '#3b5bdb'; e.target.style.background = '#030101'; }}
                        onBlur={(e) => { e.target.style.borderColor = mismatch ? '#fa5252' : 'transparent'; e.target.style.background = mismatch ? '#030101' : '#595a5c'; }}
                    />
                    <button type="button" onClick={toggleConfirm} style={s.eyeBtn} tabIndex={-1}>
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
                {mismatch ? (
                    <p style={{ fontSize: '11px', color: '#fa5252', marginTop: '4px' }}>Mật khẩu không khớp</p>
                ) : null}
            </div>

            <button
                type="submit"
                disabled={loading}
                style={{ ...s.btn, opacity: loading ? 0.75 : 1 }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#2f4bbf')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#3b5bdb')}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </button>
        </form>
    );
}