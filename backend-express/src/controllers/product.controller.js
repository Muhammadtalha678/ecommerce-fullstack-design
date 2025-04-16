// backend/controllers/product.controller.js
import { sendResponse } from '../helpers/sendResponse.js';
import ProductModal from '../modals/product.modal.js';
import cloudinary from '../lib/configs/cloudinary.config.js';

const addProductController = async (req, res) => {
  try {
    const files = req.files;
    // console.log('addProductController: Files:', files);

    if (!files || !files.bannerImage || files.bannerImage.length === 0) {
      return sendResponse(res, 400, true, { bannerImage: 'Banner image is required' }, null);
    }

    if (!files.detailImages || files.detailImages.length < 4) {
      return sendResponse(res, 400, true, { detailImages: '4 detail image is required' }, null);
    }

    if (files.detailImages.length > 4) {
      return sendResponse(res, 400, true, { detailImages: 'Maximum of 4 detail images allowed' }, null);
    }

    const { name, price, description, category, stock } = req.body;
    const bannerImageFile = files.bannerImage[0];
    const detailImagesFiles = files.detailImages;

    const bannerUpload = await cloudinary.uploader.upload(
      bannerImageFile.path, {
        folder:"ecommerce-internship"
      }
    )

    const detailUpload = detailImagesFiles.map((image) => 
     cloudinary.uploader.upload(image.path,{folder:"ecommerce-internship"}))

    const detailUploads = await Promise.all(detailUpload)
    const savedProduct = await ProductModal.create({
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      bannerImage: bannerUpload.secure_url,
      detailImages: detailUploads.map((upload) => upload.secure_url),
    });

    return sendResponse(res, 200, false, {}, { product: savedProduct, message: 'Product added successfully' });
  } catch (error) {
    console.error('Add product error:', error.message, error.stack);
    if (error instanceof multer.MulterError) {
      return sendResponse(res, 400, true, { general: error.message }, null);
    }
    if (error.message === 'Only image files are allowed!') {
      return sendResponse(res, 400, true, { bannerImage: error.message, detailImages: error.message }, null);
    }
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
};

export { addProductController };