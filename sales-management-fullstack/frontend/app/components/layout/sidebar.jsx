"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarStyles = {
    sidebar: {
        width: "220px",
        background: "#2563eb",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
    },

    sidebarLogo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "24px 20px 20px",
    },

    sidebarLogoText: {
        color: "#fff",
        fontSize: "16px",
        fontWeight: "700",
    },

    nav: {
        flex: 1,
        padding: "8px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },

    navItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "8px",
        color: "#fff",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
    },

    navItemActive: {
        background: "rgba(255,255,255,0.2)",
    },

    sidebarUser: {
        padding: "20px",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },

    avatarCircle: {
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "#1e40af",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "700",
        flexShrink: 0,
    },

    userInfo: {
        minWidth: 0,
    },

    userEmail: {
        fontSize: "14px",
        color: "#f8fafc",
        fontWeight: "600",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },

    userRole: {
        fontSize: "12px",
        color: "#a5b4fc",
    },
};

function getNavItems(user) {
    const isAdmin = user?.role === "ADMIN";

    return [
        {
            label: "Dashboard",
            path: "/dashboard",
        },

        {
            label: "Products",
            path: "/products",
        },

        ...(isAdmin
            ? [
                {
                    label: "Customers",
                    path: "/customers",
                },
            ]
            : []),

        {
            label: "Orders",
            path: isAdmin ? "/orders" : "/my-orders",
        },
    ];
}

export default function Sidebar({ user }) {
    const pathname = usePathname();

    const navItems = getNavItems(user);

    return (
        <aside style={sidebarStyles.sidebar}>
            {/* Logo */}
            <div style={sidebarStyles.sidebarLogo}>
                <div style={sidebarStyles.sidebarLogoText}>
                    Sales Manager
                </div>
            </div>

            {/* Navigation */}
            <nav style={sidebarStyles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            style={{
                                ...sidebarStyles.navItem,
                                ...(isActive
                                    ? sidebarStyles.navItemActive
                                    : {}),
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User */}
            {user && (
                <div style={sidebarStyles.sidebarUser}>
                    <div style={sidebarStyles.avatarCircle}>
                        {(user.email?.[0] || "U").toUpperCase()}
                    </div>

                    <div style={sidebarStyles.userInfo}>
                        <div style={sidebarStyles.userEmail}>
                            {user.email}
                        </div>

                        <div style={sidebarStyles.userRole}>
                            {user.role}
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}