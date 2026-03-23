const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isAudio = file.mimetype.startsWith("audio/");
    return {
      folder: "soulmate",
      resource_type: isAudio ? "video" : "image", // Cloudinary uses "video" for audio files
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;