import 'dotenv/config'

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_PORT:process.env.EMAIL_PORT,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    AUTH_SECRET:process.env.AUTH_SECRET 
}