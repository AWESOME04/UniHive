import { Request, Response, NextFunction } from 'express';
import { profileUpload, essentialsUpload, buzzUpload, archiveUpload } from '../config/cloudinary';

// Middleware for single profile image upload
export const uploadProfileImage = (fieldName: string = 'profileImage') => {
  return (req: Request, res: Response, next: NextFunction) => {
    profileUpload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: `File upload error: ${err.message}`
        });
      }
      // Add file URL to request body if file was uploaded
      if (req.file) {
        req.body[fieldName] = req.file.path;
      }
      next();
    });
  };
};

// Middleware for multiple images for essentials
export const uploadEssentialsImages = (fieldName: string = 'photos') => {
  return (req: Request, res: Response, next: NextFunction) => {
    essentialsUpload.array(fieldName, 5)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: `File upload error: ${err.message}`
        });
      }
      // Add file URLs to request body if files were uploaded
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        req.body[fieldName] = (req.files as Express.Multer.File[]).map(file => file.path);
      }
      next();
    });
  };
};

// Middleware for single image upload for buzz events
export const uploadEventImage = (fieldName: string = 'promotionalImage') => {
  return (req: Request, res: Response, next: NextFunction) => {
    buzzUpload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: `File upload error: ${err.message}`
        });
      }
      // Add file URL to request body if file was uploaded
      if (req.file) {
        req.body[fieldName] = req.file.path;
      }
      next();
    });
  };
};

// Middleware for uploading archive files (PDFs, docs, etc.)
export const uploadArchiveFile = (fieldName: string = 'file') => {
  return (req: Request, res: Response, next: NextFunction) => {
    archiveUpload.single(fieldName)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: `File upload error: ${err.message}`
        });
      }
      // Add file URL to request body if file was uploaded
      if (req.file) {
        req.body.fileUrl = req.file.path;
        req.body.fileFormat = req.file.mimetype;
      }
      next();
    });
  };
};
