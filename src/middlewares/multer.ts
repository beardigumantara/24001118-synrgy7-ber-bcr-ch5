import multer from "multer";
import path from "path";

export const generateStorage = (folder: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads", folder));
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  });
};

const validateFile = (allowedMimeType: string[]) => {
  return (req: any, file: any, cb: any) => {
    if (allowedMimeType.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type"));
    }
  };
}

export const mUpload = multer({
  storage:multer.memoryStorage(),
  fileFilter: validateFile(["image/jpeg", "image/png", "image/jpg", "image/gif"]),
});

