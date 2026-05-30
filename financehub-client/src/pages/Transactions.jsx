import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

function Transactions() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axiosInstance.get('/transaction')
            .then(response => setTransactions(response.data))
    }, [])

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
        </div>
    )
}

export default Transactions