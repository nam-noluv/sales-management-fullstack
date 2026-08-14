export const STATUS_MAP = {
    PENDING: { bg: '#451a03', color: '#fbbf24', label: 'Chờ xử lý' },
    PROCESSING: { bg: '#1e3a5f', color: '#60a5fa', label: 'Đang xử lý' },
    COMPLETED: { bg: '#064e3b', color: '#34d399', label: 'Hoàn thành' },
    CANCELLED: { bg: '#3b0a0a', color: '#f87171', label: 'Đã hủy' },
};

export function getStatusStyle(status) {
    return STATUS_MAP[status] || STATUS_MAP[status?.toUpperCase()] || { bg: '#1f2937', color: '#9ca3af', label: status };
}

export function filterOrders(orders, search) {
    if (!Array.isArray(orders)) return [];
    const term = search.toLowerCase();
    return orders.filter(o =>
        o.customer?.name?.toLowerCase().includes(term) ||
        o.status?.toLowerCase().includes(term) ||
        String(o.id).includes(search)
    );
}