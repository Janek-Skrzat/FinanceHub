import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import {
    PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', '#1e40af', '#bfdbfe', '#1e3a8a']

const PRESETS = [
    { label: 'Tydzień', days: 7 },
    { label: 'Miesiąc', days: 30 },
    { label: 'Kwartał', days: 90 },
    { label: 'Rok', days: 365 },
]

function Charts() {
    const [transactions, setTransactions] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [chartType, setChartType] = useState('pie')
    const [transactionType, setTransactionType] = useState('expense')
    const [preset, setPreset] = useState(30)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [generated, setGenerated] = useState(false)
    const [summary, setSummary] = useState(null)

    useEffect(() => {
        axiosInstance.get('/transaction').then(r => setTransactions(r.data))
        axiosInstance.get('/subcategory').then(r => setSubCategories(r.data))
    }, [])

    const getSubCategoryName = (id) => subCategories.find(s => s.id === id)?.name || `Podkat. ${id}`

    const getFiltered = () => {
        const now = new Date()
        const from = dateFrom ? new Date(dateFrom) : new Date(now - preset * 24 * 60 * 60 * 1000)
        const to = dateTo ? new Date(dateTo) : now
        return transactions.filter(t => {
            const d = new Date(t.date)
            return d >= from && d <= to && (transactionType === 'all' || t.type === transactionType)
        })
    }

    const handleGenerate = () => {
        setGenerated(true)
        const filtered = getFiltered()
        const total = filtered.reduce((sum, t) => sum + t.amount, 0)
        const grouped = filtered.reduce((acc, t) => {
            const key = getSubCategoryName(t.subCategoryId)
            const existing = acc.find(a => a.name === key)
            if (existing) existing.value += t.amount
            else acc.push({ name: key, value: t.amount })
            return acc
        }, []).sort((a, b) => b.value - a.value)
        const top = grouped[0]
        setSummary({ total, top, count: filtered.length })
    }

    const getChartData = () => {
        return getFiltered().reduce((acc, t) => {
            const key = getSubCategoryName(t.subCategoryId)
            const existing = acc.find(a => a.name === key)
            if (existing) existing.value += t.amount
            else acc.push({ name: key, value: t.amount })
            return acc
        }, []).sort((a, b) => b.value - a.value)
    }

    const getLineData = () => {
        const now = new Date()
        const from = dateFrom ? new Date(dateFrom) : new Date(now - preset * 24 * 60 * 60 * 1000)
        const to = dateTo ? new Date(dateTo) : now
        const filtered = transactions.filter(t => {
            const d = new Date(t.date)
            return d >= from && d <= to
        })
        const byDate = filtered.reduce((acc, t) => {
            const date = new Date(t.date).toLocaleDateString('pl-PL')
            if (!acc[date]) acc[date] = { date, income: 0, expense: 0 }
            if (t.type === 'income') acc[date].income += t.amount
            else acc[date].expense += t.amount
            return acc
        }, {})
        return Object.values(byDate).sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    const inputStyle = {
        padding: '7px 12px', borderRadius: '8px',
        border: '0.5px solid var(--border)', background: 'var(--bg-primary)',
        color: 'var(--text-primary)', fontSize: '12px', outline: 'none'
    }

    const chartData = getChartData()
    const lineData = getLineData()

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '16px' }}>Wykresy</h1>

                <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Typ wykresu</div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {[['pie', 'Kołowy', 'ti-chart-donut'], ['bar', 'Słupkowy', 'ti-chart-bar'], ['line', 'Liniowy', 'ti-chart-line']].map(([val, label, icon]) => (
                                    <button key={val} onClick={() => setChartType(val)} style={{
                                        padding: '6px 12px', borderRadius: '8px', border: '0.5px solid var(--border)',
                                        background: chartType === val ? 'var(--accent)' : 'var(--bg-primary)',
                                        color: chartType === val ? '#fff' : 'var(--text-secondary)',
                                        fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                                    }}>
                                        <i className={`ti ${icon}`} aria-hidden="true"></i> {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Typ transakcji</div>
                            <select style={inputStyle} value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                <option value="expense">Wydatki</option>
                                <option value="income">Przychody</option>
                                <option value="all">Wszystkie</option>
                            </select>
                        </div>

                        <div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Zakres</div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                {PRESETS.map(p => (
                                    <button key={p.days} onClick={() => { setPreset(p.days); setDateFrom(''); setDateTo('') }} style={{
                                        padding: '6px 10px', borderRadius: '8px', border: '0.5px solid var(--border)',
                                        background: preset === p.days && !dateFrom ? 'var(--accent)' : 'var(--bg-primary)',
                                        color: preset === p.days && !dateFrom ? '#fff' : 'var(--text-secondary)',
                                        fontSize: '12px', cursor: 'pointer'
                                    }}>
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Własny zakres</div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <input style={inputStyle} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>—</span>
                                <input style={inputStyle} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                            </div>
                        </div>

                        <button onClick={handleGenerate} style={{
                            padding: '8px 20px', borderRadius: '8px', border: 'none',
                            background: 'var(--accent)', color: '#fff',
                            fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '6px'
                        }}>
                            <i className="ti ti-refresh" aria-hidden="true"></i>
                            Generuj
                        </button>
                    </div>
                </div>
            </div>

            {generated && (
                <div>
                    <div style={{ padding: '20px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)', marginBottom: '12px' }}>
                        {chartData.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', padding: '40px 0' }}>
                                Brak danych dla wybranych filtrów
                            </div>
                        ) : chartType === 'pie' ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={110} dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip formatter={(v) => `${v.toLocaleString()} PLN`} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : chartType === 'bar' ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" tick={{ fill: '#5a7a9a', fontSize: 11 }} />
                                    <YAxis tick={{ fill: '#5a7a9a', fontSize: 11 }} />
                                    <Tooltip formatter={(v) => `${v.toLocaleString()} PLN`} />
                                    <Bar dataKey="value">
                                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineData}>
                                    <XAxis dataKey="date" tick={{ fill: '#5a7a9a', fontSize: 11 }} />
                                    <YAxis tick={{ fill: '#5a7a9a', fontSize: 11 }} />
                                    <Tooltip formatter={(v) => `${v.toLocaleString()} PLN`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#15803d" name="Przychody" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="expense" stroke="#b91c1c" name="Wydatki" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {summary && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Łącznie</div>
                                <div style={{ fontSize: '18px', fontWeight: '500', color: 'var(--accent)' }}>{summary.total.toLocaleString()} PLN</div>
                            </div>
                            <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Liczba transakcji</div>
                                <div style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>{summary.count}</div>
                            </div>
                            <div style={{ padding: '14px 16px', borderRadius: '10px', background: 'var(--bg-card)', border: '0.5px solid var(--border)' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Największa pozycja</div>
                                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                    {summary.top ? `${summary.top.name}: ${summary.top.value.toLocaleString()} PLN` : '—'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Charts