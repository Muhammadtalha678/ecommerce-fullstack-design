import joi from 'joi'

const registerValidation = joi.object({
    fullname: joi.string().min(3).max(255).required()
    .messages({
            'string.empty': 'Full name is required',
            'string.min': 'Full name must be at least 3 characters',
            'any.required': 'Full name is required',
        }),
    email: joi.string().email({ minDomainSegments: 2, tlds: ['com', 'net'] }).required()
    .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),
    password: joi.string().min(8).required()
    .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required',
        }),
        confirmPassword: joi.string().min(8)
        .valid(joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Passwords do not match',
            'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Confirm Password is required',
      'any.required': 'Confirm Password is required',
    }),
}) 

export {registerValidation}