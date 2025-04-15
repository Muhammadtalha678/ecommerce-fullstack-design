import multer from 'multer';

const storage = multer.diskStorage({}); // No local storage – files go to Cloudinary

const fileFilter = (req, file, cb) => {
  if (!file) {
    cb(null, false); // No file = skip silently
  } else if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Optional: 5MB file size limit
  },
});
