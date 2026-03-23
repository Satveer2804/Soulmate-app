const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

router.post(
  "/upload",
  (req, res, next) => {
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        console.error("Multer/Cloudinary error:", err); // exposes the real error in terminal
        return res.status(500).json({ success: false, message: err.message });
      }
      next();
    });
  },
  (req, res) => {
    const imageUrl = req.files?.image?.[0]?.path;
    const audioUrl = req.files?.audio?.[0]?.path;

    if (!imageUrl || !audioUrl) {
      return res.status(400).json({
        success: false,
        message: "Both image and audio files are required",
      });
    }

    res.json({ success: true, imageUrl, audioUrl });
  }
);

module.exports = router;