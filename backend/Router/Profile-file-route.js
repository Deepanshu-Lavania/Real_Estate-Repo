// import express from "express";
// import multer from "multer";

// const router = express.Router();



// //! Image Storage Engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./upload/ProfileImg");
//   },
//   filename: (req, file, cb) => {
//     // return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)

//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage: storage });
// //creating Upload Endoint for images
// router.post("/upload", upload.single("ProfileImage"), (req, res) => {
//   console.log(req.file);
//   if (!req.file) {
//     return res.status(400).send({ success: 0, message: "No file uploaded" });
//   }
//   res.send({
//     success: 1,
//     image_url: `http://localhost:${process.env.PORT}/profImg/${req.file.filename}`,
//   });
// });


// export default router;


import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_images", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "avif"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// Upload endpoint to Cloudinary
router.post("/upload", upload.single("ProfileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.status(200).json({
    success: 1,
    message: "Image uploaded successfully to Cloudinary",
    image_url: req.file.path, // Cloudinary-hosted image URL
  });
});

export default router;
