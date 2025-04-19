// backend/controllers/product.controller.js
import { sendResponse } from '../helpers/sendResponse.js';
import ProductModal from '../modals/product.modal.js';
import cloudinary from '../lib/configs/cloudinary.config.js';
import mongoose from 'mongoose'
import { extractPublicId } from '../helpers/extractPublicId.js';
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
    if (error instanceof multer.MulterError) {
      return sendResponse(res, 400, true, { general: error.message }, null);
    }
    if (error.message === 'Only image files are allowed!') {
      return sendResponse(res, 400, true, { bannerImage: error.message, detailImages: error.message }, null);
    }
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await ProductModal.find()
    return sendResponse(res, 200, false, {}, { message: "Product fetch successfully",products});

  } catch (error) {
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
}

const singleProductController = async(req,res) => {
  try {
    const { prodId } = req.params
    if (!prodId || !mongoose.Types.ObjectId.isValid(prodId)) {
      return sendResponse(res, 400, true, { general: "Invalid Product ID" }, null);
    }
    const foundProduct = await ProductModal.findById(prodId)
    // console.log(prodId);
    
    if (!foundProduct) {
      return sendResponse(res, 404, true, { general: "No prouct found" }, null);
    }
    return sendResponse(res, 200,false,{}, {foundProduct,message:"Product Found Successfully"});
  } catch (error) {
    return sendResponse(res, 500, true, { general: error.message }, null);
    
  }
}
const editProductController = async(req,res) => {
  try {
    console.log(req.files);
    
    const { editId } = req.params
    if (!editId || !mongoose.Types.ObjectId.isValid(editId)) {
      return sendResponse(res, 400, true, { general: "Invalid Product ID" }, null);
    }
    const foundProduct = await ProductModal.findById(editId)
    if (!foundProduct) {
      return sendResponse(res, 404, true, { general: "No prouct found" }, null);
    }
    // console.log('addProductController: Files:', files);
    const files = req.files;
    const {name, price, description, category, stock} = req.body
    
    let bannerImageUrl = foundProduct.bannerImage
    let detailImageUrls = foundProduct.detailImages
    // Centralized image logic
if (files?.bannerImage?.length && files?.detailImages?.length) {
  // Delete old images first
  await cloudinary.uploader.destroy(extractPublicId(bannerImageUrl));
  await Promise.all(
    detailImageUrls.map((url) => cloudinary.uploader.destroy(extractPublicId(url)))
  );

  // Upload new banner
  const bannerImageFile = files.bannerImage[0];
  const bannerUpload = await cloudinary.uploader.upload(
    bannerImageFile.path,
    { folder: 'ecommerce-internship' }
  );
  bannerImageUrl = bannerUpload.secure_url;

  // Upload new detail images
  const detailImagesFiles = files.detailImages;
  if (detailImagesFiles.length !== 4) {
    return sendResponse(res, 400, true, {
      detailImages: 'Exactly 4 detail images required if updating',
    }, null);
  }
  const detailUploads = await Promise.all(
    detailImagesFiles.map((img) =>
      cloudinary.uploader.upload(img.path, { folder: 'ecommerce-internship' })
    )
  );
  detailImageUrls = detailUploads.map((upload) => upload.secure_url);
}

// Or separately handle each
else if (files?.bannerImage?.length) {
  await cloudinary.uploader.destroy(extractPublicId(bannerImageUrl));
  const bannerImageFile = files.bannerImage[0];
  const bannerUpload = await cloudinary.uploader.upload(
    bannerImageFile.path,
    { folder: 'ecommerce-internship' }
  );
  bannerImageUrl = bannerUpload.secure_url;
}

else if (files?.detailImages?.length) {
  if (files.detailImages.length !== 4) {
    return sendResponse(res, 400, true, {
      detailImages: 'Exactly 4 detail images required if updating',
    }, null);
  }
  await Promise.all(
    detailImageUrls.map((url) => cloudinary.uploader.destroy(extractPublicId(url)))
  );
  const detailUploads = await Promise.all(
    files.detailImages.map((img) =>
      cloudinary.uploader.upload(img.path, { folder: 'ecommerce-internship' })
    )
  );
  detailImageUrls = detailUploads.map((upload) => upload.secure_url);
}

    
    await foundProduct.updateOne({
        name,
        price: parseFloat(price),
        description,
        category,
        stock: parseInt(stock),
        bannerImage: bannerImageUrl,
        detailImages: detailImageUrls,
    })
    
    // console.log(prodId);
    
    return sendResponse(res, 200,false,{}, {message:"Product Update Successfully"});
  } catch (error) {
    return sendResponse(res, 500, true, { general: error.message }, null);
    
  }
}

const deleteProductController = async (req, res) => {
  try {
    const { deleteId } = req.params
  if (!deleteId || !mongoose.Types.ObjectId.isValid(deleteId)) {
      return sendResponse(res, 400, true, { general: "Invalid Product ID" }, null);
    }
    
    const findProduct = await ProductModal.findById(deleteId)
    
    if (!findProduct) {
      return sendResponse(res, 404, true, { general: "No prouct found" }, null);
    }
    
    const bannerImageUrl = findProduct.bannerImage
  const detailImageUrls = findProduct.detailImages

    if (bannerImageUrl && detailImageUrls.length) {
         // delete Old banner Images
     await cloudinary.uploader.destroy(extractPublicId(bannerImageUrl))
     await Promise.all(
       detailImageUrls.map((url) => cloudinary.uploader.destroy(extractPublicId(url)))
     )
      
    }

    await findProduct.deleteOne()
    return sendResponse(res, 200, true, {}, {message:"Product delete successfully"});
    
  } catch (error) {
    return sendResponse(res, 404, true, { general: "No prouct found" }, null);
    
  }

}

export { addProductController,getProductController,singleProductController,editProductController,deleteProductController };