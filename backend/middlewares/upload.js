import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eventorbit',
    allowed_format: ['jpeg', 'jpg', 'png'],
    transformation: [
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  },
})
const upload= multer({storage});
export default upload;