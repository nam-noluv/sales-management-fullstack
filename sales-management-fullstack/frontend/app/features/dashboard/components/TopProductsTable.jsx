"use client";

import dashboardStyles from "../styles";

const COLUMNS = ['Sản phẩm', 'Mô tả', 'Giá', 'Tồn kho'];

export default function TopProductsTable({ products }) {
    return (
        <div style={dashboardStyles.tableCard}>
            <h2 style={dashboardStyles.tableTitle}>Sản phẩm bán chạy</h2>
            <table style={dashboardStyles.table}>
                <thead>
                    <tr>{COLUMNS.map(h => <th key={h} style={dashboardStyles.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ ...dashboardStyles.td, textAlign: 'center', color: '#4b5563', padding: '32px' }}>
                                Chưa có sản phẩm nào
                            </td>
                        </tr>
                    ) : products.map((p, i) => (
                        <tr key={p.id || i} style={dashboardStyles.tr}
                            onMouseEnter={e => e.currentTarget.style.background = '#1f2937'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <td style={dashboardStyles.td}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#1e3a5f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#60a5fa', fontWeight: '700' }}>
                                        {i + 1}
                                    </div>
                                    <span style={{ fontWeight: '500', color: '#f9fafb' }}>{p.name}</span>
                                </div>
                            </td>
                            <td style={{ ...dashboardStyles.td, color: '#6b7280', maxWidth: '180px' }}>
                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description || '—'}</div>
                            </td>
                            <td style={dashboardStyles.td}>
                                <span style={{ color: '#60a5fa', fontWeight: '500' }}>{Number(p.price).toLocaleString()} ₫</span>
                            </td>
                            <td style={dashboardStyles.td}>
                                <span style={{
                                    display: 'inline-block', padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                                    background: p.quantity === 0 ? '#3b0a0a' : p.quantity < 10 ? '#451a03' : '#064e3b',
                                    color: p.quantity === 0 ? '#f87171' : p.quantity < 10 ? '#fbbf24' : '#34d399',
                                }}>
                                    {p.quantity}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}