// components/Admin/AddProduct.tsx
'use client';

import { addProduct } from '@/actions/actions';
import ProductForm from '@/components/Admin/ProductForm';
import React, { ChangeEvent, useActionState, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const router = useRouter();
    const [state, addProdAction, pending] = useActionState(addProduct, undefined);
    const [formValues, setFormValues] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
    });

    const onchange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        console.log('AddProduct state:', state);

        if (state?.error) {
            if (state.errors?.general) {
                toast.error(state.errors.general);
                // Handle all authentication errors
                if (
                    state.errors.general.includes('token') ||
                    state.errors.general.includes('Session expired')
                ) {
                    Cookies.remove('token');
                    router.push('/login');
                }
            }
        } else if (state && !state.error) {
            toast.success(state?.data?.message || "Product added successfully");
            router.push('/admin/products');
        }
    }, [state]);

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <ProductForm
                action={addProdAction}
                FormValues={formValues}
                isEdit={false}
                onchange={onchange}
                pending={pending}
                state={state}
            />
        </div>
    );
};

export default AddProduct;