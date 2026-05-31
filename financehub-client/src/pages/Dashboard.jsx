import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axiosInstance'

function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [netWorth, setNetWorth] = useState(null)

  useEffect(() => {
    axiosInstance.get('/dashboard/networth')
      .then(response => setNetWorth(response.data))
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Dashboard FinanceHub</h1>
      {netWorth && (
        <div>
          <h2>Net Worth: {netWorth.netWorth} {netWorth.currency}</h2>
          <p>Liczba kont: {netWorth.accountCount}</p>
        </div>
      )}
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  )
}

export default Dashboard