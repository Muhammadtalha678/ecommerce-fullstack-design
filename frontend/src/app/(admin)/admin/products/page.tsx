import Link from 'next/link'
import ProductTable from '@/components/Admin/ProductTable'
import { Product } from '@/interfaces/Product'
import { ApiRoutes } from '@/constants/constant'
import { cookies } from 'next/headers'

type FetchProductsResult =
    | { products: Product[]; errors: null }
    | { products: null; errors: { [key: string]: string | undefined } }

const fetchProducts = async (): Promise<FetchProductsResult> => {
    const token = (await cookies()).get('token')?.value

    try {
        const response = await fetch(ApiRoutes.getProducts, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            // Needed for SSR fetch in Next.js app dir
            cache: 'no-store',
        })

        const responseData = await response.json()
        console.log(responseData)

        if (!response.ok) {
            return {
                products: null,
                errors: {
                    general: `API request failed with status ${response.status}`,
                },
            }
        }

        const {
            error,
            errors,
            data,
        }: {
            error: boolean
            errors: { [key: string]: string | undefined }
            data: { message: string; products: Product[] }
        } = responseData

        if (error) {
            return { products: null, errors }
        }

        return { products: data.products, errors: null }
    } catch (error) {
        const err = error as Error
        return { products: null, errors: { general: err.message } }
    }
}

const AdminProducts = async () => {
    const { products, errors } = await fetchProducts()

    if (errors) {
        return (
            <div className="flex flex-col items-center justify-center my-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
                <p className="text-gray-600">{errors.general}</p>
            </div>
        )
    }

    if (!products || products.length === 0) {
        return (
            <h1 className="md:text-3xl text-2xl text-black font-extrabold mb-5 text-center my-5">
                No Product Found
            </h1>
        )
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <Link
                    href="/admin/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Product
                </Link>
            </div>

            <div className="overflow-x-auto">
                <ProductTable products={products} />
            </div>

            {/* Pagination - Add later if needed */}
        </div>
    )
}

export default AdminProducts
