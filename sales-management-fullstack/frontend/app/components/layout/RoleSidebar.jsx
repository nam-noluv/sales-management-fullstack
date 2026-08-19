"use client";

import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

//Khách (chưa đăng nhập) -> không có sidebar
// ADMIN -> AdminSidebar(menu trỏ /admin/...)
// CUSTOMER -> UserSidebar(menu trỏ /user/...)

export default function RoleSidebar({ user }) {
    if (!user) return null;
    if (user.role === 'ADMIN') return <AdminSidebar user={user} />;
    return <UserSidebar user={user} />;
}