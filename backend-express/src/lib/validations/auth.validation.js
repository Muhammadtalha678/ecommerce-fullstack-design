import joi from 'joi'

const registerValidation = joi.object({
    fullname: joi.string().min(3).max(255).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: ['com', 'net'] }).required(),
    password:joi.string().min(8).required()
}) 

export {registerValidation}