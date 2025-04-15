import { sendResponse } from '../helpers/sendResponse.js'
import ProductModal from '../modals/product.modal.js'
const addProductController = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const files = req.files;

    if (!files || !files.bannerImage || !files.detailImages || files.detailImages.length < 4) {
      return sendResponse(res, 400, true, { image: 'Please upload all required images' }, null);
    }

    // Upload banner image
    const bannerResult = await cloudinary.uploader.upload(files.bannerImage[0].path, {
      folder: 'products/bannerImages',
    });

    // Upload detail images
    const detailImageUrls = [];
    for (const file of files.detailImages) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products/detailImages',
      });
      detailImageUrls.push(result.secure_url);
    }

    const product = new ProductModal({
      name,
      price,
      description,
      category,
      stock,
      bannerImage: bannerResult.secure_url,
      detailImages: detailImageUrls,
    });

    await product.save();
    return sendResponse(res, 200, false, {}, { message: 'Product added successfully' });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
};

export {addProductController}