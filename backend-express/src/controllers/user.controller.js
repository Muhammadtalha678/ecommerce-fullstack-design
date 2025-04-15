import {sendResponse} from '../helpers/sendResponse.js'
export const userController = async (req, res) => {
    try {
        const {fullname,email,role} = req.user
        sendResponse(res, 200, false, {},{fullname,email,role})
    } catch (error) {
        
        sendResponse(res, 500, true, {general:"Something went wrong"},null)
    }
}
