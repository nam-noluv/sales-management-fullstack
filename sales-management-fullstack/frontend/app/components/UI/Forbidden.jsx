"use client";

import Link from "next/link";

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        background: '#111827',
        color: '#f9fafb',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        textAlign: 'center',
        padding: '24px',
    },
    code: { fontSize: '64px', fontWeight: '800', color: '#dc2626', margin: 0 },
    title: { fontSize: '20px', fontWeight: '600', margin: 0 },
    desc: { fontSize: '14px', color: '#9ca3af', maxWidth: '360px' },
    link: {
        marginTop: '8px',
        background: '#3b5bdb',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
    },
};

export default function Forbidden({ message, backHref = "/" }) {
    return (
        <div style={styles.page}>
            <p style={styles.code}>403</p>
            <h1 style={styles.title}>Bạn không có quyền truy cập vào trang này</h1>
            <p style={styles.desc}>
                {message || 'Xin lỗi, bạn không có quyền truy cập vào trang này.'}
            </p>
            <Link href={backHref} style={styles.link}>Quay lại trang chủ</Link>
        </div>
    );
}
