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

  image: Joi.string().uri().required().messages({
    'string.base': 'Image must be a valid URL',
    'string.uri': 'Image must be a valid URL',
    'any.required': 'Product image is required',
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
})
