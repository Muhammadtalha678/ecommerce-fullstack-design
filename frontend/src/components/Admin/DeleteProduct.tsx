'use client'
import React, { useActionState, useEffect, useTransition } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { deleteProduct } from '@/actions/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';
const DeleteProduct = ({ id }: { id: string }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            const formData = new FormData();
            formData.append('id', id);

            startTransition(async () => {
                const result = await deleteProduct(formData);
                if (result?.error) {
                    toast.error(result.errors?.general || "Delete failed");
                } else {
                    toast.success(result.data?.message as string || "Product deleted");
                    router.push('/admin/products');
                }
            });
        }
    };

    return (
        isPending ? <h1>Processing...</h1> :
            <button onClick={handleDelete}>
                <FiTrash2 className="text-red-600 hover:text-red-800 cursor-pointer" />
            </button>
    );
}

export default DeleteProduct
