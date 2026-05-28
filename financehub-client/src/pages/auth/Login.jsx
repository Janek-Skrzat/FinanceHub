import { useState } from 'react'
import axios from 'axios' 

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    const response = await axios.post('/api/v1/auth/login', {
      email,
      password
    })
    console.log('Zalogowano!', response.data)
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