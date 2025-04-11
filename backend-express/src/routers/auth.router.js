import express from 'express'
import { validateRequest } from '../middlewares/validateRequest.middleware.js'
import {registerValidation} from '../lib/validations/auth.validation.js'

import { registerController, verifyEmailController } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/register', validateRequest(registerValidation), registerController)
router.post('/verify-email', verifyEmailController)

export default router