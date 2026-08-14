"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCustomers } from "../services/customerServices";

export function useCustomers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);
        const data = await fetchCustomers();
        setCustomers(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            const data = await fetchCustomers();
            if (isMounted) {
                setCustomers(data);
                setLoading(false);
            }
        })();

        return () => { isMounted = false; };
    }, []);

    return { customers, setCustomers, loading, reload };
}