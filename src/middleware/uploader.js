import { join } from 'path';
import multer from 'multer';
import __dirname from '../utils.js';

const uploadPath = join(__dirname, 'public', 'upload');
const uploadPathDocuments = join(__dirname, 'public', 'upload', 'documents');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let uploadFolder = uploadPath;

    if (file.fieldname === 'profileImage') {
      uploadFolder = join(uploadPath, 'profiles');
    } else if (file.fieldname === 'productImage') {
      uploadFolder = join(uploadPath, 'products');
    } else if (file.fieldname === 'identificationImage') {
      uploadFolder = join(uploadPathDocuments, 'identificationImage');
    } else if (file.fieldname === 'residenceImage') {
      uploadFolder = join(uploadPathDocuments, 'residenceImage');
    } else if (file.fieldname === 'accountstatusImage') {
      uploadFolder = join(uploadPathDocuments, 'accountstatusImage');
    }

    cb(null, uploadFolder);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProducts = multer({
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
});

const uploadDocuments = multer({
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
});

export { uploadProducts, uploadDocuments };
