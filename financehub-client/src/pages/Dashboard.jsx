import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

function Dashboard() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [netWorth, setNetWorth] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get('/dashboard/networth')
            .then(response => {
                setNetWorth(response.data)
                setLoading(false)
            })
        document.title = 'Dashboard — FinanceHub'
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
            <i className="ti ti-loader-2" style={{ fontSize: '32px' }}></i>
            <div style={{ marginTop: '8px', fontSize: '13px' }}>Ładowanie...</div>
        </div>
    )

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Dashboard</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '500', color: '#fff' }}>JS</div>
                    <button onClick={handleLogout} style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        Wyloguj
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Net Worth</div>
                    <div style={{ fontSize: '20px', fontWeight: '500', color: 'var(--accent)' }}>
                        {netWorth ? `${netWorth.netWorth.toLocaleString()} PLN` : '...'}
                    </div>
                    <span style={{ display: 'inline-block', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'var(--accent-light)', color: 'var(--accent-text)', marginTop: '6px' }}>
                        {netWorth ? `${netWorth.accountCount} konta` : ''}
                    </span>
                </div>

                <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Przychody (miesiąc)</div>
                    <div style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>wkrótce</div>
                </div>

                <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Wydatki (miesiąc)</div>
                    <div style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)' }}>wkrótce</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard