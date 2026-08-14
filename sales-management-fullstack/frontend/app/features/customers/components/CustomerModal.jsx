"use client";

import Modal from "../../../components/UI/Modal";
import customerStyles from "../styles";

const FIELDS = [
    { key: 'name', label: 'TÊN KHÁCH HÀNG', placeholder: 'Nhập tên', type: 'text' },
    { key: 'phone', label: 'SỐ ĐIỆN THOẠI', placeholder: 'Nhập số điện thoại', type: 'text' },
    { key: 'email', label: 'EMAIL', placeholder: 'Nhập email', type: 'email' },
    { key: 'address', label: 'ĐỊA CHỈ', placeholder: 'Nhập địa chỉ', type: 'text' },
];

export default function CustomerModal({ form, setField, editingId, onClose, onSubmit }) {
    return (
        <Modal onClose={onClose}>
            <div style={customerStyles.modalHeader}>
                <h2 style={customerStyles.modalTitle}>{editingId ? 'Cập nhật khách hàng' : 'Thêm khách hàng'}</h2>
                <button onClick={onClose} style={customerStyles.closeBtn}>✕</button>
            </div>
            {FIELDS.map(f => (
                <div key={f.key} style={customerStyles.field}>
                    <label style={customerStyles.label}>{f.label}</label>
                    <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setField(f.key)(e.target.value)}
                        style={customerStyles.input}
                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#1f2937'; }}
                        onBlur={e => { e.target.style.borderColor = '#374151'; e.target.style.background = '#111827'; }}
                    />
                </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={onClose} style={customerStyles.cancelBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#374151'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    Hủy
                </button>
                <button onClick={onSubmit} style={customerStyles.submitBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#7efc17'}
                    onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
                    {editingId ? 'Cập nhật' : 'Thêm khách hàng'}
                </button>
            </div>
        </Modal>
    );
}