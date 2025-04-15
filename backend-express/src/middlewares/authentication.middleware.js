import { env } from "../lib/configs/env.config.js";
import {sendResponse} from '../helpers/sendResponse.js'
import UserModal from '../modals/user.modal.js'
import jwt from 'jsonwebtoken'
export async function authenticateUser(req, res, next) {
    try {
        const authHeader = req?.headers?.authorization
        
        const token = authHeader?.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, env.AUTH_SECRET)
        } catch(error) {
            return sendResponse(res,401,true,{general:"Invalid access token"},null)
        }
        const user = await UserModal.findById(decoded.id);
        // console.log(user);
        if (!user) {
        return sendResponse(res, 401, true, { general: 'User not found' }, null);
        }
        req.user = user;
        // console.log("req.user",req.user);
        
        next();
    } catch (error) {
        sendResponse(res,500,true,{general:"Something went wrong"},null);
    }
}