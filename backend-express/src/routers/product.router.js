import express from 'express'
import { authenticateUser } from '../middlewares/authentication.middleware.js'
import { addProductController } from '../controllers/product.controller.js'
import { validateRequest } from '../middlewares/validateRequest.middleware.js'
import { ProductValidation } from '../lib/validations/product.validation.js'
import { authorizeAdmin } from '../middlewares/authorizeAdmin.middleware.js'
import {upload} from '../middlewares/upload.middleware.js'
const routers = express.Router()

const multipleUpload = upload.fields([
  { name: 'bannerImage', maxCount: 1 },
  { name: 'detailImages', maxCount: 4 },
]);
routers.post('/addProduct', authenticateUser,authorizeAdmin,multipleUpload,validateRequest(ProductValidation), addProductController)

export default routers
