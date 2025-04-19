'use client'
import { editProduct } from '@/actions/actions';
import ProductForm from '@/components/Admin/ProductForm';
import { Product } from '@/interfaces/Product';
import React, { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const EditProductComp = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [state, editProdAction, pending] = useActionState(editProduct, undefined);
  const [FormValues, setFormValues] = useState({
    name: product?.name || '',
    price: product.price?.toString() || '',
    description: product.description || '',
    category: product.category || '',
    stock: product.stock || ''
  });
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
  };
  useEffect(() => {
    console.log('EditProduct state:', state);

    if (state?.error) {
      if (state?.errors?.id) {
        toast.error(state?.errors?.id)
      }
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
      toast.success(state?.data?.message as string || "Product Edit successfully");
      router.push('/admin/products');
    }
  }, [state]);

  return (
    <div>
      <ProductForm product={product} isEdit={true} onchange={onchange} action={editProdAction} state={state} pending={pending} FormValues={FormValues} />
    </div>
  )
}

export default EditProductComp
