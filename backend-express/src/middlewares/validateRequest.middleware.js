import { sendResponse } from "../helpers/sendResponse.js"

export const validateRequest = (validationSchema) => (req, res, next) => {
    const { error } = validationSchema.validate(req.body)
    if (error) return sendResponse(res,400,true,error,null)
    next()
}