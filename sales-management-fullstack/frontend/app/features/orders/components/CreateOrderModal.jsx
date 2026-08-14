"use client";

import Modal from "../../../components/ui/Modal";
import orderStyles from "../styles";

export default function CreateOrderModal({
    isAdmin, customers, products,
    customerId, setCustomerId,
    productId, setProductId,
    quantity, setQuantity,
    onClose, onSubmit,
}) {
    return (
        <Modal onClose={onClose}>
            <div style={orderStyles.modalHeader}>
                <h2 style={orderStyles.modalTitle}>Tạo đơn hàng</h2>
                <button onClick={onClose} style={orderStyles.closeBtn}>✕</button>
            </div>

            {isAdmin && (
                <div style={orderStyles.field}>
                    <label style={orderStyles.label}>KHÁCH HÀNG</label>
                    <select value={customerId} onChange={e => setCustomerId(e.target.value)} style={orderStyles.selectInput}>
                        <option value="">Chọn khách hàng</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            )}

            <div style={orderStyles.field}>
                <label style={orderStyles.label}>SẢN PHẨM</label>
                <select value={productId} onChange={e => setProductId(e.target.value)} style={orderStyles.selectInput}>
                    <option value="">Chọn sản phẩm</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — {Number(p.price).toLocaleString()} ₫</option>
                    ))}
                </select>
            </div>

            <div style={orderStyles.field}>
                <label style={orderStyles.label}>SỐ LƯỢNG</label>
                <input
                    type="number" min={1} value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    style={orderStyles.selectInput}
                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#1f2937'; }}
                    onBlur={e => { e.target.style.borderColor = '#374151'; e.target.style.background = '#111827'; }}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={onClose} style={orderStyles.cancelBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#374151'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>Hủy</button>
                <button onClick={onSubmit} style={orderStyles.submitBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                    onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>Tạo đơn hàng</button>
            </div>
        </Modal>
    );
}