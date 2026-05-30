import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

function Transactions() {
    const [transactions, setTransactions] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('PLN')
    const [type, setType] = useState('expense')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        axiosInstance.get('/transaction')
            .then(response => setTransactions(response.data))

        axiosInstance.get('/subcategory')
            .then(response => setSubCategories(response.data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/transaction', {
                subCategoryId: parseInt(subCategoryId),
                amount: parseFloat(amount),
                currency,
                type,
                date: new Date(date).toISOString(),
                description
            })
            const response = await axiosInstance.get('/transaction')
            setTransactions(response.data)
            setAmount('')
            setDescription('')
            setDate('')
        } catch (error) {
            console.log('Błąd:', error)
        }
    }

    return (
        <div>
            <h1>Transakcje</h1>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.amount} {transaction.currency} — {transaction.type}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                    <option value="">Wybierz podkategorię</option>
                    {subCategories.map(sub => (
                        <option key={sub.id} value={sub.id}>
                            {sub.name}
                        </option>
                    ))}
                </select>
                <input type="number" placeholder="Kwota" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="PLN">PLN</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="expense">Wydatek</option>
                    <option value="income">Przychód</option>
                </select>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <input type="text" placeholder="Opis (opcjonalny)" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Dodaj transakcję</button>
            </form>
        </div>
    )
}

export default Transactions