'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ProductForm = ({ initialData }: { initialData?: any }) => {
    const [form, setForm] = useState({
        name: initialData?.name || '',
        price: initialData?.price || '',
        image: initialData?.image || ''
    })

    const isEdit = !!initialData

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const url = isEdit ? `/api/products/${initialData._id}` : '/api/products'
        const method = isEdit ? 'PUT' : 'POST'

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            if (!res.ok) throw new Error('Failed to submit')

            toast.success(isEdit ? 'Product updated!' : 'Product added!')
        } catch (err) {
            toast.error('Something went wrong!')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                {isEdit ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    )
}

export default ProductForm
