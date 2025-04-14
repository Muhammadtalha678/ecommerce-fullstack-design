import UserModal from '../modals/user.modal.js'
import { sendResponse } from '../helpers/sendResponse.js'
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from '../helpers/mailerService.js'
import { generateAccessToken, generateRefreshToken } from '../lib/tokens/generate.token.js'
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
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
        const newUSer = new UserModal({ fullname, email, password,verificationToken,otpExpiresAt })
        try {
            await sendVerificationEmail(email,verificationToken)
            
        } catch (emailError) {
            // Rollback user creation if email sending fails
            // await UserModal.findByIdAndDelete(newUSer._id)
            return sendResponse(res, 500, true, { general: "Failed to send verification email. Please try again." }, null);
        }
        await newUSer.save()
        return sendResponse(res,200,false,{},{otpExpiresAt:newUSer.otpExpiresAt,email:newUSer.email,fullname:newUSer.fullname,message:"User Registered Succesfully, OTP sent to email."})
        
    } catch (error) {
        
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}
const verifyEmailController = async (req, res) => {
    try {
        let { email, otp } = req.body

        
        // find user
        const findUser = await UserModal.findOne({email})
        if (!findUser) {
            return sendResponse(res,401,true,{email:"User not found"},null)
        }

        // check token expire time
        if (findUser.otpExpiresAt < Date.now()) 
           return sendResponse(res, 400, true, {general:"OTP has expired"}, null);        
        // Check if OTP matches and is not expired
        
        if (findUser.verificationToken !== otp)  return sendResponse(res, 400, true, {otp:"Invalid OTP"}, null); 
                findUser.verificationToken = undefined;
                findUser.isVerified = true;
                await findUser.save();
                        return sendResponse(res, 200, false, {}, {message:"OTP verified successfully"});
        
    } catch (error) {
        
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}
const resendEmailController = async (req, res) => {
    try {
        let { email } = req.body

        // find user
        const findUser = await UserModal.findOne({email})
        if (!findUser) {
            return sendResponse(res,401,true,{email:"User not found"},null)
        }
        
        // 6-digit OTP generate karna
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); 
        
        findUser.verificationToken = verificationToken;
        findUser.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
        try {
            await sendVerificationEmail(email,verificationToken)
            
        } catch (emailError) {
            // Rollback user creation if email sending fails
            // await UserModal.findByIdAndDelete(newUSer._id)
            return sendResponse(res, 500, true, { general: "Failed to send verification email. Please try again." }, null);
        }
        await findUser.save();
        
                        return sendResponse(res, 200, false,{}, {message:"OTP resend successfully"});
        
    } catch (error) {
        
        return sendResponse(res,500,true,{ general: error.message },null)
    }
}

const loginController = async (req, res) => {
     try {
        let {email, password } = req.body
        
        // find user
        const user = await UserModal.findOne({email})
        if (!user) {
            return sendResponse(res,409,true,{email:"User is not registered"},null)
        }
        
        if (!user.isVerified) {
            return sendResponse(res,409,true,{isVerified:false,otpExpiresAt:user.otpExpiresAt,general:"Please verify your email before logging in."},null)
            
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
         if (!isPasswordValid) return sendResponse(res, 401, true, { email: "Invalid email or password" }, null);

         const accessToken = generateAccessToken({id:user._id,email:user.email,role:user.role})
         const refreshToken = generateRefreshToken({id:user._id})
         
         user.refreshToken = refreshToken
         
         await user.save()
         const userData = {
             fullname:user.fullname,
             email:user.email,
             role: user.role,
             accessToken
         }
         
         res.cookie('refreshToken', refreshToken, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production' ? true : false,
             sameSite: 'Strict',
             maxAge: 7 * 24 * 60 * 60 * 1000,
         })
         
       return sendResponse(res,200,false,{},{...userData,accessToken,message:"User Login Successfully"})
        
    } catch (error) {
         console.log(error);
         
        return sendResponse(res,500,true,{ general: error.message },null)
    }
} 

export {registerController,verifyEmailController,resendEmailController,loginController}