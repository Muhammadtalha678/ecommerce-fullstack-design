import { sendResponse } from "../helpers/sendResponse.js"

export const authorizeAdmin = async(req, res, next) => {
    if (req.user?.role !== 'admin') {
        return sendResponse(res,403,true,{general:'Access denied. Admins only.' },null)
    }
    next()
}