import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const uploadToCloudinary = async (
  fileBuffer,
  folder = "book_covers"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );

    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);
    bufferStream.pipe(uploadStream);
  });
};
