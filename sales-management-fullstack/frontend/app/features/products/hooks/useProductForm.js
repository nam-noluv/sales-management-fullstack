"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "../services/productService";

const emptyForm = { name: '', description: '', price: '', quantity: '' };

export function useProductForm(onSaved) {
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const setField = (key) => (value) => setForm(prev => ({ ...prev, [key]: value }));

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowModal(false);
    };

    const openAdd = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowModal(true);
    };

    const openEdit = (p) => {
        setEditingId(p.id);
        setForm({
            name: p.name || '',
            description: p.description || '',
            price: p.price ?? '',
            quantity: p.quantity ?? '',
        });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.quantity) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                quantity: Number(form.quantity),
            };
            if (editingId) {
                await updateProduct(editingId, payload);
            } else {
                await createProduct(payload);
            }
            resetForm();
            onSaved();
        } catch (err) {
            console.error(err);
            alert('Có lỗi xảy ra');
        }
    };

    return { form, setField, editingId, showModal, openAdd, openEdit, resetForm, handleSubmit };
}