import { sendResponse } from '../helpers/sendResponse.js'
import ProductModal from '../modals/product.modal.js'
const addProductController = async (req, res) => {
  try {
   const files = req.files;

    if (!files || !files.bannerImage || files.bannerImage.length === 0) {
      return res.status(400).json({ errors: { bannerImage: 'Banner image is required' } });
    }

    if (!files.detailImages || files.detailImages.length < 1) {
      return res.status(400).json({ errors: { detailImages: 'At least 1 detail image is required' } });
    }

    if (files.detailImages.length > 4) {
      return res.status(400).json({ errors: { detailImages: 'Maximum of 4 detail images allowed' } });
    }

    // Text fields from body
    const { name, price, description, category, stock } = req.body;

    // Access files like:
    const bannerImageFile = files.bannerImage[0];
    const detailImagesFiles = files.detailImages;

    const savedProduct = await ProductModal.create({
      name,
      price,
      description,
      category,
      stock,
      bannerImage: bannerImageFile.filename,
      detailImages: detailImagesFiles.map((img) => img.filename),
    });


    await savedProduct.save();
    return sendResponse(res, 200, false, {}, { message: 'Product added successfully' });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, true, { general: error.message }, null);
  }
};

export {addProductController}