"use client";

import { useState } from "react";
import { deleteOrderRequest } from "../services/orderService";

export function useDeleteOrder({ onDeleted }) {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const requestDelete = (id) => setDeleteConfirmId(id);
    const cancelDelete = () => setDeleteConfirmId(null);

    const confirmDelete = async () => {
        try {
            await deleteOrderRequest(deleteConfirmId);
            setDeleteConfirmId(null);
            onDeleted();
        } catch (err) {
            console.error(err);
        }
    };

    return { deleteConfirmId, requestDelete, cancelDelete, confirmDelete };
}