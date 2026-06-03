import { useToast } from '../context/ToastContext'

function Toast() {
    const { toasts, removeToast } = useToast()

    return (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 9999 }}>
            {toasts.map(toast => (
                <div key={toast.id} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '12px 16px', borderRadius: '10px', minWidth: '280px',
                    background: toast.type === 'success' ? '#dcfce7' : toast.type === 'error' ? '#fee2e2' : '#dbeafe',
                    border: `0.5px solid ${toast.type === 'success' ? '#15803d' : toast.type === 'error' ? '#b91c1c' : '#2563eb'}`,
                    color: toast.type === 'success' ? '#15803d' : toast.type === 'error' ? '#b91c1c' : '#1d4ed8',
                }}>
                    <i className={`ti ${toast.type === 'success' ? 'ti-check' : toast.type === 'error' ? 'ti-x' : 'ti-info-circle'}`}
                        style={{ fontSize: '16px', flexShrink: 0 }} aria-hidden="true"></i>
                    <span style={{ flex: 1, fontSize: '13px', fontWeight: '500' }}>{toast.message}</span>
                    <button onClick={() => removeToast(toast.id)} style={{
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: 'inherit', fontSize: '14px', padding: '0', flexShrink: 0
                    }}>
                        <i className="ti ti-x" aria-hidden="true"></i>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Toast