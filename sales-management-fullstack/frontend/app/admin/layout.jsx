"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Forbidden from "../components/UI/Forbidden";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { user, loadingUser } = useAuth();

    // Đang chờ xác thực -> chưa vội kết luận, tránh nháy 403 sai
    if (loadingUser) {
        return null; // có thể thay bằng spinner nếu muốn
    }

    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        // Trang đăng nhập admin: ai cũng vào được (kể cả khách),
        // chỉ chặn nếu đang đăng nhập bằng tài khoản CUSTOMER
        if (user?.role === 'CUSTOMER') {
            return (
                <Forbidden
                    message="Tài khoản khách hàng không sử dụng trang đăng nhập này."
                    backHref="/user/dashboard"
                />
            );
        }
        return <>{children}</>;
    }

    // Các trang còn lại trong /admin/* -> bắt buộc phải là ADMIN đã đăng nhập
    if (!user || user.role !== 'ADMIN') {
        return (
            <Forbidden
                message="Chỉ tài khoản Admin mới được truy cập khu vực này."
                backHref="/admin/login"
            />
        );
    }

    // Không vẽ Sidebar/main ở đây nữa -> để nguyên cho từng Client component tự vẽ
    return <>{children}</>;
}