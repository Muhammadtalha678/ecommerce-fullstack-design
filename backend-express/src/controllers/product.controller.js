import UserModal from '../modals/user.modal.js'
import { sendResponse } from '../helpers/sendResponse.js'
const addProductController = async (req, res) => {
     try {
        let {name, price, image, description, category, stock } = req.body
       
       return sendResponse(res,200,false,{},{...userData,accessToken,message:"User Login Successfully"})
        
    } catch (error) {
         console.log(error);
         
        return sendResponse(res,500,true,{ general: error.message },null)
    }
} 

export {addProductController}