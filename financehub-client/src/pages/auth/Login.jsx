import { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/auth/login', {
                email,
                password
            })
            login(response.data.token)
            navigate('/dashboard')
        } catch (error) {
            console.log('Błąd:', error.response.data.message)
        }
    }

    return (
        <div className="container">
            <h1>Zaloguj się</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Zaloguj</button>
            </form>
        </div>
    )
}

export default Login