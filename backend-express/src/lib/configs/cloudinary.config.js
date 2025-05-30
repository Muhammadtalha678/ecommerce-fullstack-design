
import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.config.js';

cloudinary.config({
  cloud_name: env.cloud_name,
  api_key: env.api_key,
  api_secret: env.api_secret,
});

export default cloudinary;
