import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/auth/register', {
                firstName,
                lastName,
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
            <h1>Zarejestruj się</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Imię"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

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

                <button>Zarejestruj</button>
            </form>
        </div>
    )
}

export default Register