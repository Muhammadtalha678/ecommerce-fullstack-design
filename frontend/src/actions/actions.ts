'use server'

import { ApiRoutes } from "@/constants/constant";
import { ApiResponse } from "@/interfaces/Auth";
import { cookies } from 'next/headers'

export const register = async (state: ApiResponse | undefined, formData: FormData): Promise<ApiResponse> => {
    const registerData = {
        fullname: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    }
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(ApiRoutes.register, {
            signal: controller.signal, // ✅ Needed for timeout to work
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(registerData)
        })
        clearTimeout(timeoutId)
        const data = await response.json()
        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || {},
                data: null,
            };
        }

        return {
            error: false, errors: {}, data: data.data
        }
    } catch (error) {
        const err = error as Error
        const timeout = err.name === "AbortError";

        return {
            error: true,
            errors: {
                general: timeout ? "Request timed out" : err.message || "An error occurred",
            },
            data: null,
        };
    }

}



export const verifyEmailAction = async (state: ApiResponse | undefined, formData: FormData): Promise<ApiResponse> => {

    const verifyEmailData = {
        otp: formData.get('otp'),
        email: formData.get('email')
    }
    const otp = verifyEmailData.otp?.toString() ?? "";

    if (otp.length !== 6) {
        return {
            error: true,
            errors: { otp: "Please enter a valid 6-digit OTP." },
            data: null,
        };
    }
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(ApiRoutes.verfiyEmail, {
            signal: controller.signal, // ✅ Needed for timeout to work
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(verifyEmailData)
        })
        clearTimeout(timeoutId)
        const data = await response.json()
        console.log(data);

        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || {},
                data: null,
            };
        }

        return {
            error: false, errors: {}, data: data.data
        }
    } catch (error) {
        const err = error as Error
        const timeout = err.name === "AbortError";

        return {
            error: true,
            errors: {
                general: timeout ? "Request timed out" : err.message || "An error occurred",
            },
            data: null,
        };
    }
}

export const login = async (state: ApiResponse | undefined, formData: FormData): Promise<ApiResponse> => {
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password'),
    }
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(ApiRoutes.login, {
            signal: controller.signal, // ✅ Needed for timeout to work
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(loginData)
        })
        clearTimeout(timeoutId)
        const data = await response.json()
        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || {},
                data: null,
            };
        }

        return {
            error: false, errors: {}, data: data.data
        }
    } catch (error) {
        const err = error as Error
        const timeout = err.name === "AbortError";

        return {
            error: true,
            errors: {
                general: timeout ? "Request timed out" : err.message || "An error occurred",
            },
            data: null,
        };
    }
}


export const addProduct = async (
    state: ApiResponse | undefined,
    formData: FormData
): Promise<ApiResponse> => {

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    console.log('FormData entries:', Array.from(formData.entries()));
    const productData = {
        name: formData.get('name') as string | null,
        price: formData.get('price') as string | null,
        description: formData.get('description') as string | null,
        category: formData.get('category') as string | null,
        stock: formData.get('stock') as string | null,
        bannerImage: formData.get('bannerImage') as File | null,
        detailImages: formData.getAll('detailImages') as File[],
    };

    const errors: { [key: string]: string | undefined } = {};

    // Basic validation
    if (!productData.name) errors.name = 'Product name is required';
    if (!productData.price) errors.price = 'Price is required';
    if (!productData.description) errors.description = 'Description is required';
    if (!productData.category) errors.category = 'Category is required';
    if (!productData.stock) errors.stock = 'Stock is required';
    if (!productData.bannerImage || productData.bannerImage.size === 0)
        errors.bannerImage = 'Banner image is required';
    if (productData.detailImages.length !== 4)
        errors.detailImages = 'Exactly 4 detail images are required';

    // Validate banner image
    if (productData.bannerImage) {
        const banner = productData.bannerImage;
        if (!ACCEPTED_IMAGE_TYPES.includes(banner.type)) {
            errors.bannerImage = 'Only JPG, PNG, or image files are allowed';
        } else if (banner.size > MAX_FILE_SIZE) {
            errors.bannerImage = 'Banner image must be less than or equal to 5MB';
        }
    }

    // Validate detail images
    for (const image of productData.detailImages) {
        if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
            errors.detailImages = 'All detail images must be image files (JPG, PNG, etc.)';
            break;
        }
        if (image.size > MAX_FILE_SIZE) {
            errors.detailImages = 'Each detail image must be less than or equal to 5MB';
            break;
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            error: true,
            errors,
            data: null,
        };
    }

    const accessToken = (await cookies()).get('token')?.value;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(ApiRoutes.addProduct, {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: formData,
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {
                error: true,
                errors: { general: `Invalid response: ${response.status} ${response.statusText}` },
                data: null,
            };
        }

        const data = await response.json();

        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || { general: 'Failed to add product' },
                data: null,
            };
        }

        return {
            error: false,
            errors: {},
            data: data.data,
        };
    } catch (error) {
        const err = error as Error;
        const timeout = err.name === 'AbortError';

        return {
            error: true,
            errors: {
                general: timeout ? 'Request timed out' : err.message || 'An error occurred',
            },
            data: null,
        };
    }
};


export const editProduct = async (
    state: ApiResponse | undefined,
    formData: FormData
): Promise<ApiResponse> => {

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    const id = formData.get('id') as string
    const productData = {
        id: id,
        name: formData.get('name') as string | null,
        price: formData.get('price') as string | null,
        description: formData.get('description') as string | null,
        category: formData.get('category') as string | null,
        stock: formData.get('stock') as string | null,
        bannerImage: formData.get('bannerImage') as File | null,
        detailImages: formData.getAll('detailImages') as File[],
        existingBannerImage: formData.get('existingBannerImage') as string | null,
        existingDetailImages: formData.get('existingDetailImages') as string | null,
    };

    const errors: { [key: string]: string | undefined } = {};

    // === Basic field validation ===
    if (!productData.id) errors.id = 'Product id is required';
    if (!productData.name) errors.name = 'Product name is required';
    if (!productData.price) errors.price = 'Price is required';
    if (!productData.description) errors.description = 'Description is required';
    if (!productData.category) errors.category = 'Category is required';
    if (!productData.stock) errors.stock = 'Stock is required';

    // === Banner image validation ===
    const isUploadingNewBanner = productData.bannerImage && productData.bannerImage.size > 0;
    const hasExistingBanner = !!productData.existingBannerImage;

    if (!isUploadingNewBanner && !hasExistingBanner) {
        errors.bannerImage = 'Banner image is required';
    } else if (isUploadingNewBanner) {
        if (!ACCEPTED_IMAGE_TYPES.includes(productData.bannerImage!.type)) {
            errors.bannerImage = 'Only JPG, PNG, or image files are allowed';
        } else if (productData.bannerImage!.size > MAX_FILE_SIZE) {
            errors.bannerImage = 'Banner image must be less than or equal to 5MB';
        }
    }

    // === Detail images validation ===
    const isUploadingNewDetails = productData.detailImages.length > 0 && productData.detailImages[0].size > 0;
    const hasExistingDetails = productData.existingDetailImages && JSON.parse(productData.existingDetailImages).length === 4;

    if (!isUploadingNewDetails && !hasExistingDetails) {
        errors.detailImages = 'Exactly 4 detail images are required';
    } else if (isUploadingNewDetails) {
        if (productData.detailImages.length !== 4) {
            errors.detailImages = 'Exactly 4 detail images must be uploaded';
        } else {
            for (const image of productData.detailImages) {
                if (!ACCEPTED_IMAGE_TYPES.includes(image.type)) {
                    errors.detailImages = 'All detail images must be valid image files';
                    break;
                }
                if (image.size > MAX_FILE_SIZE) {
                    errors.detailImages = 'Each detail image must be less than or equal to 5MB';
                    break;
                }
            }
        }
    }

    if (Object.keys(errors).length > 0) {
        return {
            error: true,
            errors,
            data: null,
        };
    }

    const accessToken = (await cookies()).get('token')?.value;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(`${ApiRoutes.editProduct}/${id}`, {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: formData,
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {
                error: true,
                errors: { general: `Invalid response: ${response.status} ${response.statusText}` },
                data: null,
            };
        }

        const data = await response.json();

        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || { general: 'Failed to add product' },
                data: null,
            };
        }

        return {
            error: false,
            errors: {},
            data: data.data,
        };
    } catch (error) {
        const err = error as Error;
        const timeout = err.name === 'AbortError';

        return {
            error: true,
            errors: {
                general: timeout ? 'Request timed out' : err.message || 'An error occurred',
            },
            data: null,
        };
    }
};


export const deleteProduct = async (
    formData: FormData
): Promise<ApiResponse> => {
    const id = formData.get('id') as string
    const errors: { [key: string]: string | undefined } = {};

    if (!id) errors.id = 'Product id is required';

    if (Object.keys(errors).length > 0) {
        return {
            error: true,
            errors,
            data: null,
        };
    }

    const accessToken = (await cookies()).get('token')?.value;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(`${ApiRoutes.deleteProduct}/${id}`, {
            signal: controller.signal,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: formData,
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {
                error: true,
                errors: { general: `Invalid response: ${response.status} ${response.statusText}` },
                data: null,
            };
        }

        const data = await response.json();

        if (!response.ok) {
            return {
                error: true,
                errors: data.errors || { general: 'Failed to delete product' },
                data: null,
            };
        }

        return {
            error: false,
            errors: {},
            data: { data: "nksndksd" },
        };
    } catch (error) {
        const err = error as Error;
        const timeout = err.name === 'AbortError';

        return {
            error: true,
            errors: {
                general: timeout ? 'Request timed out' : err.message || 'An error occurred',
            },
            data: null,
        };
    }
};

