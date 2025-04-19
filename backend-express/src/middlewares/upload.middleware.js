// backend/middlewares/upload.middleware.js
import multer from 'multer';

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  // console.log("req.body",req.body);
  // console.log("file",file);
  
  if (!file.originalname || file.originalname === 'undefined') {
    return cb(null, false); // Don't store this file, but don't throw an error
  }
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});