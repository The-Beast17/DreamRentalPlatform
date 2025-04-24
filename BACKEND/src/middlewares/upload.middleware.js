const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinaryconfig");
const streamifier = require("streamifier");

// 🔧 Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage for handling image uploads
const storage = multer.memoryStorage();

// Multer instance for handling image files with a file filter
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp|avif|gif|bmp|tiff|svg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error("ONLY_IMAGES_ALLOWED"));
  },
});

// Multer image upload setup for handling multiple fields (idProofImages, propertyImages, propertyDocImages)
const imagesUpload = upload.fields([
  { name: "idProofImages", maxCount: 5 },
  { name: "propertyImages", maxCount: 5 },
  { name: "propertyDocImages", maxCount: 5 },
]);

// Upload image to Cloudinary and return the result
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result); // result contains secure_url and public_id
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Middleware for image upload handling
const imageUploadMiddleware = async (req, res, next) => {
  imagesUpload(req, res, async function (err) {
    // Error handling for multer
    if (err) {
      console.error("Multer error:", err); // Log Multer error
      if (err.message === "ONLY_IMAGES_ALLOWED") {
        return res.status(400).json({ message: "Only image files are allowed!" });
      } else if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Image too large!" });
      } else {
        return res.status(500).json({ message: "Something went wrong during file upload!" });
      }
    }

    try {
      // Log uploaded files for debugging
      console.log("Uploaded files:", req.files);

      const uploadedUrls = {};

      // Process and upload each image to Cloudinary
      for (const fieldName in req.files) {
        uploadedUrls[fieldName] = [];
        for (const file of req.files[fieldName]) {
          // Check if the file buffer is not empty
          if (file.buffer && file.buffer.length > 0) {
            console.log(`Uploading file to Cloudinary: ${file.originalname}`);
            const result = await uploadToCloudinary(file.buffer, `dream_rental/${fieldName}`);
            uploadedUrls[fieldName].push({
              url: result.secure_url,
              public_id: result.public_id,
            });
          } else {
            console.log("File buffer is empty for:", file.originalname);
          }
        }
      }

      // Attach uploaded URLs to the request object
      req.uploadedImageUrls = uploadedUrls;
      next(); // Proceed to the next middleware or route handler
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return res.status(500).json({ message: "Image upload to Cloudinary failed!" });
    }
  });
};

module.exports = imageUploadMiddleware;
