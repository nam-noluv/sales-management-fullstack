"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarStyles = {
    sidebar: { width: '220px', background: '#2563eb', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', top: 0, left: 0, bottom: 0 },
    sidebarLogo: { display: 'flex', alignItems: 'center', gap: '10px', padding: '24px 20px 20px' },
    sidebarLogoText: { color: '#fff', fontSize: '16px', fontWeight: '700' },
    nav: { flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px' },
    navItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
    navItemActive: { background: 'rgba(255,255,255,0.2)' },
    sidebarUser: { padding: '20px', borderTop: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '12px' },
    avatarCircle: { width: '42px', height: '42px', borderRadius: '50%', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', flexShrink: 0 },
    userEmail: { fontSize: '14px', color: '#f8fafc', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    userRole: { fontSize: '12px', color: '#a5b4fc' },
};

function getNavItems(user) {
    const isAdmin = user?.role === 'ADMIN';
    return [
        {
            label: 'Dashboard', path: '/dashboard',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
        },
        {
            label: 'Products', path: '/products',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
        },
        // Customers chỉ hiện với ADMIN
        ...(isAdmin ? [{
            label: 'Customers', path: '/customers',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        }] : []),
        {
            // ADMIN xem tất cả đơn (/orders), user thường chỉ xem đơn của mình (/my-orders)
            label: 'Orders', path: isAdmin ? '/orders' : '/my-orders',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
        },
    ];
}

export default function Sidebar({ user }) {
    const pathname = usePathname();
    const navItems = getNavItems(user);

    return (
        <aside style={sidebarStyles.sidebar}>
            <div style={sidebarStyles.sidebarLogo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-8" />
                </svg>
                <span style={sidebarStyles.sidebarLogoText}>Sales Manager</span>
            </div>

            <nav style={sidebarStyles.nav}>
                {navItems.map(item => {
                    const isActive = pathname?.startsWith(item.path);
                    return (
                        <Link key={item.label} href={item.path} style={{ ...sidebarStyles.navItem, ...(isActive ? sidebarStyles.navItemActive : {}) }}>
                            <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User info — chỉ hiện khi đã có user (vd trong trang dashboard) */}
            {user && (
                <div style={sidebarStyles.sidebarUser}>
                    <div style={sidebarStyles.avatarCircle}>
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={sidebarStyles.userEmail}>{user?.email}</div>
                        <div style={sidebarStyles.userRole}>{user?.role}</div>
                    </div>
                </div>
            )}
        </aside>
    );
}