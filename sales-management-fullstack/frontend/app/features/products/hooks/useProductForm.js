"use client";

import { useState } from "react";
import { createProduct, updateProduct, uploadProductImage } from "../services/productService";

const emptyForm = { name: '', description: '', price: '', quantity: '' };

export function useProductForm(onSaved) {
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageUrl, setExistingImageUrl] = useState(null); // ảnh cũ khi edit
    const [uploading, setUploading] = useState(false);

    const setField = (key) => (value) => setForm(prev => ({ ...prev, [key]: value }));

    const handleImageChange = (file) => {
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const clearImage = () => {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl(null);
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowModal(false);
        clearImage();
    };

    const openAdd = () => {
        setForm(emptyForm);
        setEditingId(null);
        clearImage();
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
        setImageFile(null);
        setImagePreview(p.imageUrl || null);
        setExistingImageUrl(p.imageUrl || null);
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.quantity) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        try {
            let imageUrl = existingImageUrl; // giữ ảnh cũ nếu không chọn ảnh mới

            // Nếu có chọn ảnh mới -> upload trước để lấy imageUrl
            if (imageFile) {
                setUploading(true);
                const { imageUrl: uploadedUrl } = await uploadProductImage(imageFile);
                imageUrl = uploadedUrl;
                setUploading(false);
            }

            const payload = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                quantity: Number(form.quantity),
                ...(imageUrl ? { imageUrl } : {}),
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
            setUploading(false);
            alert('Có lỗi xảy ra');
        }
    };

    return {
        form, setField, editingId, showModal,
        openAdd, openEdit, resetForm, handleSubmit,
        imagePreview, handleImageChange, clearImage, uploading,
    };
}