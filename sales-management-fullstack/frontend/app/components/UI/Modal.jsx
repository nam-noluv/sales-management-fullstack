"use client";

const styles = {
    overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
    modal: { background: '#1f2937', borderRadius: '14px', padding: '24px', width: '100%', maxWidth: '400px', border: '1px solid #374151' },
};

export default function Modal({ onClose, maxWidth = '400px', children }) {
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={{ ...styles.modal, maxWidth }} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}