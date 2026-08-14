import OrderClient from "../../features/orders/components/orderClient";

export const metadata = {
    title: "Đơn hàng của tôi - Sales Manager",
    description: "Quản lý đơn hàng của tôi",
};

export default function MyOrdersPage() {
    return (
        <OrderClient />
    );
}