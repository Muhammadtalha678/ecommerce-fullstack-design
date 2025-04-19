import { sendResponse } from "../helpers/sendResponse.js"
import CategoryModal from '../modals/category.model.js'
const addCategoryController = async (req,res) => {
    try {
        const { category } = req.body
        if (!category) return  sendResponse(res,400,{cateogry:"Category field is required"},null)
        
        await CategoryModal.create({
            categoryName:category
        }) 
        return sendResponse(res, 200, false, {}, {message: 'Category added successfully' });

    } catch (error) {
        sendResponse(res,500,{general:error.message},null)
    }
} 

export {addCategoryController}