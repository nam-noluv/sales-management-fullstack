"use client";

import Modal from "./Modal";

const styles = {
    iconWrap: { width: '48px', height: '48px', borderRadius: '50%', background: '#631717', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
    title: { color: '#f9fafb', fontSize: '16px', fontWeight: '600', marginBottom: '8px' },
    desc: { color: '#6b7280', fontSize: '13px' },
    cancelBtn: { flex: 1, padding: '10px', background: 'transparent', border: '1px solid #374151', borderRadius: '8px', color: '#d1d5db', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' },
    confirmBtn: { flex: 1, padding: '10px', background: '#dc2626', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' },
};

export default function ConfirmDialog({ title = 'Xác nhận xóa?', description = 'Hành động này không thể hoàn tác.', onCancel, onConfirm }) {
    return (
        <Modal onClose={onCancel} maxWidth="320px">
            <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
                <div style={styles.iconWrap}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                </div>
                <h3 style={styles.title}>{title}</h3>
                <p style={styles.desc}>{description}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={onCancel} style={styles.cancelBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#374151'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    Hủy
                </button>
                <button onClick={onConfirm} style={styles.confirmBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#b91c1c'}
                    onMouseLeave={e => e.currentTarget.style.background = '#dc2626'}>
                    Xóa
                </button>
            </div>
        </Modal>
    );
}