
const DEV_URL = "http://localhost:5000/"
const PROD_URL = process.env.PROD_URL

export const ApiRoutes = {
    register: PROD_URL + '/api/auth/register'
}