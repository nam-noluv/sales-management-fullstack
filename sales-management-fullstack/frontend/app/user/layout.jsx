"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Forbidden from "../components/UI/Forbidden";

export default function UserLayout({ children }) {
    const pathname = usePathname();
    const { user, loadingUser } = useAuth();

    if (loadingUser) {
        return null;
    }

    const isLoginPage = pathname === '/user';
    if (isLoginPage) {
        // trang đăng nhập của user
        // Nhưng admin đã đăng nhập thì không được đứng ở đây
        if (user?.role === 'ADMIN') {
            return (<Forbidden
                message="Bạn không có quyền truy cập vào trang này."
                backHref="/"
            />
            );
        }
        return <>{children}</>;
    }

    // Các trang con: /user/dashboard, /user/my-orders, /user/products...
    // bắt buộc phải đăng nhập bằng tài khoản CUSTOMER
    if (!user || user.role !== 'CUSTOMER') {
        return (
            <Forbidden
                message="Bạn cần đăng nhập bằng tài khoản người dùng để xem trang này."
                backHref="/user"
            />
        );
    }

    return <>{children}</>;
}