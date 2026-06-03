import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useToast } from '../context/ToastContext'

function Transfers() {
    const [accounts, setAccounts] = useState([])
    const [transfers, setTransfers] = useState([])
    const [fromAccountId, setFromAccountId] = useState('')
    const [toAccountId, setToAccountId] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [showForm, setShowForm] = useState(false)
    const { showToast } = useToast()

    useEffect(() => {
        axiosInstance.get('/account').then(r => setAccounts(r.data))
        axiosInstance.get('/transfer').then(r => setTransfers(r.data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/transfer', {
                fromAccountId: parseInt(fromAccountId),
                toAccountId: parseInt(toAccountId),
                amount: parseFloat(amount),
                currency,
                date: new Date(date).toISOString(),
                description
            })
            const r = await axiosInstance.get('/transfer')
            setTransfers(r.data)
            setAmount(''); setDate(''); setDescription('')
            setShowForm(false)
            showToast('Transakcja zapisana!')
        } catch (error) {
            showToast('Błąd zapisu transakcji', 'error')
        }
    }

    const inputStyle = {
        width: '100%', padding: '8px 12px', borderRadius: '8px',
        border: '0.5px solid var(--border)', background: 'var(--bg-primary)',
        color: 'var(--text-primary)', fontSize: '13px', outline: 'none'
    }
    const labelStyle = {
        fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block'
    }

    const getAccountName = (id) => accounts.find(a => a.id === id)?.name || `Konto ${id}`

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Transfery</h1>
                <button onClick={() => setShowForm(!showForm)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontSize: '13px', cursor: 'pointer'
                }}>
                    <i className="ti ti-plus" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                    Nowy transfer
                </button>
            </div>

            {showForm && (
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Nowy transfer</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Z konta</label>
                                <select style={inputStyle} value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
                                    <option value="">Wybierz...</option>
                                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Na konto</label>
                                <select style={inputStyle} value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
                                    <option value="">Wybierz...</option>
                                    {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Kwota</label>
                                <input style={inputStyle} type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Waluta</label>
                                <select style={inputStyle} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                    <option value="PLN">PLN</option>
                                    <option value="EUR">EUR</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Data</label>
                                <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Opis (opcjonalny)</label>
                                <input style={inputStyle} type="text" placeholder="np. Przelew na lokatę" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="submit" style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>Wykonaj</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 20px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>Anuluj</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {transfers.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                        Brak transferów
                    </div>
                )}
                {transfers.map(t => (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <i className="ti ti-transfer" style={{ fontSize: '18px', color: 'var(--accent)' }} aria-hidden="true"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                {getAccountName(t.fromAccountId)}
                                <i className="ti ti-arrow-right" style={{ fontSize: '12px', margin: '0 6px', color: 'var(--text-secondary)' }} aria-hidden="true"></i>
                                {getAccountName(t.toAccountId)}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                {t.description || '—'}
                            </div>
                        </div>
                        <div style={{ width: '0.5px', height: '36px', background: 'var(--border)' }}></div>
                        <div style={{ textAlign: 'right', minWidth: '120px' }}>
                            <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--accent)' }}>
                                {t.amount.toLocaleString()} {t.currency}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                {new Date(t.date).toLocaleDateString('pl-PL')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transfers