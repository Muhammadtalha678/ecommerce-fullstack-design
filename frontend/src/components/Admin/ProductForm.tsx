'use client'

import { ApiResponse } from '@/interfaces/Auth';
import { Product } from '@/interfaces/Product';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface FormValues {
    name?: string;
    price?: string;
    description?: string;
    category?: string;
    stock?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Utility function to validate file type
function validateImageFile(file: File): string | null {
    if (!file.type.startsWith('image/')) {
        return `File "${file.name}" is not a valid image.`;
    }
    return null;
}
function validateFileSize(file: File): string | null {
    if (file.size > MAX_FILE_SIZE) {
        return `File "${file.name}" is too large. Max allowed size is 10MB.`;
    }
    return null;
}

const ProductForm = ({
    action,
    state,
    pending,
    isEdit = false,
    FormValues,
    onchange,
    product
}: {
    action?: (formData: FormData) => void;
    state?: ApiResponse;
    pending?: boolean | undefined;
    isEdit?: boolean;
    FormValues?: FormValues;
    onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
    product?: Product
}) => {
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [bannerFileError, setBannerFileError] = useState<string | null>(null);
    const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [existingBannerUrl, setExistingBannerUrl] = useState<string | null>(null);
    const [existingDetailUrls, setExistingDetailUrls] = useState<string[]>([]);

    useEffect(() => {
        if (isEdit && product) {
            setExistingBannerUrl(product.bannerImage || null);
            setExistingDetailUrls(product.detailImages || []);
        }

        return () => {
            if (bannerPreview) URL.revokeObjectURL(bannerPreview);
            detailPreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [isEdit, product, bannerPreview, detailPreviews]);
    return (
        <form action={action} className="space-y-4" encType="multipart/form-data">
            {/* ... your input fields for name, description, etc ... */}
            {isEdit &&
                <input type="hidden" value={product?._id} name='id' />
            }
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
            {/* BANNER IMAGE */}
            <div>
                <label className="block mb-1 font-medium">Banner Image</label>
                <input
                    type="file"
                    name="bannerImage"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const typeError = validateImageFile(file);
                        const sizeError = validateFileSize(file);

                        if (typeError || sizeError) {
                            const err = typeError || sizeError;
                            toast.error(err!);
                            setBannerFileError(err);
                            setBannerPreview(null);
                            e.target.value = '';
                            return;
                        }

                        setBannerFileError(null);
                        setBannerPreview(URL.createObjectURL(file));
                    }}
                    className="w-full border rounded px-3 py-2"
                />
                {isEdit && !bannerPreview && existingBannerUrl && (
                    <input type="hidden" name="existingBannerImage" value={existingBannerUrl} />
                )}
                <p className="text-red-500 text-sm mt-2">
                    {bannerFileError ||
                        (state?.error && state.errors.bannerImage)}
                </p>
                {(bannerPreview || existingBannerUrl) && (
                    <div className="mt-2">
                        <p className="text-sm">Selected:</p>
                        <img
                            src={bannerPreview || existingBannerUrl!}
                            alt="Banner preview"
                            className="max-w-xs rounded"
                        />
                    </div>
                )}
            </div>

            {/* Detail Images */}
            <div>
                <label className="block mb-1 font-medium">Detail Images (4 max)</label>
                <input
                    type="file"
                    name="detailImages"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        const files = Array.from(e.target.files || []);

                        if (files.length !== 4) {
                            const msg = 'Please select exactly 4 images.';
                            toast.error(msg);
                            setDetailError(msg);
                            setDetailPreviews([]);
                            return;
                        }

                        for (const file of files) {
                            const typeError = validateImageFile(file);
                            const sizeError = validateFileSize(file);

                            if (typeError || sizeError) {
                                const err = typeError || sizeError;
                                toast.error(err!);
                                setDetailError(err);
                                e.target.value = '';
                                return;
                            }
                        }

                        const previews = files.map((file) => URL.createObjectURL(file));
                        setDetailPreviews(previews);
                        setDetailError(null);
                    }}
                    className="w-full border rounded px-3 py-2"
                />
                {isEdit && detailPreviews.length === 0 && existingDetailUrls.length === 4 && (
                    <input type="hidden" name="existingDetailImages" value={JSON.stringify(existingDetailUrls)} />
                )}
                <p className="text-red-500 text-sm mt-2">
                    {detailError ||
                        (state?.error && state.errors.detailImages)}
                </p>
                {(detailPreviews.length > 0 || existingDetailUrls.length > 0) && (
                    <div className="mt-2">
                        <p className="text-sm">Selected:</p>
                        <div className="flex flex-wrap gap-2">
                            {(detailPreviews.length > 0 ? detailPreviews : existingDetailUrls).map((url, i) => (
                                <img
                                    key={i}
                                    src={url}
                                    className="max-w-[100px] rounded"
                                    alt={`Detail ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>



            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                disabled={pending}
            >
                {isEdit ? pending ? 'Processing...' : 'Update Product' : pending ? 'Processing...' : 'Add Product'}
            </button>
        </form>
    );
};

export default ProductForm;
