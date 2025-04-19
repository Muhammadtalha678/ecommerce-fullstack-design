'use client'
import React, { useActionState, useEffect } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { deleteProduct } from '@/actions/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';
const DeleteProduct = ({ id }: { id: string }) => {
    const router = useRouter();
    const [state, actionDelete, pending] = useActionState(deleteProduct, undefined);
    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?")
        if (confirmDelete) {
            const form = document.createElement('form')
            const formData = new FormData()
            formData.append('id', id)
            actionDelete(formData)
        }
    }
    useEffect(() => {
        if (state?.error) {
            toast.error(state.errors?.general || "Delete failed");
        } else if (state && !state.error) {
            toast.success(state?.data?.message as string || "Product deleted");
            router.push('/admin/products')
        }

    }, [state])
    return (

        <button disabled={pending} onClick={handleDelete}>
            <FiTrash2 className="text-red-600 hover:text-red-800 cursor-pointer" />
        </button>
    )
}

export default DeleteProduct
