import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const COULDINARY_CLOUD_NAME = process.env.COULDINARY_CLOUD_NAME;
const COULDINARY_API_KEY = process.env.COULDINARY_API_KEY;
const COULDINARY_API_SECRET = process.env.COULDINARY_API_SECRET;

const config = {
  cloud_name: COULDINARY_CLOUD_NAME,
  api_key: COULDINARY_API_KEY,
  api_secret: COULDINARY_API_SECRET,
};

cloudinary.config(config);

export default cloudinary;
