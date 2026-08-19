"use client";

import Sidebar from "../../../components/layout/sidebar";
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
            <Sidebar user={user} />

            <main style={dashboardStyles.main}>
                <header style={dashboardStyles.header}>
                    <div>
                        <h1 style={dashboardStyles.pageTitle}>Trang chủ</h1>
                        <p style={dashboardStyles.pageSubtitle}>Xin chào, {user?.email}</p>
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