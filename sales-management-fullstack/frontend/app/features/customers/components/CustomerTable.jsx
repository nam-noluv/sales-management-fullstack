"use client";

import customerStyles from "../styles";
import { getInitial, getAvatarColor } from "../utils/customerHelpers";

const COLUMNS = ['Khách hàng', 'Số điện thoại', 'Email', 'Địa chỉ', 'Thao tác'];

export default function CustomerTable({ customers, onEdit, onDelete }) {
    return (
        <div style={customerStyles.tableCard}>
            <table style={customerStyles.table}>
                <thead>
                    <tr>
                        {COLUMNS.map(h => <th key={h} style={customerStyles.th}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr><td colSpan={5} style={customerStyles.emptyCell}>Không tìm thấy khách hàng</td></tr>
                    ) : customers.map(c => (
                        <CustomerRow key={c.id} customer={c} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function CustomerRow({ customer, onEdit, onDelete }) {
    return (
        <tr style={customerStyles.tr}
            onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td style={customerStyles.td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ ...customerStyles.avatar, background: getAvatarColor(customer.name) }}>
                        {getInitial(customer.name)}
                    </div>
                    <span style={customerStyles.customerName}>{customer.name}</span>
                </div>
            </td>
            <td style={customerStyles.td}>{customer.phone || '—'}</td>
            <td style={{ ...customerStyles.td, color: '#60a5fa' }}>{customer.email}</td>
            <td style={{ ...customerStyles.td, color: '#6b7280', maxWidth: '160px' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {customer.address || '—'}
                </div>
            </td>
            <td style={customerStyles.td}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onEdit(customer)} style={customerStyles.editBtn}
                        onMouseEnter={e => e.currentTarget.style.background = '#1e3a5f'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Sửa
                    </button>
                    <button onClick={() => onDelete(customer.id)} style={customerStyles.deleteBtn}
                        onMouseEnter={e => e.currentTarget.style.background = '#3b0a0a'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                        </svg>
                        Xóa
                    </button>
                </div>
            </td>
        </tr>
    );
}