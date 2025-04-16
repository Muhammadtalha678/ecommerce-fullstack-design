// backend/middlewares/upload.middleware.js
import multer from 'multer';

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  // console.log("req.body",req.body);
  
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