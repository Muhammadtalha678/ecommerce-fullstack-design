const DEV_URL = "http://localhost:5000"
const PROD_URL = process.env.NEXT_PUBLIC_PROD_URL
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL
export const ApiRoutes = {
    register: `${BASE_URL}/api/auth/register`,
    login: `${BASE_URL}/api/auth/login`,
    verfiyEmail: `${BASE_URL}/api/auth/verify-email`,
    resendEmail: `${BASE_URL}/api/auth/resend-verification`,
    refreshToken: `${BASE_URL}/api/auth/refreshToken`,
    user: `${BASE_URL}/api/user/userInfo`,

    addProduct: `${BASE_URL}/api/product/addProduct`,
    getProducts: `${BASE_URL}/api/product/allProducts`,
    singleProduct: `${BASE_URL}/api/product/singleProduct`,
    editProduct: `${BASE_URL}/api/product/editProduct`,
    deleteProduct: `${BASE_URL}/api/product/deleteProduct`
}

