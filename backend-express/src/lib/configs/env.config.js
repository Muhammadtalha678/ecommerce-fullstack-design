import 'dotenv/config'

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_PORT:process.env.EMAIL_PORT,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    AUTH_SECRET:process.env.AUTH_SECRET, 
    REFRESH_SECRET: process.env.AUTH_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
}