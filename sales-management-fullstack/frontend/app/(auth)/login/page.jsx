'use client';

import Link from 'next/link';
import loginStyles from '../../features/auth/styles/loginStyles';
import { useLogin } from '../../features/auth/hooks/useLogin';
import { EyeIcon, EyeOffIcon } from '../../components/UI/eyeIcon';

export default function LoginPage() {
    const {
        email, setEmail,
        password, setPassword,
        showPassword, togglePassword,
        error, loading,
        handleLogin,
    } = useLogin();

    return (
        <div style={loginStyles.page}>
            <div style={loginStyles.card}>

                <div style={loginStyles.iconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="#3b5bdb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </div>

                <h1 style={loginStyles.title}>Đăng nhập</h1>
                <p style={loginStyles.sub}>Sale Management System</p>

                <hr style={loginStyles.hr} />

                {error && <div style={loginStyles.errorMsg}>{error}</div>}

                {/* Email */}
                <div style={loginStyles.field}>
                    <label style={loginStyles.label}>EMAIL</label>
                    <div style={loginStyles.inputWrap}>
                        <svg style={loginStyles.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleLogin(e)}
                            style={loginStyles.input}
                            onFocus={e => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#7ba2e6'; }}
                            onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
                        />
                    </div>
                </div>

                {/* Password */}
                <div style={loginStyles.field}>
                    <div style={loginStyles.fieldTop}>
                        <label style={loginStyles.label}>MẬT KHẨU</label>
                        <Link href="/forgotPassword" style={loginStyles.forgot}>Quên mật khẩu?</Link>
                    </div>
                    <div style={loginStyles.inputWrap}>
                        <svg style={loginStyles.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleLogin(e)}
                            style={{ ...loginStyles.input, paddingRight: '40px' }}
                            onFocus={e => { e.target.style.borderColor = '#3b5bdb'; e.target.style.background = '#7ba2e6'; }}
                            onBlur={e => { e.target.style.borderColor = 'transparent'; e.target.style.background = 'transparent'; }}
                        />
                        <button onClick={togglePassword} style={loginStyles.eyeBtn} tabIndex={-1}>
                            {showPassword ?
                                <EyeOffIcon /> : <EyeIcon />
                            }
                        </button>
                    </div>
                </div>

                {/* Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{ ...loginStyles.btn, opacity: loading ? 0.75 : 1 }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.background = '#2f4bbf')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.background = '#3b5bdb')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>

                <p style={loginStyles.footer}>
                    Chưa có tài khoản?{' '}
                    <Link href="/register" style={loginStyles.link}>Tạo tài khoản</Link>
                </p>

            </div>
        </div>
    );
}