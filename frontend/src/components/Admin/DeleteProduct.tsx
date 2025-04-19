'use client'
import { Product } from '@/interfaces/Product'
import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

const DeleteProduct = ({ id }: { id: string }) => {
    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?")
        if (confirmDelete) {
            const form = document.createElement('form')
            const formData = new FormData()
            formData.append('id', id)

        }
    }
    return (
        <button onClick={handleDelete}>
            <FiTrash2 className="text-red-600 hover:text-red-800 cursor-pointer" />
        </button>
    )
}

export default DeleteProduct
