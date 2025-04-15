import multer from 'multer';

const storage = multer.diskStorage({}); // don't store locally, we send to Cloudinary

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

export  {upload};
