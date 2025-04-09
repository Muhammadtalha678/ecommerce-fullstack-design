import express from 'express'
import { validateRequest } from '../middlewares/validateRequest.middleware.js'
import {registerValidation} from '../lib/validations/auth.validation.js'
const router = express.Router()

router.post('/register', validateRequest(registerValidation), (res, req) => {
    return res.send(req.body)
})

export default router