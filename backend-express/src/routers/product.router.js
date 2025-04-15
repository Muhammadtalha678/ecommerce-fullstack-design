import express from 'express'
import { authenticateUser } from '../middlewares/authentication.middleware.js'
import { addProductController } from '../controllers/product.controller.js'
import { validateRequest } from '../middlewares/validateRequest.middleware.js'
import { ProductValidation } from '../lib/validations/product.validation.js'
import { authorizeAdmin } from '../middlewares/authorizeAdmin.middleware.js'

const routers = express.Router()

routers.post('/addProduct', authenticateUser,authorizeAdmin,validateRequest(ProductValidation), addProductController)

export default routers
