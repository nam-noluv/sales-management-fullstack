"use client";

import { useState } from "react";
import { addCustomer, updateCustomer } from "../services/customerServices";

const INITIAL_FORM = { name: '', phone: '', email: '', address: '' };

export function useCustomerForm(setCustomers) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const setField = (key) => (value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const openAdd = () => {
        setForm(INITIAL_FORM);
        setEditingId(null);
        setShowModal(true);
    };

    const openEdit = (customer) => {
        setForm({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
        });
        setEditingId(customer.id);
        setShowModal(true);
    };

    const resetForm = () => {
        setForm(INITIAL_FORM);
        setEditingId(null);
        setShowModal(false);
    };

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updateCustomer(editingId, form);
            } else {
                await addCustomer(form);
            }
            setCustomers(prev => {
                if (editingId) {
                    return prev.map(c => c.id === editingId ? { ...c, ...form } : c);
                } else {
                    return [...prev, { id: Date.now(), ...form }];
                }
            });
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    return { form, setField, editingId, showModal, openAdd, openEdit, resetForm, handleSubmit };
}
