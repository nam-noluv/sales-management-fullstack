const AVATAR_COLORS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed'];

export function getInitial(name) {
    return name?.charAt(0)?.toUpperCase() || '?';
}

export function getAvatarColor(name) {
    return AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];
}

export function filterCustomers(customers, search) {
    const term = search.toLowerCase();
    return customers.filter(c =>
        c.name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.phone?.includes(search)
    );
}