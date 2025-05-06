import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage engine for profile images
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'unihive/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
    public_id: () => `profile_${Date.now()}`
  } as any
});

// Create storage engine for essential items
const essentialsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'unihive/essentials',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
    public_id: () => `essential_${Date.now()}`
  } as any
});

// Create storage engine for buzz event images
const buzzStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'unihive/buzz',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
    public_id: () => `event_${Date.now()}`
  } as any
});

// Create storage engine for archive files
const archiveStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'unihive/archive',
    resource_type: 'auto',
    allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png'],
    public_id: () => `archive_${Date.now()}`
  } as any
});

// Create multer upload instances
export const profileUpload = multer({ storage: profileStorage });
export const essentialsUpload = multer({ storage: essentialsStorage });
export const buzzUpload = multer({ storage: buzzStorage });
export const archiveUpload = multer({ storage: archiveStorage });

// Helper function to upload a file using the Cloudinary API directly
export const uploadFileToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
  resourceType = 'image'
): Promise<string> => {
  try {
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `unihive/${folder}`,
          resource_type: resourceType as any
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      
      uploadStream.end(file.buffer);
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file');
  }
};

export default cloudinary;
