"use client";

import Modal from "../../../components/ui/Modal";
import productStyles from "../styles";

const FIELDS = [
    { key: 'name', label: 'TÊN SẢN PHẨM', placeholder: 'Nhập tên sản phẩm', type: 'text' },
    { key: 'description', label: 'MÔ TẢ', placeholder: 'Nhập mô tả', type: 'text' },
    { key: 'price', label: 'GIÁ (₫)', placeholder: 'Nhập giá', type: 'number' },
    { key: 'quantity', label: 'SỐ LƯỢNG', placeholder: 'Nhập số lượng', type: 'number' },
];

export default function ProductModal({ form, setField, editingId, onClose, onSubmit }) {
    return (
        <Modal onClose={onClose}>
            <div style={productStyles.modalHeader}>
                <h2 style={productStyles.modalTitle}>{editingId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</h2>
                <button onClick={onClose} style={productStyles.closeBtn}>✕</button>
            </div>

            {FIELDS.map(f => (
                <div key={f.key} style={productStyles.field}>
                    <label style={productStyles.label}>{f.label}</label>
                    <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setField(f.key)(e.target.value)}
                        style={productStyles.input}
                        onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#1f2937'; }}
                        onBlur={e => { e.target.style.borderColor = '#374151'; e.target.style.background = '#111827'; }}
                    />
                </div>
            ))}

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={onClose} style={productStyles.cancelBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#374151'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    Hủy
                </button>
                <button onClick={onSubmit} style={productStyles.submitBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
                    {editingId ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
            </div>
        </Modal>
    );
}