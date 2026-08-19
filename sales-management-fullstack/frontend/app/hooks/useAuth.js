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
            const res = await fetchWithToken('/auth/profile');
            if (!res.ok && res.status === 401) {
                localStorage.removeItem('token');
                if (!token) { setUser(null); return; }
                if (!res.ok) { localStorage.removeItem('token'); setUser(null); return; }
            }
            const data = await res.json();
            setUser(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingUser(false);
        }
    }, [router]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchProfile();
    }, [fetchProfile]);

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return { user, loadingUser, logout, refetchProfile: fetchProfile };
}