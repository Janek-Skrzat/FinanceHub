import { createContext, useState, useContext } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const showToast = (message, type = 'success') => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => removeToast(id), 3000)
    }

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id))

    }

    return (
        <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)