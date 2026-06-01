import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
    { path: '/dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard' },
    { path: '/transactions', icon: 'ti-arrows-exchange', label: 'Transakcje' },
    { path: '/accounts', icon: 'ti-wallet', label: 'Konta' },
    { path: '/transfers', icon: 'ti-transfer', label: 'Transfery' },
    { path: '/categories', icon: 'ti-tag', label: 'Kategorie' },
    { path: '/goals', icon: 'ti-target', label: 'Cele' },
    { path: '/liabilities', icon: 'ti-credit-card', label: 'Zobowiązania' },

]

function Sidebar({ isOpen, onToggle, isDark, onToggleMode }) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div style={{
            width: isOpen ? '190px' : '52px',
            transition: 'width 0.25s',
            background: 'var(--bg-sidebar)',
            borderRight: '0.5px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexShrink: 0,
        }}>
            <div style={{ padding: '14px 10px 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={onToggle} style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    border: 'none', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    background: 'var(--bg-primary)', color: 'var(--text-muted)'
                }}>
                    <i className="ti ti-menu-2" style={{ fontSize: '16px' }} aria-hidden="true"></i>
                </button>
                {isOpen && (
                    <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        Finance<span style={{ color: 'var(--accent)' }}>Hub</span>
                    </span>
                )}
            </div>

            <nav style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                {navItems.map(item => {
                    const isActive = location.pathname === item.path
                    return (
                        <div
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '8px 10px', borderRadius: '8px', cursor: 'pointer',
                                background: isActive ? 'var(--nav-active-bg)' : 'transparent',
                                color: isActive ? 'var(--nav-active-text)' : 'var(--text-secondary)',
                                transition: 'all 0.15s',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <i className={`ti ${item.icon}`} style={{
                                fontSize: '16px', flexShrink: 0,
                                color: isActive ? 'var(--accent)' : 'inherit'
                            }} aria-hidden="true"></i>
                            {isOpen && <span style={{ fontSize: '12px' }}>{item.label}</span>}
                        </div>
                    )
                })}
            </nav>

            <div style={{ padding: '8px' }}>
                <button onClick={onToggleMode} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 10px', borderRadius: '8px', border: 'none',
                    cursor: 'pointer', background: 'transparent',
                    color: 'var(--text-secondary)', fontSize: '12px',
                    whiteSpace: 'nowrap', overflow: 'hidden'
                }}>
                    <i className={`ti ${isDark ? 'ti-sun' : 'ti-moon'}`}
                        style={{ fontSize: '16px', flexShrink: 0 }} aria-hidden="true"></i>
                    {isOpen && <span>{isDark ? 'Jasny tryb' : 'Ciemny tryb'}</span>}
                </button>
            </div>
        </div>
    )
}

export default Sidebar