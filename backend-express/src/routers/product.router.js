// backend/routes/product.routes.js
import express from 'express';
import { authenticateUser } from '../middlewares/authentication.middleware.js';
import { addProductController,getProductController } from '../controllers/product.controller.js';
import { authorizeAdmin } from '../middlewares/authorizeAdmin.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const routers = express.Router();

const multipleUpload = upload.fields([
  { name: 'bannerImage', maxCount: 1 },
  { name: 'detailImages', maxCount: 4 },
]);

routers.post('/addProduct',authenticateUser,authorizeAdmin,multipleUpload,addProductController);
routers.get('/allProducts',authenticateUser,authorizeAdmin,getProductController)


export default routers;