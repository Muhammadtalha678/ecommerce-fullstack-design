import express from 'express'
import { env } from './lib/configs/env.config.js'
import { connectDb } from './lib/db/connectDb.js'
import AuthRouter from './routers/auth.router.js'
import cors from 'cors'
const app = express()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], //allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies if needed
}))

app.use(express.json())

app.get('/', (req, res) => {
    return res.send('Hello World')    
})

connectDb()
    .then(() => {
        app.use('/api/auth',AuthRouter)
        app.listen(env.PORT, () => {
            console.log(`Project runnig on port ${env.PORT}`);
        })

    })
    .catch((error) => {
         console.log(error);
         
     })