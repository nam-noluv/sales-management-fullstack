"use client";

import { useState } from "react";
import { deleteProductRequest } from "../services/productService";

export function useDeleteProduct(onDeleted) {
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const requestDelete = (id) => setDeleteConfirmId(id);
    const cancelDelete = () => setDeleteConfirmId(null);

    const confirmDelete = async () => {
        try {
            await deleteProductRequest(deleteConfirmId);
            setDeleteConfirmId(null);
            onDeleted();
        } catch (err) {
            console.error(err);
        }
    };

    return { deleteConfirmId, requestDelete, cancelDelete, confirmDelete };
}