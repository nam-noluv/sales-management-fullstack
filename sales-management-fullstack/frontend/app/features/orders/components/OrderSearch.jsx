"use client";

import orderStyles from "../styles";

export default function OrderSearch({ value, onChange }) {
    return (
        <div style={orderStyles.searchWrap}>
            <svg style={orderStyles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
                type="text"
                placeholder="Tìm theo ID, khách hàng, trạng thái..."
                value={value}
                onChange={e => onChange(e.target.value)}
                style={orderStyles.searchInput}
                onFocus={e => e.target.style.borderColor = '#2563eb'}
                onBlur={e => e.target.style.borderColor = '#374151'}
            />
        </div>
    );
}