"use client";

import s from "../styles/forgotPasswordStyles";

export default function ForgotPasswordSteps({ step }) {
    return (
        <div style={s.steps}>
            <div style={s.stepItem}>
                <div style={{ ...s.stepDot, background: '#3b82f6', color: '#fff' }}>1</div>
                <span style={{ ...s.stepLabel, color: '#e2e8f0' }}>Xác nhận email</span>
            </div>
            <div style={s.stepLine(step >= 2)} />
            <div style={s.stepItem}>
                <div style={{ ...s.stepDot, background: step >= 2 ? '#3b82f6' : '#334155', color: '#fff' }}>2</div>
                <span style={{ ...s.stepLabel, color: step >= 2 ? '#e2e8f0' : '#64748b' }}>Mật khẩu mới</span>
            </div>
        </div>
    );
}