'use client'

import { ApiResponse } from '@/interfaces/Auth';
import React, { ChangeEvent } from 'react'

interface FormValues {
    name?: string
    price?: string
    description?: string
    category?: string
    stock?: string
}

const ProductForm = ({ action, state, pending, isEdit = false, FormValues, onchange }:
    {
        action?: (formData: FormData) => void,
        state?: ApiResponse,
        pending?: boolean | undefined,
        isEdit?: boolean,
        FormValues?: FormValues,
        onchange?: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
    return (
        <form action={action} className="space-y-4" encType="multipart/form-data"
        >
            <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={FormValues?.name}
                    onChange={onchange}
                    // required
                    className="w-full border rounded px-3 py-2"
                />
                <p className=" text-red-500 text-sm mt-6">
                    {
                        state?.error && state.errors.name && state.errors.name
                    }
                </p>
            </div>
            <div>
                <label className="block mb-1 font-medium">Description</label>
                <input
                    type="text"
                    name="description"
                    value={FormValues?.description}
                    onChange={onchange}
                    // required
                    className="w-full border rounded px-3 py-2"
                />
                <p className=" text-red-500 text-sm mt-6">
                    {
                        state?.error && state.errors.description && state.errors.description
                    }
                </p>
            </div>
            <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                    type="text"
                    name="price"
                    value={FormValues?.price}
                    onChange={onchange}
                    // required
                    className="w-full border rounded px-3 py-2"
                />
                <p className=" text-red-500 text-sm mt-6">
                    {
                        state?.error && state.errors.price && state.errors.price
                    }
                </p>
            </div>
            <div>
                <label className="block mb-1 font-medium">Category</label>
                <input
                    type="text"
                    name="category"
                    value={FormValues?.category}
                    onChange={onchange}
                    // required
                    className="w-full border rounded px-3 py-2"
                />
                <p className=" text-red-500 text-sm mt-6">
                    {
                        state?.error && state.errors.category && state.errors.category
                    }
                </p>
            </div>
            <div>
                <label className="block mb-1 font-medium">Stock</label>
                <input
                    type="text"
                    name="stock"
                    value={FormValues?.stock}
                    onChange={onchange}
                    // required
                    className="w-full border rounded px-3 py-2"
                />
                <p className=" text-red-500 text-sm mt-6">
                    {
                        state?.error && state.errors.stock && state.errors.stock
                    }
                </p>
            </div>

            {/* File inputs */}
            <div>
                <label className="block mb-1 font-medium">Banner Image</label>
                <input
                    type="file"
                    name="bannerImage"
                    accept="image/*"
                    // required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            {/* DETAIL IMAGES */}
            <div>
                <label className="block mb-1 font-medium">Detail Images (4 max)</label>
                <input
                    type="file"
                    name="detailImages"
                    accept="image/*"
                    multiple
                    // required
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={pending}>
                {isEdit ? 'Update Product' : pending ? "Processing..." : 'Add Product'}
            </button>
        </form>
    )
}

export default ProductForm
