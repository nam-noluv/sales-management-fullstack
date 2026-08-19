"use client";

import { useState } from "react";
import RoleSidebar from "../../../components/layout/RoleSidebar";
import AuthHeaderActions from "../../../components/layout/AuthHeaderActions";
import ConfirmDialog from "../../../components/UI/confirmDialog";
import { useAuth } from "../../../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useEditOrder } from "../hooks/useEditOrder";
import { useDeleteOrder } from "../hooks/useDeleteOrder";
import { filterOrders } from "../utils/orderHelpers";
import OrderSearch from "./OrderSearch";
import OrderTable from "./OrderTable";
import CreateOrderModal from "./CreateOrderModal";
import EditOrderModal from "./EditOrderModal";
import orderStyles from "../styles";

export default function OrderClient() {
    const { user, logout } = useAuth()
    const [search, setSearch] = useState("");

    const { orders, customers, products, loading, reload, isAdmin } = useOrders(user);
    const canManage = isAdmin || user?.role === "CUSTOMER";

    const createOrder = useCreateOrder({ isAdmin, onCreated: reload });
    const editOrder = useEditOrder({ onUpdated: reload });
    const deleteOrder = useDeleteOrder({ onDeleted: reload });

    const filtered = filterOrders(orders, search);

    return (
        <div style={orderStyles.page}>
            <RoleSidebar user={user} />

            <main style={orderStyles.main}>
                <header style={orderStyles.header}>
                    <div>
                        <h1 style={orderStyles.pageTitle}>Đơn hàng</h1>
                        <p style={orderStyles.pageSubtitle}>{orders.length} đơn hàng</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button style={orderStyles.addBtn} onClick={createOrder.openCreate}
                            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Tạo đơn hàng
                        </button>
                        <AuthHeaderActions user={user} onLogout={logout} />
                    </div>
                </header>

                <OrderSearch value={search} onChange={setSearch} />
                <OrderTable
                    orders={filtered}
                    loading={loading}
                    canManage={canManage}
                    onEdit={editOrder.openEdit}
                    onDelete={deleteOrder.requestDelete}
                />
            </main>

            {createOrder.showCreateModal && (
                <CreateOrderModal
                    isAdmin={isAdmin}
                    customers={customers}
                    products={products}
                    customerId={createOrder.customerId}
                    setCustomerId={createOrder.setCustomerId}
                    productId={createOrder.productId}
                    setProductId={createOrder.setProductId}
                    quantity={createOrder.quantity}
                    setQuantity={createOrder.setQuantity}
                    onClose={createOrder.closeCreate}
                    onSubmit={createOrder.submitCreate}
                />
            )}

            {editOrder.showEditModal && (
                <EditOrderModal
                    isAdmin={isAdmin}
                    editingId={editOrder.editingId}
                    products={products}
                    editProductId={editOrder.editProductId}
                    setEditProductId={editOrder.setEditProductId}
                    editQuantity={editOrder.editQuantity}
                    setEditQuantity={editOrder.setEditQuantity}
                    status={editOrder.status}
                    setStatus={editOrder.setStatus}
                    onClose={editOrder.closeEdit}
                    onSubmit={editOrder.submitEdit}
                />
            )}

            {deleteOrder.deleteConfirmId && (
                <ConfirmDialog
                    description={`Đơn hàng #${deleteOrder.deleteConfirmId} sẽ bị xóa vĩnh viễn.`}
                    onCancel={deleteOrder.cancelDelete}
                    onConfirm={deleteOrder.confirmDelete}
                />
            )}
        </div>
    );
}