
const DEV_URL = "http://localhost:5000"
const PROD_URL = process.env.PROD_URL
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL
export const ApiRoutes = {
    register: BASE_URL + '/api/auth/register'
}