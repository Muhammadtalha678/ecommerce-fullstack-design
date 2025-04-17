'use client';

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

function validateImageFile(file: File): string | null {
    if (!file.type.startsWith('image/')) {
        return `File "${file.name}" is not a valid image.`;
    }
    return null;
}

function validateFileSize(file: File): string | null {
    if (file.size > MAX_FILE_SIZE) {
        return `File "${file.name}" is too large. Max allowed size is 5MB.`;
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
    product,
}: {
    action?: (formData: FormData) => void;
    state?: ApiResponse;
    pending?: boolean;
    isEdit?: boolean;
    FormValues?: FormValues;
    onchange?: (e: ChangeEvent<HTMLInputElement>) => void;
    product?: Product;
}) => {
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [bannerFileError, setBannerFileError] = useState<string | null>(null);
    const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [detailFiles, setDetailFiles] = useState<File[]>([]);

    useEffect(() => {
        if (isEdit && product?.bannerImage && !bannerPreview) {
            setBannerPreview(product.bannerImage);
        }
        if (isEdit && product?.detailImages && detailPreviews.length === 0) {
            setDetailPreviews(product.detailImages);
        }

        return () => {
            if (bannerPreview) URL.revokeObjectURL(bannerPreview);
            detailPreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [bannerPreview, detailPreviews, isEdit, product]);

    const handleSubmit = async (formData: FormData) => {
        if (isEdit && product) {
            if (!bannerFile && product.bannerImage) {
                formData.append('existingBannerImage', product.bannerImage);
            }

            if (detailFiles.length === 0 && product.detailImages) {
                product.detailImages.forEach((url, index) => {
                    formData.append(`existingDetailImages[${index}]`, url);
                });
            }

            const fields: (keyof FormValues)[] = ['name', 'price', 'description', 'category', 'stock'];
            fields.forEach((field) => {
                const value = FormValues?.[field];
                if (value && value !== String(product[field])) {
                    formData.append(field, value);
                }
            });
        }

        if (bannerFile) formData.append('bannerImage', bannerFile);
        detailFiles.forEach((file, index) => {
            formData.append(`detailImages`, file);
        });

        if (action) {
            action(formData);
        }
    };

    return (
        <form action={handleSubmit} className="space-y-4" encType="multipart/form-data">
            {/* Input fields */}
            {['name', 'description', 'price', 'category', 'stock'].map((field) => (
                <div key={field}>
                    <label className="block mb-1 font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        type="text"
                        name={field}
                        value={
                            FormValues?.[field as keyof FormValues] ??
                            (isEdit ? product?.[field as keyof Product] : '') ??
                            ''
                        }
                        onChange={onchange} // ✅ This MUST be defined
                        required={!isEdit}
                        className="w-full border rounded px-3 py-2"
                    />
                    {state?.error && state.errors[field] && (
                        <p className="text-red-500 text-sm mt-1">
                            {state.errors[field]}
                        </p>
                    )}
                </div>
            ))}



            {/* Banner Image */}
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
                        if (typeError) {
                            toast.error(typeError);
                            setBannerFileError(typeError);
                            setBannerPreview(null);
                            setBannerFile(null);
                            e.target.value = '';
                            return;
                        }

                        const sizeError = validateFileSize(file);
                        if (sizeError) {
                            toast.error(sizeError);
                            setBannerFileError(sizeError);
                            setBannerPreview(null);
                            setBannerFile(null);
                            e.target.value = '';
                            return;
                        }

                        setBannerFileError(null);
                        setBannerFile(file);
                        setBannerPreview(URL.createObjectURL(file));
                    }}
                    className="w-full border rounded px-3 py-2"
                    required={!isEdit && !product?.bannerImage}
                />
                <p className="text-red-500 text-sm mt-2">
                    {bannerFileError || (state?.error && state.errors.bannerImage)}
                </p>
                {bannerPreview && (
                    <div className="mt-2">
                        <p className="text-sm">Preview:</p>
                        <img src={bannerPreview} alt="Banner preview" className="max-w-xs rounded" />
                    </div>
                )}
            </div>

            {/* Detail Images */}
            <div>
                <label className="block mb-1 font-medium">Detail Images (4 required)</label>
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
                            setDetailFiles([]);
                            e.target.value = '';
                            return;
                        }

                        for (const file of files) {
                            const typeError = validateImageFile(file);
                            if (typeError) {
                                toast.error(typeError);
                                setDetailError(typeError);
                                setDetailPreviews([]);
                                setDetailFiles([]);
                                e.target.value = '';
                                return;
                            }

                            const sizeError = validateFileSize(file);
                            if (sizeError) {
                                toast.error(sizeError);
                                setDetailError(sizeError);
                                setDetailPreviews([]);
                                setDetailFiles([]);
                                e.target.value = '';
                                return;
                            }
                        }

                        const previews = files.map((file) => URL.createObjectURL(file));
                        setDetailPreviews(previews);
                        setDetailFiles(files);
                        setDetailError(null);
                    }}
                    className="w-full border rounded px-3 py-2"
                    required={!isEdit && !product?.detailImages}
                />
                <p className="text-red-500 text-sm mt-2">
                    {detailError || (state?.error && state.errors.detailImages)}
                </p>
                {detailPreviews.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm">Selected:</p>
                        <div className="flex flex-wrap gap-2">
                            {detailPreviews.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Detail preview ${index + 1}`}
                                    className="max-w-[100px] rounded"
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
                {isEdit ? 'Update Product' : pending ? 'Processing...' : 'Add Product'}
            </button>
        </form>
    );
};

export default ProductForm;
