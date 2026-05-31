import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

function Transfers() {
    const [accounts, setAccounts] = useState([])
    const [transfers, setTransfers] = useState([])
    const [fromAccountId, setFromAccountId] = useState('')
    const [toAccountId, setToAccountId] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        axiosInstance.get('/account')
            .then(response => setAccounts(response.data))
        axiosInstance.get('/transfer')
            .then(response => setTransfers(response.data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/transfer', {
                fromAccountId: parseInt(fromAccountId),
                toAccountId: parseInt(toAccountId),
                amount: parseFloat(amount),
                currency,
                date: new Date(date).toISOString(),
                description
            })
            const response = await axiosInstance.get('/transfer')
            setTransfers(response.data)
            setAmount('')
            setDate('')
            setDescription('')
        } catch (error) {
            console.log('Błąd:', error)
        }
    }

    return (
        <div>
            <h1>Transfery</h1>
            <ul>
                {transfers.map(transfer => (
                    <li key={transfer.id}>
                        {transfer.amount} {transfer.currency} — z konta {transfer.fromAccountId} na {transfer.toAccountId}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <select value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
                    <option value="">Z konta...</option>
                    {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                </select>
                <select value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
                    <option value="">Na konto...</option>
                    {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                </select>
                <input type="number" placeholder="Kwota" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="PLN">PLN</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input type="text" placeholder="Opis (opcjonalny)" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Wykonaj transfer</button>
            </form>
        </div>
    )
}

export default Transfers