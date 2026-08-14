const loginStyles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#f8fafc',
    },
    card: {
        background: '#edeff3',
        borderRadius: '16px',
        padding: '32px 28px 24px',
        width: '340px',
        border: '1px solid #1f2937',
    },
    iconWrap: {
        width: '44px', height: '44px',
        borderRadius: '10px',
        background: '#eff3ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px',
    },
    title: {
        fontSize: '22px', fontWeight: '600',
        color: '#1a1a2e', marginBottom: '3px',
    },
    sub: {
        fontSize: '13px', color: '#8e9aaf', marginBottom: '24px',
    },
    hr: {
        border: 'none', borderTop: '1px solid #f0f2f5', marginBottom: '22px',
    },
    errorMsg: {
        padding: '10px 12px',
        background: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        color: '#dc2626',
        fontSize: '13px',
        marginBottom: '14px',
    },
    field: { marginBottom: '14px' },
    fieldTop: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px',
    },
    label: {
        display: 'block',
        fontSize: '11px', fontWeight: '600',
        letterSpacing: '0.07em', color: '#8e9aaf',
        textTransform: 'uppercase',
    },
    inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
    iconLeft: {
        position: 'absolute', left: '12px', color: '#adb5bd', pointerEvents: 'none',
    },
    input: {
        width: '100%',
        padding: '11px 12px 11px 38px',
        background: '#f0f4ff',
        border: '1.5px solid transparent',
        borderRadius: '10px',
        fontSize: '14px', color: '#1a1a2e',
        outline: 'none', fontFamily: 'inherit',
        transition: 'border-color 0.15s, background 0.15s',
    },
    eyeBtn: {
        position: 'absolute', right: '12px',
        background: 'none', border: 'none',
        cursor: 'pointer', color: '#adb5bd',
        display: 'flex', alignItems: 'center', padding: 0,
    },
    forgot: {
        fontSize: '12px', color: '#3b5bdb',
        textDecoration: 'none', fontWeight: '500',
    },
    btn: {
        width: '100%', padding: '12px',
        background: '#3b5bdb', color: '#fff',
        border: 'none', borderRadius: '10px',
        fontSize: '14px', fontWeight: '600',
        cursor: 'pointer', marginTop: '6px',
        fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        transition: 'background 0.15s',
    },
    footer: {
        textAlign: 'center', fontSize: '13px',
        color: '#8e9aaf', marginTop: '20px',
    },
    link: {
        color: '#3b5bdb', textDecoration: 'none', fontWeight: '500',
    },
};

export default loginStyles;