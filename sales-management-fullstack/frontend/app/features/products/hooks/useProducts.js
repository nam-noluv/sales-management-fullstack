"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";

export function useProducts(initialProducts) {
    const [products, setProducts] = useState(Array.isArray(initialProducts) ? initialProducts : []);
    const [loading, setLoading] = useState(false);

    const reload = async () => {
        setLoading(true);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts();
                if (isMounted) setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        void load();
        return () => { isMounted = false; };
    }, []);

    return { products, setProducts, loading, reload };
}