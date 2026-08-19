"use client";

import AdminSidebar from "../components/layout/AdminSidebar";

export default function AdminLayout({ children }) {
    // Tạm thời lấy user ở đây
    // Sau này có thể lấy từ context/session
    const user = {
        email: "admin@example.com",
        role: "ADMIN",
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <AdminSidebar user={user} />

            <main
                style={{
                    marginLeft: "220px",
                    minHeight: "100vh",
                }}
            >
                {children}
            </main>
        </div>
    );
}