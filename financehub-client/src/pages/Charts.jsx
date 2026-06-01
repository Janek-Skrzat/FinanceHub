import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#1d4ed8', '#1e40af', '#1e3a8a']

function Charts() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axiosInstance.get('/transaction')
            .then(response => setTransactions(response.data))
    }, [])

    const expenseData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            const key = `Podkat. ${t.subCategoryId}`
            const existing = acc.find(a => a.name === key)
            if (existing) existing.value += t.amount
            else acc.push({ name: key, value: t.amount })
            return acc
        }, [])

    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    const barData = [
        { name: 'Przychody', value: income, fill: '#15803d' },
        { name: 'Wydatki', value: expense, fill: '#b91c1c' },
    ]

    return (
        <div>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Wykresy</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>
                        Wydatki według kategorii
                    </div>
                    {expenseData.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '40px 0' }}>Brak danych</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie data={expenseData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {expenseData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value.toLocaleString()} PLN`} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>
                        Przychody vs Wydatki
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" tick={{ fill: '#5a7a9a', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#5a7a9a', fontSize: 12 }} />
                            <Tooltip formatter={(value) => `${value.toLocaleString()} PLN`} />
                            <Bar dataKey="value">
                                {barData.map((entry, index) => (
                                    <Cell key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Charts