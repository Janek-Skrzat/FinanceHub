import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Dashboard FinanceHub</h1>
      <p>Witaj! Jesteś zalogowany.</p>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  )
}

export default Dashboard