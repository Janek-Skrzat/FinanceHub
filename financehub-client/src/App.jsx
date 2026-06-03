import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Transactions from './pages/Transactions'
import Accounts from './pages/Accounts'
import Transfers from './pages/Transfers'
import Goals from './pages/Goals'
import Liabilities from './pages/Liabilities'
import Charts from './pages/Charts'
import Layout from './components/Layout'
import { ToastProvider } from './context/ToastContext'
import Toast from './components/Toast'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/categories" element={<Layout><Categories /></Layout>} />
          <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
          <Route path="/accounts" element={<Layout><Accounts /></Layout>} />
          <Route path="/transfers" element={<Layout><Transfers /></Layout>} />
          <Route path="/goals" element={<Layout><Goals /></Layout>} />
          <Route path="/liabilities" element={<Layout><Liabilities /></Layout>} />
          <Route path="/charts" element={<Layout><Charts /></Layout>} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </ToastProvider>
  )
}

export default App