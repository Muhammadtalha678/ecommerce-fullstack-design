import { ApiRoutes } from '@/constants/constant';
import { ApiResponse } from '@/interfaces/Auth';
import { FetchProductsResult, Product } from '@/interfaces/Product';
import React from 'react'
import EditProductComp from './EditProduct';
const fetchSingleProduct = async (id: string): Promise<FetchProductsResult> => {
    try {
        const response = await fetch(`${ApiRoutes.singleProduct}/${id}`)
        const responseData = await response.json()
        if (!response.ok) {
            return {
                product: null,
                errors: {
                    general: responseData.errors.general,
                },
            }
        }
        const {
            error, errors, data
        }: ApiResponse = responseData

        if (error) {
            return { product: null, errors: { general: errors.general } }
        }

        return { product: data?.foundProduct as Product, errors: null }
    } catch (error) {
        const err = error as Error
        return { product: null, errors: { general: err.message } }

    }
}
const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const { errors, product } = await fetchSingleProduct(id)

    if (errors) {
        return (
            <div className="flex flex-col items-center justify-center my-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
                <p className="text-gray-600">{errors.general}</p>
            </div>
        )
    }
    if (!product) {
        return (
            <h1 className="md:text-3xl text-2xl text-black font-extrabold mb-5 text-center my-5">
                No Product Found
            </h1>
        )
    }
    return (
        <EditProductComp product={product} />
    )
}

export default EditProduct 
