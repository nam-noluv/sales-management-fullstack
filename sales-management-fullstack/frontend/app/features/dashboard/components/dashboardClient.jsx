"use client";

import RoleSidebar from "../../../components/layout/RoleSidebar";
import { useAuth } from "../../../hooks/useAuth";
import { useDashboardData } from "../hooks/useDashboardData";
import StatCards from "./StatCards";
import RecentOrdersTable from "./RecentOrdersTable";
import TopProductsTable from "./TopProductsTable";
import dashboardStyles from "../styles";
import AuthHeaderActions from "../../../components/layout/AuthHeaderActions";

export default function DashboardClient() {
    const { user, logout } = useAuth();
    const { stats, recentOrders, topProducts } = useDashboardData();

    const isAdmin = user?.role === 'ADMIN';

    return (
        <div style={dashboardStyles.page}>
            <RoleSidebar user={user} />

            <main style={{ ...dashboardStyles.main, marginLeft: user ? '220px' : 0 }}>
                <header style={dashboardStyles.header}>
                    <div>
                        <h1 style={dashboardStyles.pageTitle}>Trang chủ</h1>
                        <p style={dashboardStyles.pageSubtitle}>
                            {user ? `Xin chào, ${user.email}` : 'Bạn đang xem ở chế độ khách'}
                        </p>
                    </div>
                    <AuthHeaderActions user={user} onLogout={logout} />
                </header>

                <StatCards stats={stats} isAdmin={isAdmin} />

                {isAdmin ? (
                    <RecentOrdersTable orders={recentOrders} />
                ) : (
                    <TopProductsTable products={topProducts} />
                )}
            </main>
        </div>
    );
}