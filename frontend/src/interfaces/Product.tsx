export interface Product {
    id: number;
    title: string;
    image: string;
    rating: number;
    orders: number;
    price: number;
    originalPrice?: number;
    shipping: string;
    description: string;
}
