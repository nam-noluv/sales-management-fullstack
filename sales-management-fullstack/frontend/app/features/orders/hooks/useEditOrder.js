"use client";

import { useState } from "react";
import { updateOrderRequest } from "../services/orderService";

export function useEditOrder({ onUpdated }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [status, setStatus] = useState("");
    const [editCustomerId, setEditCustomerId] = useState("");
    const [editProductId, setEditProductId] = useState("");
    const [editQuantity, setEditQuantity] = useState(1);

    const openEdit = (order) => {
        setEditingId(order.id);
        setStatus(order.status);
        setEditCustomerId(order.customer?.id || "");
        setEditProductId(order.items?.[0]?.product?.id || "");
        setEditQuantity(order.items?.[0]?.quantity || 1);
        setShowEditModal(true);
    };

    const closeEdit = () => {
        setEditingId(null);
        setStatus("");
        setEditCustomerId("");
        setEditProductId("");
        setEditQuantity(1);
        setShowEditModal(false);
    };

    const submitEdit = async () => {
        if (!editCustomerId) {
            alert("Vui lòng chọn khách hàng");
            return;
        }
        try {
            await updateOrderRequest(editingId, {
                productId: Number(editProductId),
                quantity: Number(editQuantity),
                status,
            });
            closeEdit();
            onUpdated();
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };

    return {
        showEditModal, editingId, status, setStatus,
        editCustomerId, editProductId, setEditProductId,
        editQuantity, setEditQuantity, openEdit, closeEdit, submitEdit,
    };
}