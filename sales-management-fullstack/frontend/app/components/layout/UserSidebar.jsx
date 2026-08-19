"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserSidebar({ user }) {
    const pathname = usePathname();

    const navItems = [
        {
            label: "Dashboard",
            path: "/user/dashboard",
        },
        {
            label: "Products",
            path: "/user/products",
        },
        {
            label: "My Orders",
            path: "/user/my-orders",
        },
    ];

    return (
        <aside
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "220px",
                height: "100vh",
                background: "#ffffff",
                borderRight: "1px solid #e5e7eb",
                padding: "20px",
                boxSizing: "border-box",
                zIndex: 100,
            }}
        >
            {/* Logo */}
            <div
                style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "30px",
                }}
            >
                Sales Manager
            </div>

            {/* Menu */}
            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            style={{
                                display: "block",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                textDecoration: "none",
                                color: isActive ? "#ffffff" : "#374151",
                                background: isActive
                                    ? "#111827"
                                    : "transparent",
                                fontWeight: isActive ? "600" : "400",
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User information */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    paddingTop: "15px",
                    borderTop: "1px solid #e5e7eb",
                }}
            >
                <div
                    style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "4px",
                        wordBreak: "break-word",
                    }}
                >
                    {user?.email || "User"}
                </div>

                <div
                    style={{
                        fontSize: "12px",
                        color: "#6b7280",
                    }}
                >
                    {user?.role || "USER"}
                </div>
            </div>
        </aside>
    );
}