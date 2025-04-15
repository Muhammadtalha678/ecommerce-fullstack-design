import ProductForm from '@/components/Admin/ProductForm'
import React from 'react'

const AddProduct = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <ProductForm />
    </div>
  )
}

export default AddProduct
