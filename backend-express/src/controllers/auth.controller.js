import UserModal from '../modals/user.modal.js'
import { sendResponse } from '../helpers/sendResponse.js'
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from '../helpers/mailerService.js'
const registerController = async (req, res) => {
    try {
        let { fullname, email, password } = req.body
        
        // find user
        const user = await UserModal.findOne({email})
        if (user) {
            return sendResponse(res,409,true,{email:"User already registered"},null)
        }

        // 6-digit OTP generate karna
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const hashPassword = await bcrypt.hash(password, 10)
        password = hashPassword
        const newUSer = new UserModal({ fullname, email, password,verificationToken })
        try {
            await sendVerificationEmail(email,verificationToken)
            
        } catch (emailError) {
            // Rollback user creation if email sending fails
            // await UserModal.findByIdAndDelete(newUSer._id)
            return sendResponse(res, 500, true, { general: "Failed to send verification email. Please try again." }, null);
        }
        await newUSer.save()
        return sendResponse(res,200,false,{},{message:"User Registered Succesfully, OTP sent to email."})
        
    } catch (error) {
        
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}

export {registerController}