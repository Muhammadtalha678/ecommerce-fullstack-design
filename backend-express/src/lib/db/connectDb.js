import mongoose from 'mongoose'
import { env } from '../configs/env.config.js'

export const connectDb = async() => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Db connect successfully");
        
    } catch (error) {
        console.log("error => ",error);
        process.exit(1);
    }
}