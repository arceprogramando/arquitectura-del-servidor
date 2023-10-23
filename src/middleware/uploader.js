import { join } from 'path';
import multer from 'multer';
import __dirname from '../utils.js';

const uploadPath = join(__dirname, 'public', 'upload');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let uploadFolder = uploadPath;

    if (file.fieldname === 'profileImage') {
      uploadFolder = join(uploadPath, 'profiles');
    } else if (file.fieldname === 'productImage') {
      uploadFolder = join(uploadPath, 'products');
    } else if (file.fieldname === 'document') {
      uploadFolder = join(uploadPath, 'documents');
    }

    cb(null, uploadFolder);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 400000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|PNG/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname);
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error('Error: El archivo no es una imagen válida'));
  },
}).single('productImage');

export default uploadMiddleware;
