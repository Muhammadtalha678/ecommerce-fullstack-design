import express from 'express'
import { validateRequest } from '../middlewares/validateRequest.middleware.js'
import {loginValidation, registerValidation} from '../lib/validations/auth.validation.js'

import { loginController, registerController, resendEmailController, verifyEmailController } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/register', validateRequest(registerValidation), registerController)
router.post('/login', validateRequest(loginValidation), loginController)
router.post('/verify-email', verifyEmailController)
router.post('/resend-verification', resendEmailController)

export default router