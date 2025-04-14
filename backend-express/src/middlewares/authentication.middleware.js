import { env } from "../lib/configs/env.config";
import {sendResponse} from '../helpers/sendResponse'
export async function authenticateUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return sendResponse(res, 401, true, { general: 'No token provided' }, null);
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.AUTH_SECRET);
        const user = await UserModal.findById(decoded.id).lean();
        if (!user) {
        return sendResponse(res, 404, true, { general: 'User not found' }, null);
        }
        req.user = user;
        next();
    } catch (error) {
        sendResponse(res,500,true,{general:"Something went wrong"},null);
    }
}