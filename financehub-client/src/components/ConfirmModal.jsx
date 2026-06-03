function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998
        }}>
            <div style={{
                background: 'var(--bg-card)', border: '0.5px solid var(--border)',
                borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '90%'
            }}>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '20px' }}>
                    {message}
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={onCancel} style={{
                        padding: '8px 20px', borderRadius: '8px',
                        border: '0.5px solid var(--border)', background: 'transparent',
                        color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer'
                    }}>Anuluj</button>
                    <button onClick={onConfirm} style={{
                        padding: '8px 20px', borderRadius: '8px', border: 'none',
                        background: '#b91c1c', color: '#fff',
                        fontSize: '13px', cursor: 'pointer'
                    }}>Usuń</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal