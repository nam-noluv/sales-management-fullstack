" use client";

import { useState, useEffect, useCallback } from "react";
import {
    fetchMyOrders,
    fetchAllOrders,
    fetchCustomersList,
    fetchProductsList,
} from "../services/orderService";

export function useOrders(user) {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const isAdmin = user?.role === "ADMIN";

    const reload = useCallback(async () => {
        setLoading(true);
        try {
            const data = isAdmin ? await fetchAllOrders() : await fetchMyOrders();
            setOrders(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        if (!user) return; // đợi đọc xong user từ localStorage
        let isMounted = true;

        const loadInitialData = async () => {
            setLoading(true);
            try {
                if (isAdmin) {
                    const [ordersData, customersData, productsData] = await Promise.all([
                        fetchAllOrders(),
                        fetchCustomersList(),
                        fetchProductsList(),
                    ]);
                    if (!isMounted) return;
                    setOrders(ordersData);
                    setCustomers(customersData);
                    setProducts(productsData);
                } else {
                    const [ordersData, productsData] = await Promise.all([
                        fetchMyOrders(),
                        fetchProductsList(),
                    ]);
                    if (!isMounted) return;
                    setOrders(ordersData);
                    setProducts(productsData);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        void loadInitialData();
        return () => { isMounted = false; };
    }, [user, isAdmin]);

    return { orders, customers, products, loading, reload, isAdmin };
}