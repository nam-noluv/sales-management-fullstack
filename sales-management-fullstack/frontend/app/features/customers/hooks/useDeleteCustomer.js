"use client";

import { useState } from "react";
import { deleteCustomer } from "../services/customerServices";

export function useDeleteCustomer(setCustomers) {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const requestDelete = (id) => setDeleteConfirmId(id);
    const cancelDelete = () => setDeleteConfirmId(null);

    const confirmDelete = async () => {
        try {
            await deleteCustomer(deleteConfirmId);
            setCustomers(prev => prev.filter(c => c.id !== deleteConfirmId));
            setDeleteConfirmId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return { deleteConfirmId, requestDelete, cancelDelete, confirmDelete };
}