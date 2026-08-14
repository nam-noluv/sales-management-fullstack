"use client";

import { useState, useEffect } from "react";
import { fetchDashboardStats, fetchTopProducts } from "../services/dashboardService";


export function useDashboardData() {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            const [statsResult, topProductsResult] = await Promise.allSettled([
                fetchDashboardStats(),
                fetchTopProducts(),
            ]);

            if (!isMounted) return;

            if (statsResult.status === 'fulfilled') {
                setStats(statsResult.value);
                setRecentOrders(statsResult.value.recentOrders || []);
            } else {
                console.error(statsResult.reason);
            }

            if (topProductsResult.status === 'fulfilled') {
                setTopProducts(topProductsResult.value);
            } else {
                console.error(topProductsResult.reason);
            }

            setLoading(false);
        };

        void load();
        return () => { isMounted = false; };
    }, []);

    return { stats, recentOrders, topProducts, loading };
}