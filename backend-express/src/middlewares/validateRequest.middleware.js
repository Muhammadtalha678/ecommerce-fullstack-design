import { sendResponse } from "../helpers/sendResponse.js"

export const validateRequest = (validationSchema) => (req, res, next) => {
    const { error } = validationSchema.validate(req.body)
    if (error) {
         // Transform Joi error details to field-wise messages
        const fieldErrors = {};
        error.details.forEach(detail => {
            const field = detail.path[0] //get error name
            if (!fieldErrors[field]) {
                fieldErrors[field] = detail.message
            }
        });
        return sendResponse(res,400,true,fieldErrors,null)
    }
    next()
}