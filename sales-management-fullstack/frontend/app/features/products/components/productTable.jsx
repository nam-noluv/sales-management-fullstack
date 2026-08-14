"use client";

import productStyles from "../styles";
import { getQtyStyle } from "../utils/productHelpers";

const COLUMNS = ['Tên sản phẩm', 'Mô tả', 'Giá', 'Số lượng', 'Thao tác'];

export default function ProductTable({ products, loading, isAdmin, onEdit, onDelete }) {
    return (
        <div style={productStyles.tableCard}>
            <table style={productStyles.table}>
                <thead>
                    <tr>{COLUMNS.map(h => <th key={h} style={productStyles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={5} style={productStyles.emptyCell}>Đang tải...</td></tr>
                    ) : products.length === 0 ? (
                        <tr><td colSpan={5} style={productStyles.emptyCell}>Không có sản phẩm nào</td></tr>
                    ) : products.map(item => (
                        <ProductRow key={item.id} item={item} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ProductRow({ item, isAdmin, onEdit, onDelete }) {
    return (
        <tr style={productStyles.tr}
            onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td style={productStyles.td}>
                <div style={productStyles.productName}>{item.name}</div>
            </td>
            <td style={{ ...productStyles.td, color: '#6b7280', maxWidth: '200px' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description || '—'}
                </div>
            </td>
            <td style={productStyles.td}>
                <span style={productStyles.priceTag}>{Number(item.price).toLocaleString()} ₫</span>
            </td>
            <td style={productStyles.td}>
                <span style={{ ...productStyles.qtyBadge, ...productStyles[getQtyStyle(item.quantity)] }}>
                    {item.quantity}
                </span>
            </td>
            <td style={productStyles.td}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {isAdmin ? (
                        <>
                            <button onClick={() => onEdit(item)} style={productStyles.editBtn}
                                onMouseEnter={e => e.currentTarget.style.background = '#1e3a5f'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Sửa
                            </button>
                            <button onClick={() => onDelete(item.id)} style={productStyles.deleteBtn}
                                onMouseEnter={e => e.currentTarget.style.background = '#3b0a0a'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                    <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                                </svg>
                                Xóa
                            </button>
                        </>
                    ) : (
                        <span style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic' }}>Chỉ xem</span>
                    )}
                </div>
            </td>
        </tr>
    );
}