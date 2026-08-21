"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchWithToken } from "../lib/fetchWithToken";


export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const fetchProfile = useCallback(async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (!token) {
                setUser(null);
                return;
            }

            const res = await fetchWithToken('/auth/profile');
            if (!res.ok) {
                // token sai/hết hạn -> xoá token, coi như khách, KHÔNG redirect
                localStorage.removeItem('token');
                setUser(null);
                return;
            }
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error(err);
            setUser(null);
        } finally {
            setLoadingUser(false);
        }
    }, []);

    useEffect(() => {
        const task = Promise.resolve().then(fetchProfile);
        return () => { void task; };
    }, [fetchProfile]);

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return { user, loadingUser, logout, refetchProfile: fetchProfile };
}