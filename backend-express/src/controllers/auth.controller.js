import UserModal from '../modals/user.modal.js'
import { sendResponse } from '../helpers/sendResponse.js'
import bcrypt from 'bcrypt'
const registerController = async (req, res) => {
    try {
        let { fullname, email, password } = req.body
        
        console.log(fullname);
        // find user
        const user = await UserModal.findOne({email})
        console.log(user);
        if (user) {
            return sendResponse(res,409,true,{email:"User already registered"},null)
        }
        const hashPassword = await bcrypt.hash(password, 10)
        password = hashPassword
        let newUSer = new UserModal({ fullname, email, password })
        newUSer.save()
        
        return sendResponse(res,200,false,{},{message:"User Registered Succesfully"})
        
    } catch (error) {
        
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}

export {registerController}