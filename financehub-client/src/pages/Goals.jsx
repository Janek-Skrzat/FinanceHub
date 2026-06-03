import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useToast } from '../context/ToastContext'
import ConfirmModal from '../components/ConfirmModal'

function Goals() {
    const [goals, setGoals] = useState([])
    const [name, setName] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [currentAmount, setCurrentAmount] = useState('')
    const [deadline, setDeadline] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const { showToast } = useToast()

    useEffect(() => {
        axiosInstance.get('/goal').then(response => setGoals(response.data))
        document.title = 'Cele — FinanceHub'

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/goal', {
                name,
                targetAmount: parseFloat(targetAmount),
                currentAmount: parseFloat(currentAmount) || 0,
                deadline: deadline ? new Date(deadline).toISOString() : null
            })
            const response = await axiosInstance.get('/goal')
            setGoals(response.data)
            setName(''); setTargetAmount(''); setCurrentAmount(''); setDeadline('')
            setShowForm(false)
            showToast('Cel dodany!')
        } catch (error) {
            showToast('Błąd', 'error')
        }
    }

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/goal/${deleteId}`)
            const response = await axiosInstance.get('/goal')
            setGoals(response.data)
            setDeleteId(null)
            showToast('Cel usunięty!')
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

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Cele oszczędnościowe</h1>
                <button onClick={() => setShowForm(!showForm)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer'
                }}>
                    <i className="ti ti-plus" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                    Dodaj cel
                </button>
            </div>

            {showForm && (
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Nowy cel</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Nazwa celu</label>
                                <input style={inputStyle} type="text" placeholder="np. Wakacje" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Kwota docelowa</label>
                                <input style={inputStyle} type="number" placeholder="5000" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Obecne oszczędności</label>
                                <input style={inputStyle} type="number" placeholder="0" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Termin (opcjonalny)</label>
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
                {goals.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                        Brak celów — dodaj pierwszy cel!
                    </div>
                )}
                {goals.map(goal => {
                    const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
                    return (
                        <div key={goal.id} style={{ padding: '18px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="ti ti-target" style={{ fontSize: '18px', color: 'var(--accent)' }} aria-hidden="true"></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{goal.name}</div>
                                        {goal.deadline && (
                                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                                Termin: {new Date(goal.deadline).toLocaleDateString('pl-PL')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--accent)' }}>
                                            {goal.currentAmount.toLocaleString()} / {goal.targetAmount.toLocaleString()} PLN
                                        </div>
                                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{percent.toFixed(0)}% celu</div>
                                    </div>
                                    <button onClick={() => setDeleteId(goal.id)} style={{
                                        padding: '6px 10px', borderRadius: '8px', border: 'none',
                                        background: '#fee2e2', color: '#b91c1c', cursor: 'pointer'
                                    }}>
                                        <i className="ti ti-trash" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                                <div style={{ height: '6px', background: percent >= 100 ? '#15803d' : 'var(--accent)', borderRadius: '3px', width: `${percent}%`, transition: 'width 0.3s' }}></div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <ConfirmModal
                isOpen={deleteId !== null}
                message="Czy na pewno chcesz usunąć ten cel? Tej akcji nie można cofnąć."
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    )
}

export default Goals