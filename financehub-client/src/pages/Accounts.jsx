import { useState, useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import axiosInstance from '../api/axiosInstance'
import ConfirmModal from '../components/ConfirmModal'

function Accounts() {
    const [accounts, setAccounts] = useState([])
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [balance, setBalance] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [interesrate, setInteresrate] = useState('')
    const [maturitydate, setMaturityDate] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [editId, setEditId] = useState(null)
    const [editName, setEditName] = useState('')
    const [editType, setEditType] = useState('')
    const [editBalance, setEditBalance] = useState('')
    const [editCurrency, setEditCurrency] = useState('PLN')
    const { showToast } = useToast()

    useEffect(() => {
        axiosInstance.get('/account')
            .then(response => setAccounts(response.data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/account', {
                name, type,
                balance: parseFloat(balance),
                currency,
                interestRate: interesrate ? parseFloat(interesrate) : null,
                maturityDate: maturitydate ? new Date(maturitydate).toISOString() : null
            })
            const response = await axiosInstance.get('/account')
            setAccounts(response.data)
            setName(''); setType(''); setBalance('')
            setMaturityDate(''); setInteresrate('')
            setShowForm(false)
            showToast('Konto zostało dodane!')
        } catch (error) {
            showToast('Błąd podczas dodawania konta', 'error')
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/account/${deleteId}`)
            const response = await axiosInstance.get('/account')
            setAccounts(response.data)
            setDeleteId(null)
            showToast('Konto usunięte!')
        } catch (error) {
            showToast('Błąd usuwania', 'error')
            setDeleteId(null)
        }
    }

    const startEdit = (account) => {
        setEditId(account.id)
        setEditName(account.name)
        setEditType(account.type)
        setEditBalance(account.balance)
        setEditCurrency(account.currency)
    }

    const handleEdit = async () => {
        try {
            await axiosInstance.put(`/account/${editId}`, {
                name: editName,
                type: editType,
                balance: parseFloat(editBalance),
                currency: editCurrency,
                interestRate: null,
                maturityDate: null
            })
            const response = await axiosInstance.get('/account')
            setAccounts(response.data)
            setEditId(null)
            showToast('Konto zaktualizowane!')
        } catch (error) {
            showToast('Błąd edycji', 'error')
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
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Konta</h1>
                <button onClick={() => setShowForm(!showForm)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontSize: '13px', cursor: 'pointer'
                }}>
                    <i className="ti ti-plus" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                    Dodaj konto
                </button>
            </div>

            {showForm && (
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Nowe konto</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Nazwa konta</label>
                                <input style={inputStyle} type="text" placeholder="np. Konto PKO" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Typ konta</label>
                                <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Wybierz typ</option>
                                    <option value="Bankowe">Bankowe</option>
                                    <option value="Oszczednosciowe">Oszczędnościowe</option>
                                    <option value="Lokata">Lokata</option>
                                    <option value="Maklerskie">Maklerskie</option>
                                    <option value="Gotowka">Gotówka</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Saldo początkowe</label>
                                <input style={inputStyle} type="number" placeholder="0.00" value={balance} onChange={(e) => setBalance(e.target.value)} />
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
                                <label style={labelStyle}>Oprocentowanie (opcjonalne)</label>
                                <input style={inputStyle} type="number" placeholder="np. 5.5" value={interesrate} onChange={(e) => setInteresrate(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Data końca (opcjonalne)</label>
                                <input style={inputStyle} type="date" value={maturitydate} onChange={(e) => setMaturityDate(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="submit" style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>Zapisz</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 20px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>Anuluj</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {accounts.map(account => (
                    <div key={account.id} style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--bg-card)', border: `0.5px solid ${editId === account.id ? 'var(--accent)' : 'var(--border)'}` }}>
                        {editId === account.id ? (
                            // Tryb edycji — inline
                            <div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                                    <input style={inputStyle} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nazwa" />
                                    <select style={inputStyle} value={editType} onChange={(e) => setEditType(e.target.value)}>
                                        <option value="Bankowe">Bankowe</option>
                                        <option value="Oszczednosciowe">Oszczędnościowe</option>
                                        <option value="Lokata">Lokata</option>
                                        <option value="Maklerskie">Maklerskie</option>
                                        <option value="Gotowka">Gotówka</option>
                                    </select>
                                    <input style={inputStyle} type="number" value={editBalance} onChange={(e) => setEditBalance(e.target.value)} placeholder="Saldo" />
                                    <select style={inputStyle} value={editCurrency} onChange={(e) => setEditCurrency(e.target.value)}>
                                        <option value="PLN">PLN</option>
                                        <option value="EUR">EUR</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={handleEdit} style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '12px', cursor: 'pointer' }}>Zapisz</button>
                                    <button onClick={() => setEditId(null)} style={{ padding: '6px 16px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer' }}>Anuluj</button>
                                </div>
                            </div>
                        ) : (
                            // Tryb normalny
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <i className="ti ti-building-bank" style={{ fontSize: '18px', color: 'var(--accent)' }} aria-hidden="true"></i>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{account.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{account.type}</div>
                                </div>
                                <div style={{ width: '0.5px', height: '36px', background: 'var(--border)' }}></div>
                                <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                    <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--accent)' }}>
                                        {account.balance.toLocaleString()} {account.currency}
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Saldo aktualne</div>
                                </div>
                                <button onClick={() => startEdit(account)} style={{
                                    padding: '6px 12px', borderRadius: '8px', border: 'none',
                                    background: 'var(--accent-light)', color: 'var(--accent)',
                                    fontSize: '12px', cursor: 'pointer'
                                }}>
                                    <i className="ti ti-pencil" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                                </button>
                                <button onClick={() => setDeleteId(account.id)} style={{
                                    padding: '6px 12px', borderRadius: '8px', border: 'none',
                                    background: '#fee2e2', color: '#b91c1c',
                                    fontSize: '12px', cursor: 'pointer'
                                }}>
                                    <i className="ti ti-trash" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <ConfirmModal
                isOpen={deleteId !== null}
                message="Czy na pewno chcesz usunąć to konto? Tej akcji nie można cofnąć."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    )
}

export default Accounts