import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

function Accounts() {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [balance, setBalance] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [interesrate, setInteresrate] = useState('')
    const [maturitydate, setMaturityDate] = useState('')
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        axiosInstance.get('/account')
            .then(response => setAccounts(response.data))
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/account', {
                name,
                type,
                balance: parseFloat(balance),
                currency,
                interestRate: interesrate ? parseFloat(interesrate) : null,
                maturityDate: maturitydate ? new Date(maturitydate).toISOString() : null
            })
            const response = await axiosInstance.get('/account')
            setAccounts(response.data)
            setName('')
            setType('')
            setBalance('')
            setMaturityDate('')
            setInteresrate('')
        } catch (error) {
            console.log('Błąd:', error)
        }
    }
    return (
        <div>
            <h1>Konta</h1>
            <ul>
                {accounts.map(account => (
                    <li key={account.id}>
                        {account.name} — {account.balance} {account.currency} — {account.type}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nazwa konta" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Typ konta" value={type} onChange={(e) => setType(e.target.value)} />
                <input type="number" placeholder="Saldo" value={balance} onChange={(e) => setBalance(e.target.value)} />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="PLN">PLN</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
                <input type="number" placeholder="Oprocentowanie (opcjonalne)" value={interesrate} onChange={(e) => setInteresrate(e.target.value)} />
                <input type="date" placeholder="Data końca (opcjonalne)" value={maturitydate} onChange={(e) => setMaturityDate(e.target.value)} />
                <button type="submit">Dodaj konto</button>
            </form>
        </div>
    )
}
export default Accounts