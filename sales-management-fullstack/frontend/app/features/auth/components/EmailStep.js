"use client";

import s from "../styles/forgotPasswordStyles";

export default function EmailStep({ email, setEmail, onSubmit }) {
    return (
        <div style={s.field}>
            <label style={s.label}>EMAIL</label>
            <div style={s.inputWrap}>
                <svg style={s.iconLeft} width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                    type="email"
                    placeholder="ban@congty.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && onSubmit()}
                    style={s.input}
                    onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.background = '#0f172a'; }}
                    onBlur={e => { e.target.style.borderColor = '#334155'; e.target.style.background = '#111827'; }}
                />
            </div>
        </div>
    );
}