"use client";

import { useState } from "react";
import { createOrderRequest } from "../services/orderService";

export function useCreateOrder({ isAdmin, onCreated }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const resetForm = () => {
        setCustomerId("");
        setProductId("");
        setQuantity(1);
        setShowCreateModal(false);
    };

    const openCreate = () => setShowCreateModal(true);

    const submitCreate = async () => {
        if (!productId || !quantity || (isAdmin && !customerId)) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }
        try {
            const body = {
                ...(isAdmin && { customerId: Number(customerId) }),
                items: [{ productId: Number(productId), quantity: Number(quantity) }],
            };
            await createOrderRequest(body);
            resetForm();
            onCreated();
        } catch (err) {
            console.error(err);
            alert("Tạo đơn hàng thất bại");
        }
    };

    return {
        showCreateModal, customerId, setCustomerId, productId, setProductId,
        quantity, setQuantity, openCreate, closeCreate: resetForm, submitCreate,
    };
}