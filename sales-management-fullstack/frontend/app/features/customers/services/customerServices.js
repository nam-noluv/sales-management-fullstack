import { addCustomer, updateCustomer, deleteCustomer } from '../../../../services/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export async function fetchCustomers() {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/customers`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
            console.log(await res.text());
            return [];
        }

        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export { addCustomer, updateCustomer, deleteCustomer };
