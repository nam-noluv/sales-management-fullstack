import OrderClient from "../../features/orders/components/orderClient";

export const metadata = {
    title: 'Đơn hàng - Sales Manager',
    description: 'Quản lý đơn hàng',
};

export default function OrdersPage() {
    return <OrderClient />;
}