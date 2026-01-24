import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// helper
const safeUnlink = (path) => {
  if (path && fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "slidee/users",
    });

    safeUnlink(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    safeUnlink(localFilePath);
    return null;
  }
};

export const uploadBase64Image = async (base64String) => {
  try {
    const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, "");

    const response = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${cleanBase64}`,
      {
        resource_type: "image",
        folder: "slidee/users",
      }
    );

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary base64 upload error:", error);
    return null;
  }
};

export const uploadVideoOnCloudinary = async (filePath) => {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      chunk_size: 100000000,
      folder: "slidee/videos",
    });

    safeUnlink(filePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary video upload error:", error);
    safeUnlink(filePath);
    return null;
  }
};

export const uploadVideoOnCloudinaryBase64 = async (base64String) => {
  try {
    const cleanBase64 = base64String.replace(/^data:video\/\w+;base64,/, "");

    const response = await cloudinary.uploader.upload(
      `data:video/mp4;base64,${cleanBase64}`,
      {
        resource_type: "video",
        chunk_size: 100000000,
        folder: "slidee/videos",
      }
    );

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary base64 video upload error:", error);
    return null;
  }
};
