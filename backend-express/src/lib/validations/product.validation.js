import Joi from 'joi'

export const ProductValidation = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Product name must be a string',
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required',
  }),

  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),

  description: Joi.string().min(10).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters long',
    'any.required': 'Description is required',
  }),

  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'string.empty': 'Category is required',
    'any.required': 'Category is required',
  }),

  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required',
  }),

  bannerImage: Joi.string().uri().required().messages({
    'string.base': 'Banner image URL must be a string',
    'string.uri': 'Banner image must be a valid URL',
    'any.required': 'Banner image is required',
  }),

  detailImages: Joi.array().items(
    Joi.string().uri().messages({
      'string.base': 'Each detail image URL must be a string',
      'string.uri': 'Each detail image must be a valid URL',
    })
  )
    .min(1)
    .max(4)
    .required()
    .messages({
      'array.base': 'Detail images must be an array of URLs',
      'array.min': 'At least 1 detail image is required',
      'array.max': 'Maximum of 4 detail images allowed',
      'any.required': 'Detail images are required',
    }),
})
