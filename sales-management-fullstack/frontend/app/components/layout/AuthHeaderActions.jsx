"use client";

import Link from "next/link";

const styles = {
    wrap: { display: 'flex', gap: '8px', alignItems: 'center' },
    btn: {
        border: 'none',
        borderRadius: '8px',
        padding: '10px 16px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.15s',
        textDecoration: 'none',
        display: 'inline-block',
        color: '#fff',
    },
    logout: { background: '#dc2626' },
    login: { background: '#3b5bdb' },
    register: { background: '#495057' },
};

// user: object user hiện tại (null nếu chưa đăng nhập)
// onLogout: hàm logout lấy từ useAuth()
export default function AuthHeaderActions({ user, onLogout }) {
    if (user) {
        return (
            <button
                onClick={onLogout}
                style={{ ...styles.btn, ...styles.logout }}
                onMouseEnter={e => (e.currentTarget.style.background = '#7f1d1d')}
                onMouseLeave={e => (e.currentTarget.style.background = '#dc2626')}
            >
                Thoát đăng nhập
            </button>
        );
    }

    return (
        <div style={styles.wrap}>
            <Link
                href="/login"
                style={{ ...styles.btn, ...styles.login }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2f4bbf')}
                onMouseLeave={e => (e.currentTarget.style.background = '#3b5bdb')}
            >
                Đăng nhập
            </Link>
            <Link
                href="/register"
                style={{ ...styles.btn, ...styles.register }}
                onMouseEnter={e => (e.currentTarget.style.background = '#343a40')}
                onMouseLeave={e => (e.currentTarget.style.background = '#495057')}
            >
                Đăng ký
            </Link>
        </div>
    );
}