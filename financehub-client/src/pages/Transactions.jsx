import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [type, setType] = useState('expense')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    useEffect(() => {
        axiosInstance.get('/transaction')
            .then(response => setTransactions(response.data))
        axiosInstance.get('/subcategory')
            .then(response => setSubCategories(response.data))
    }, [])
    const filtered = transactions.filter(t => {
        const matchSearch = !search || t.description?.toLowerCase().includes(search.toLowerCase())
        const matchType = filterType === 'all' || t.type === filterType
        const matchFrom = !dateFrom || new Date(t.date) >= new Date(dateFrom)
        const matchTo = !dateTo || new Date(t.date) <= new Date(dateTo)
        return matchSearch && matchType && matchFrom && matchTo
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/transaction', {
                subCategoryId: parseInt(subCategoryId),
                amount: parseFloat(amount),
                currency, type,
                date: new Date(date).toISOString(),
                description
            })
            const response = await axiosInstance.get('/transaction')
            setTransactions(response.data)
            setAmount(''); setDate(''); setDescription('')
            setShowForm(false)
        } catch (error) {
            console.log('Błąd:', error)
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

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Transakcje</h1>
                <button onClick={() => setShowForm(!showForm)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontSize: '13px', cursor: 'pointer'
                }}>
                    <i className="ti ti-plus" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                    Dodaj transakcję
                </button>
            </div>

            {showForm && (
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Nowa transakcja</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Podkategoria</label>
                                <select style={inputStyle} value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                    <option value="">Wybierz...</option>
                                    {subCategories.map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Kwota</label>
                                <input style={inputStyle} type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Typ</label>
                                <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="expense">Wydatek</option>
                                    <option value="income">Przychód</option>
                                </select>
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
                                <input style={inputStyle} type="text" placeholder="np. Zakupy Biedronka" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="submit" style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>Zapisz</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 20px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>Anuluj</button>
                        </div>
                    </form>
                </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                <div style={{ position: 'relative' }}>
                    <i className="ti ti-search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', color: 'var(--text-secondary)' }} aria-hidden="true"></i>
                    <input
                        style={{ ...inputStyle, paddingLeft: '32px' }}
                        type="text"
                        placeholder="Szukaj opisu..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select style={inputStyle} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">Typ: Wszystkie</option>
                    <option value="expense">Wydatki</option>
                    <option value="income">Przychody</option>
                </select>
                <input style={inputStyle} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder="Od daty" />
                <input style={inputStyle} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder="Do daty" />
            </div>

            <div style={{ borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '10px 16px', borderBottom: '0.5px solid var(--border)', background: 'var(--bg-primary)' }}>
                    {['Opis', 'Kwota', 'Typ', 'Data'].map(h => (
                        <div key={h} style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-secondary)' }}>{h}</div>
                    ))}
                </div>
                {transactions.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px' }}>
                        Brak transakcji
                    </div>
                )}
                {filtered.map((t, i) => (
                    <div key={t.id} style={{
                        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                        padding: '12px 16px', alignItems: 'center',
                        borderBottom: i < transactions.length - 1 ? '0.5px solid var(--border)' : 'none',
                    }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                            {t.description || '—'}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: t.type === 'income' ? '#15803d' : '#b91c1c' }}>
                            {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} {t.currency}
                        </div>
                        <div>
                            <span style={{
                                fontSize: '11px', padding: '3px 8px', borderRadius: '20px',
                                background: t.type === 'income' ? '#dcfce7' : '#fee2e2',
                                color: t.type === 'income' ? '#15803d' : '#b91c1c'
                            }}>
                                {t.type === 'income' ? 'Przychód' : 'Wydatek'}
                            </span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {new Date(t.date).toLocaleDateString('pl-PL')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transactions