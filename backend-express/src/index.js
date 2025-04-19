import express from 'express'
import { env } from './lib/configs/env.config.js'
import { connectDb } from './lib/db/connectDb.js'
import AuthRouter from './routers/auth.router.js'
import UserRouter from './routers/user.router.js'
import ProductRouter from './routers/product.router.js'
import CategoryRouter from './routers/category.router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: ["http://localhost:3000","https://ecommerce-fullstack-design-frontend.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], //allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, //Allow cookies if needed
}))

app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
    return res.send('Hello World')    
})

connectDb()
    .then(() => {
        app.use('/api/auth',AuthRouter)
        app.use('/api/user',UserRouter)
        app.use('/api/product',ProductRouter)
        app.use('/api/category',CategoryRouter)
        app.listen(env.PORT, () => {
            console.log(`Project runnig on port ${env.PORT}`);
        })

    })
    .catch((error) => {
         console.log(error);
         
     })