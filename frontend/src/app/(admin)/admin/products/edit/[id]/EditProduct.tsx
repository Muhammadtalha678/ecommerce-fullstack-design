'use client'
import ProductForm from '@/components/Admin/ProductForm';
import { Product } from '@/interfaces/Product';
import React, { useState } from 'react'

const EditProductComp = ({ product }: { product: Product }) => {
  const [FormValues, setFormValues] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
  };
  return (
    <div>
      <ProductForm product={product} isEdit={true} onchange={onchange} />
    </div>
  )
}

export default EditProductComp
