import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axiosInstance.get('/category')
            .then(response => setCategories(response.data))
    }, [])

    return (
        <div>
            <h1>Kategorie</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories