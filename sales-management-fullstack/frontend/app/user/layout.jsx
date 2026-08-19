"use client";

import UserSidebar from "../components/layout/UserSidebar";

export default function UserLayout({ children }) {
    const user = {
        role: "USER",
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <UserSidebar user={user} />

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