"use client";

import orderStyles from "../styles";
import { getStatusStyle } from "../utils/orderHelpers";

const COLUMNS = ['ID', 'Khách hàng', 'Sản phẩm', 'Tổng tiền', 'Trạng thái', 'Thao tác'];

export default function OrderTable({ orders, loading, canManage, onEdit, onDelete }) {
    return (
        <div style={orderStyles.tableCard}>
            <table style={orderStyles.table}>
                <thead>
                    <tr>{COLUMNS.map(h => <th key={h} style={orderStyles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={6} style={orderStyles.emptyCell}>Đang tải...</td></tr>
                    ) : orders.length === 0 ? (
                        <tr><td colSpan={6} style={orderStyles.emptyCell}>Không có đơn hàng nào</td></tr>
                    ) : orders.map(order => (
                        <OrderRow key={order.id} order={order} canManage={canManage} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function OrderRow({ order, canManage, onEdit, onDelete }) {
    const st = getStatusStyle(order.status);
    return (
        <tr style={orderStyles.tr}
            onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td style={{ ...orderStyles.td, color: '#6b7280', fontSize: '12px' }}>#{order.id}</td>
            <td style={orderStyles.td}>
                <div style={{ fontWeight: '600', color: '#fff' }}>{order.customer?.name}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af' }}>Khách: {order.customer?.email}</div>
                <div style={{ fontSize: '11px', color: '#60a5fa' }}>Admin: {order.user?.email}</div>
            </td>
            <td style={orderStyles.td}>
                {order.items?.map(item => (
                    <div key={item.id} style={{ fontSize: '12px', color: '#d1d5db' }}>
                        {item.product?.name}
                        <span style={{ color: '#6b7280' }}> x{item.quantity}</span>
                    </div>
                ))}
            </td>
            <td style={orderStyles.td}>
                <span style={{ color: '#60a5fa', fontWeight: '500' }}>{Number(order.total).toLocaleString()} ₫</span>
            </td>
            <td style={orderStyles.td}>
                <span style={{ ...orderStyles.badge, background: st.bg, color: st.color }}>{st.label}</span>
            </td>
            <td style={orderStyles.td}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {canManage && (
                        <button onClick={() => onEdit(order)} style={orderStyles.editBtn}
                            onMouseEnter={e => e.currentTarget.style.background = '#1e3a5f'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Sửa
                        </button>
                    )}
                    {canManage && (
                        <button onClick={() => onDelete(order.id)} style={orderStyles.deleteBtn}
                            onMouseEnter={e => e.currentTarget.style.background = '#3b0a0a'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                            </svg>
                            Xóa
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}