import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useToast } from '../context/ToastContext'
import ConfirmModal from '../components/ConfirmModal'

function Liabilities() {
    const [liabilities, setLiabilities] = useState([])
    const [name, setName] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [remainingAmount, setRemainingAmount] = useState('')
    const [monthlyPayment, setMonthlyPayment] = useState('')
    const [deadline, setDeadline] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [loading, setLoading] = useState(true)
    const { showToast } = useToast()

    useEffect(() => {
        axiosInstance.get('/liability').then(response => {
            setLiabilities(response.data)
            setLoading(false)
        })
        document.title = 'Zobowiązania — FinanceHub'

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/liability', {
                name,
                totalAmount: parseFloat(totalAmount),
                remainingAmount: parseFloat(remainingAmount),
                monthlyPayment: parseFloat(monthlyPayment),
                deadline: deadline ? new Date(deadline).toISOString() : null
            })
            const response = await axiosInstance.get('/liability')
            setLiabilities(response.data)
            setName(''); setTotalAmount(''); setRemainingAmount('')
            setMonthlyPayment(''); setDeadline('')
            setShowForm(false)
            showToast('Zobowiązanie dodane!')
        } catch (error) {
            showToast('Błąd', 'error')
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/liability/${deleteId}`)
            const response = await axiosInstance.get('/liability')
            setLiabilities(response.data)
            setDeleteId(null)
            showToast('Zobowiązanie usunięte!')
        } catch (error) {
            showToast('Błąd usuwania', 'error')
            setDeleteId(null)
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

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
            <i className="ti ti-loader-2" style={{ fontSize: '32px' }}></i>
            <div style={{ marginTop: '8px', fontSize: '13px' }}>Ładowanie...</div>
        </div>
    )

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Zobowiązania</h1>
                <button onClick={() => setShowForm(!showForm)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer'
                }}>
                    <i className="ti ti-plus" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                    Dodaj zobowiązanie
                </button>
            </div>

            {showForm && (
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Nowe zobowiązanie</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Nazwa</label>
                                <input style={inputStyle} type="text" placeholder="np. Kredyt PKO" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Kwota całkowita</label>
                                <input style={inputStyle} type="number" placeholder="50000" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Pozostało</label>
                                <input style={inputStyle} type="number" placeholder="35000" value={remainingAmount} onChange={(e) => setRemainingAmount(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Rata miesięczna</label>
                                <input style={inputStyle} type="number" placeholder="800" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Termin spłaty</label>
                                <input style={inputStyle} type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="submit" style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>Zapisz</button>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 20px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>Anuluj</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {liabilities.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                        Brak zobowiązań
                    </div>
                )}
                {liabilities.map(liability => {
                    const percent = Math.min((liability.remainingAmount / liability.totalAmount) * 100, 100)
                    return (
                        <div key={liability.id} style={{ padding: '18px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="ti ti-credit-card" style={{ fontSize: '18px', color: '#b91c1c' }} aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{liability.name}</div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            Rata: {liability.monthlyPayment.toLocaleString()} PLN/mies.
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '16px', fontWeight: '500', color: '#b91c1c' }}>
                                            {liability.remainingAmount.toLocaleString()} PLN
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                            z {liability.totalAmount.toLocaleString()} PLN
                                        </div>
                                    </div>
                                    <button onClick={() => setDeleteId(liability.id)} style={{
                                        padding: '6px 10px', borderRadius: '8px', border: 'none',
                                        background: '#fee2e2', color: '#b91c1c', cursor: 'pointer'
                                    }}>
                                        <i className="ti ti-trash" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                                <div style={{ height: '6px', background: '#b91c1c', borderRadius: '3px', width: `${percent}%`, transition: 'width 0.3s' }}></div>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                {percent.toFixed(0)}% pozostało do spłaty
                            </div>
                        </div>
                    )
                })}
            </div>

            <ConfirmModal
                isOpen={deleteId !== null}
                message="Czy na pewno chcesz usunąć to zobowiązanie? Tej akcji nie można cofnąć."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    )
}

export default Liabilities