import express from 'express'
import { env } from './lib/configs/env.config.js'
import { connectDb } from './lib/db/connectDb.js'
import AuthRouter from './routers/auth.router.js'
const app = express()
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