"use client";

import { useState } from "react";
import Sidebar from "../../../components/layout/sidebar";
import ConfirmDialog from "../../../components/UI/confirmDialog";
import { useAuth } from "../../../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useProductForm } from "../hooks/useProductForm";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { filterProducts } from "../utils/productHelpers";
import ProductSearch from "./productSearch";
import ProductTable from "./productTable";
import ProductModal from "./productModal";
import productStyles from "../styles";

export default function ProductClient({ initialProducts }) {
    const { user } = useAuth();
    const [search, setSearch] = useState('');

    const { products, loading, reload } = useProducts(initialProducts);
    const isAdmin = user?.role === 'ADMIN';

    const { form, setField, editingId, showModal, openAdd, openEdit, resetForm, handleSubmit } =
        useProductForm(reload);

    const { deleteConfirmId, requestDelete, cancelDelete, confirmDelete } =
        useDeleteProduct(reload);

    const filtered = filterProducts(products, search);

    return (
        <div style={productStyles.page}>
            <Sidebar user={user} />

            <main style={productStyles.main}>
                <header style={productStyles.header}>
                    <div>
                        <h1 style={productStyles.pageTitle}>Sản phẩm</h1>
                        <p style={productStyles.pageSubtitle}>{products.length} sản phẩm trong kho</p>
                    </div>
                    {isAdmin && (
                        <button style={productStyles.addBtn} onClick={openAdd}
                            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Thêm sản phẩm
                        </button>
                    )}
                </header>

                <ProductSearch value={search} onChange={setSearch} />
                <ProductTable products={filtered} loading={loading} isAdmin={isAdmin} onEdit={openEdit} onDelete={requestDelete} />
            </main>

            {showModal && (
                <ProductModal form={form} setField={setField} editingId={editingId} onClose={resetForm} onSubmit={handleSubmit} />
            )}

            {deleteConfirmId && (
                <ConfirmDialog onCancel={cancelDelete} onConfirm={confirmDelete} />
            )}
        </div>
    );
}