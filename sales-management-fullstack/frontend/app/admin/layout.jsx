"use client";

import { useAuth } from "../hooks/useAuth";
import Forbidden from "../components/UI/Forbidden";

export default function AdminLayout({ children }) {
    const { user, loadingUser } = useAuth();

    // Đang chờ xác thực
    if (loadingUser) {
        return null;
    }

    // Chưa đăng nhập hoặc không phải admin -> chặn
    if (!user || user.role !== 'ADMIN') {
        return <Forbidden
            message="Bạn không có quyền truy cập vào trang này."
            backHref="/"
        />;
    }

    return <>{children}</>;
}