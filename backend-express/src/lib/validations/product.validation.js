import Joi from 'joi';

export const ProductValidation = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Product name is required',
  }),

  price: Joi.number().positive().required().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be positive',
    'any.required': 'Price is required',
  }),

  description: Joi.string().min(10).required().messages({
    'string.min': 'Description must be at least 10 characters',
    'any.required': 'Description is required',
  }),

  category: Joi.string().required().messages({
    'string.empty': 'Category is required',
  }),

  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required',
  }),
});
