import { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await axiosInstance.post('/auth/register', { firstName, lastName, email, password })
            login(response.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError('Błąd rejestracji — sprawdź dane')
        }
    }

    const inputStyle = {
        width: '100%', padding: '10px 12px', borderRadius: '8px',
        border: '0.5px solid #1c2a3a', background: '#0d1117',
        color: '#e2eaf4', fontSize: '13px', outline: 'none',
        boxSizing: 'border-box'
    }
    const labelStyle = {
        fontSize: '12px', color: '#8ba3bf', marginBottom: '6px', display: 'block'
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0d1117', fontFamily: 'Inter, system-ui, sans-serif'
        }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ fontSize: '28px', fontWeight: '600', color: '#e2eaf4', marginBottom: '8px' }}>
                        Finance<span style={{ color: '#2563eb' }}>Hub</span>
                    </div>
                    <div style={{ fontSize: '14px', color: '#5a7a9a' }}>Utwórz nowe konto</div>
                </div>

                <div style={{ background: '#111d2e', borderRadius: '12px', border: '0.5px solid #1c2a3a', padding: '28px' }}>
                    {error && (
                        <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#fee2e2', color: '#b91c1c', fontSize: '13px', marginBottom: '16px' }}>
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={labelStyle}>Imię</label>
                                <input
                                    type="text"
                                    placeholder="Jan"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Nazwisko</label>
                                <input
                                    type="text"
                                    placeholder="Kowalski"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Email</label>
                            <input
                                type="email"
                                placeholder="jan@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={labelStyle}>Hasło</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <button type="submit" style={{
                            width: '100%', padding: '10px', borderRadius: '8px',
                            border: 'none', background: '#2563eb', color: '#fff',
                            fontSize: '14px', fontWeight: '500', cursor: 'pointer'
                        }}>
                            Zarejestruj się
                        </button>
                    </form>
                    <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#5a7a9a' }}>
                        Masz już konto?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            style={{ color: '#2563eb', cursor: 'pointer' }}
                        >
                            Zaloguj się
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register