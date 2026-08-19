"use client";

import { useState } from "react";
import RoleSidebar from "../../../components/layout/RoleSidebar";
import AuthHeaderActions from "../../../components/layout/AuthHeaderActions";
import ConfirmDialog from "../../../components/UI/confirmDialog";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";
import CustomerModal from "./CustomerModal";
import { useCustomers } from "../hooks/useCustomers";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import { filterCustomers } from "../utils/customerHelpers";
import customerStyles from "../styles";
import { useAuth } from "../../../hooks/useAuth";

export default function CustomerClient() {
    const { user, logout } = useAuth();
    const { customers, setCustomers } = useCustomers();
    const [search, setSearch] = useState('');

    const { form, setField, editingId, showModal, openAdd, openEdit, resetForm, handleSubmit } =
        useCustomerForm(setCustomers);

    const { deleteConfirmId, requestDelete, cancelDelete, confirmDelete } =
        useDeleteCustomer(setCustomers);

    const filtered = filterCustomers(customers, search);

    return (
        <div style={customerStyles.page}>
            <RoleSidebar user={user} />

            <main style={customerStyles.main}>
                <header style={customerStyles.header}>
                    <div>
                        <h1 style={customerStyles.pageTitle}>Khách hàng</h1>
                        <p style={customerStyles.pageSubtitle}>{customers.length} khách hàng</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button style={customerStyles.addBtn} onClick={openAdd}
                            onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                            onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Thêm khách hàng
                        </button>
                        <AuthHeaderActions user={user} onLogout={logout} />
                    </div>
                </header>

                <CustomerSearch value={search} onChange={setSearch} />
                <CustomerTable customers={filtered} onEdit={openEdit} onDelete={requestDelete} />
            </main>

            {showModal && (
                <CustomerModal form={form} setField={setField} editingId={editingId} onClose={resetForm} onSubmit={handleSubmit} />
            )}

            {deleteConfirmId && (
                <ConfirmDialog onCancel={cancelDelete} onConfirm={confirmDelete} />
            )}
        </div>
    );
}