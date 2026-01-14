import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const fixedPath = localFilePath.replaceAll("\\", "/");

    const response = await cloudinary.uploader.upload(fixedPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);
    
    console.log("file is uploaded on cloudinary ", response.url);

    return response;
  } catch (error) {
    if (localFilePath && fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    console.log("Cloudinary Upload Error =>", error);
    return null;
  }
};

export { uploadOnCloudinary };
