"use client";

import dashboardStyles from "../styles";
import { statusStyle } from "../utils/dashboardHelpers";

const COLUMNS = ['Khách hàng', 'Sản phẩm', 'Tổng tiền', 'Trạng thái'];

export default function RecentOrdersTable({ orders }) {
    return (
        <div style={dashboardStyles.tableCard}>
            <h2 style={dashboardStyles.tableTitle}>Đơn hàng gần đây</h2>
            <table style={dashboardStyles.table}>
                <thead>
                    <tr>{COLUMNS.map(h => <th key={h} style={dashboardStyles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ ...dashboardStyles.td, textAlign: 'center', color: '#4b5563', padding: '32px' }}>
                                Chưa có đơn hàng nào
                            </td>
                        </tr>
                    ) : orders.map((order, i) => {
                        const st = statusStyle(order.status.toUpperCase());
                        return (
                            <tr key={order.id || i} style={dashboardStyles.tr}
                                onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <td style={dashboardStyles.td}>{order.customer?.email || '—'}</td>
                                <td style={dashboardStyles.td}>{order.items?.[0]?.product?.name || '—'}</td>
                                <td style={dashboardStyles.td}>{order.total?.toLocaleString() || '—'} ₫</td>
                                <td style={dashboardStyles.td}>
                                    <span style={{ ...dashboardStyles.badge, background: st.bg, color: st.color }}>
                                        {st.label}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}