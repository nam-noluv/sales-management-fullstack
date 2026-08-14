const dashboardStyles = {
    page: { display: 'flex', minHeight: '100vh', background: '#111827', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
    main: { flex: 1, marginLeft: '220px', padding: '28px 32px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
    pageTitle: { fontSize: '22px', fontWeight: '600', color: '#f9fafb', margin: 0 },
    pageSubtitle: { fontSize: '13px', color: '#6b7280', marginTop: '4px' },
    logoutBtn: { background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', fontFamily: 'inherit', transition: 'background 0.15s' },
    cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '24px' },
    card: { background: '#1f2937', borderRadius: '16px', padding: '22px', border: '1px solid #374151', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)' },
    cardLabel: { fontSize: '12px', color: '#9ca3af', letterSpacing: '0.08em', marginBottom: '10px', textTransform: 'uppercase' },
    cardValue: { fontSize: '28px', fontWeight: '700', color: '#f8fafc', margin: 0 },
    cardIcon: { width: '40px', height: '40px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardSub: { fontSize: '13px', marginTop: '18px', color: '#9ca3af' },
    tableCard: { background: '#1f2937', borderRadius: '12px', border: '1px solid #374151', overflow: 'hidden', padding: '20px' },
    tableTitle: { color: '#f9fafb', fontSize: '18px', marginBottom: '12px', fontWeight: '600' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px 20px', fontSize: '12px', fontWeight: '500', color: '#6b7280', letterSpacing: '0.04em', borderBottom: '1px solid #374151' },
    td: { padding: '14px 20px', fontSize: '13px', color: '#d1d5db', borderTop: '1px solid #374151' },
    tr: { transition: 'background 0.1s' },
    badge: { display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' },
};

export default dashboardStyles;