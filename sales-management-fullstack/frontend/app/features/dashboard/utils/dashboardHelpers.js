export function statusStyle(status) {
    const map = {
        PENDING: { bg: '#451a03', color: '#fbbf24', label: 'Chờ xử lý' },
        PROCESSING: { bg: '#1e3a5f', color: '#60a5fa', label: 'Đang xử lý' },
        COMPLETED: { bg: '#064e3b', color: '#34d399', label: 'Hoàn thành' },
        CANCELLED: { bg: '#3b0a0a', color: '#f87171', label: 'Đã hủy' },
    };
    return map[status] || { bg: '#1f2937', color: '#9ca3af', label: status };
}

export function buildStatCards(stats) {
    return [
        {
            label: 'SẢN PHẨM', value: stats?.totalProducts ?? 0,
            sub: '↑ Cập nhật mới nhất', subColor: '#a78bfa', iconBg: '#4c1d95',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
        },
        {
            label: 'KHÁCH HÀNG', value: stats?.totalCustomers ?? 0,
            sub: '↑ Đang tăng trưởng', subColor: '#34d399', iconBg: '#064e3b',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        },
        {
            label: 'ĐƠN HÀNG', value: stats?.totalOrders ?? 0,
            sub: '→ Đang xử lý', subColor: '#fbbf24', iconBg: '#451a03',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
        },
        {
            label: 'DOANH THU', value: stats?.revenue ? stats.revenue.toLocaleString() + ' ₫' : '0 ₫',
            sub: '↑ Tổng doanh thu', subColor: '#60a5fa', iconBg: '#1e3a5f',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
        },
    ];
}