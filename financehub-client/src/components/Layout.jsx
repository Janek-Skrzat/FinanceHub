import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import '../theme.css'

function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(true)
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(prefersDark)
    }, [])

    const toggleMode = () => setIsDark(!isDark)
    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <div className={isDark ? 'dark' : 'light'} style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            fontFamily: 'Inter, system-ui, sans-serif',
        }}>
            <Sidebar
                isOpen={isOpen}
                onToggle={toggleSidebar}
                isDark={isDark}
                onToggleMode={toggleMode}
            />
            <main style={{
                flex: 1,
                padding: '24px',
                minWidth: 0,
                color: 'var(--text-primary)',
            }}>
                {children}
            </main>
        </div>
    )
}

export default Layout