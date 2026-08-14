"use client";

import Modal from "../../../components/ui/Modal";
import orderStyles from "../styles";
import { STATUS_MAP } from "../utils/orderHelpers";

const STATUS_OPTIONS = [
    { value: 'PENDING', ...STATUS_MAP.PENDING },
    { value: 'PROCESSING', ...STATUS_MAP.PROCESSING },
    { value: 'COMPLETED', ...STATUS_MAP.COMPLETED },
    { value: 'CANCELLED', ...STATUS_MAP.CANCELLED },
];

export default function EditOrderModal({
    isAdmin, editingId, products,
    editProductId, setEditProductId,
    editQuantity, setEditQuantity,
    status, setStatus,
    onClose, onSubmit,
}) {
    return (
        <Modal onClose={onClose}>
            <div style={orderStyles.modalHeader}>
                <h2 style={orderStyles.modalTitle}>Sửa đơn hàng #{editingId}</h2>
                <button onClick={onClose} style={orderStyles.closeBtn}>✕</button>
            </div>

            <div style={orderStyles.field}>
                <label style={orderStyles.label}>SẢN PHẨM</label>
                <div style={{ padding: '10px 12px', background: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '13px', color: '#6b7280' }}>
                    <select value={editProductId} onChange={e => setEditProductId(e.target.value)} style={orderStyles.selectInput}>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={orderStyles.field}>
                <label style={orderStyles.label}>SỐ LƯỢNG</label>
                <div style={{ padding: '10px 12px', background: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '13px', color: '#6b7280' }}>
                    <input
                        type="number" min="1" value={editQuantity}
                        onChange={e => setEditQuantity(e.target.value)}
                        style={orderStyles.selectInput}
                    />
                </div>
            </div>

            {isAdmin && (
                <div style={orderStyles.field}>
                    <label style={orderStyles.label}>TRẠNG THÁI</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {STATUS_OPTIONS.map(opt => (
                            <button key={opt.value} onClick={() => setStatus(opt.value)}
                                style={{
                                    padding: '9px 14px', borderRadius: '8px', border: '1.5px solid',
                                    borderColor: status === opt.value ? opt.color : '#374151',
                                    background: status === opt.value ? opt.bg : 'transparent',
                                    color: status === opt.value ? opt.color : '#6b7280',
                                    fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                                    textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.15s',
                                }}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button onClick={onClose} style={orderStyles.cancelBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#374151'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Hủy</button>
                <button onClick={onSubmit} style={orderStyles.submitBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>Lưu</button>
            </div>
        </Modal>
    );
}