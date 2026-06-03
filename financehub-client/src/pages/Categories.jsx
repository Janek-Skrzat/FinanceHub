import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useToast } from '../context/ToastContext'

function Categories() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [showForm, setShowForm] = useState(false)
    const { showToast } = useToast()

    useEffect(() => {
        axiosInstance.get('/category')
            .then(response => setCategories(response.data))
        document.title = 'Kategorie — FinanceHub'

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/category', name)
            const response = await axiosInstance.get('/category')
            setCategories(response.data)
            setName('')
            setShowForm(false)
            showToast('Kategoria dodana!')
        } catch (error) {
            showToast('Błąd', 'error')
        }
    }

    const inputStyle = {
        width: '100%', padding: '8px 12px', borderRadius: '8px',
        border: '0.5px solid var(--border)', background: 'var(--bg-primary)',
        color: 'var(--text-primary)', fontSize: '13px', outline: 'none'
    }

    const icons = ['ti-shopping-cart', 'ti-car', 'ti-home', 'ti-device-gamepad', 'ti-heart', 'ti-shirt', 'ti-coin', 'ti-dots']
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Kategorie</h1>
                <button onClick={() => setShowForm(!showForm)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontSize: '13px', cursor: 'pointer'
                }}>
                    <i className="ti ti-plus" style={{ fontSize: '14px' }} aria-hidden="true"></i>
                    Dodaj kategorię
                </button>
            </div>

            {showForm && (
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Nowa kategoria</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            style={{ ...inputStyle, flex: 1 }}
                            type="text"
                            placeholder="Nazwa kategorii"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit" style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>Zapisz</button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ padding: '8px 20px', borderRadius: '8px', border: '0.5px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>Anuluj</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {categories.map((category, i) => (
                    <div key={category.id} style={{
                        padding: '16px', borderRadius: '10px',
                        background: 'var(--bg-card)', border: '0.5px solid var(--border)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
                    }}>
                        <div style={{
                            width: '42px', height: '42px', borderRadius: '12px',
                            background: 'var(--accent-light)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                            <i className={`ti ${icons[i % icons.length]}`} style={{ fontSize: '20px', color: 'var(--accent)' }} aria-hidden="true"></i>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', textAlign: 'center' }}>
                            {category.name}
                        </div>
                        {category.userId === null && (
                            <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '20px', background: 'var(--accent-light)', color: 'var(--accent-text)' }}>
                                Systemowa
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories