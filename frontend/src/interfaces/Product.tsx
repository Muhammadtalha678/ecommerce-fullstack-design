export interface Product {
    _id?: number;
    id?: number;
    title: string;
    name?: string;
    image?: string;
    rating?: number;
    orders?: number;
    price?: number | string;
    originalPrice?: number;
    shipping?: string;
    description?: string;
    bannerImage?: string;
    detailImages?: string[];
    category?: string
    stock?: string
}

