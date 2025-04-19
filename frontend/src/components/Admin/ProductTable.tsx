import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { Product } from '@/interfaces/Product'
import DeleteProduct from './DeleteProduct'


const ProductTable = ({ products }: { products: Product[] }) => {
    return (
        <table className="min-w-full text-sm text-left">
            <thead>
                <tr className="border-b text-gray-600">
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, ind) => (
                    <tr key={ind} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                            <Image
                                src={product.bannerImage!}
                                alt={product.name!}
                                width={60}
                                height={60}
                                className="rounded"
                            />
                        </td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">${product.price}</td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3 flex items-center gap-4">
                            <Link href={`/admin/products/edit/${product._id}`}>
                                <FiEdit className="text-blue-600 hover:text-blue-800 cursor-pointer" />
                            </Link>
                            <DeleteProduct id={product._id!.toString()} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable
