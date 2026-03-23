const express = require("express");
const router = express.Router();

const {
  getAllAudios,
  getAudiosByCategory,
  incrementPlayCount,
} = require("../controllers/audio.controller");

// Get all active audios (for app)
router.get("/", getAllAudios);

// Get audios by category
router.get("/category/:category", getAudiosByCategory);

// Increment play count
router.patch("/:id/play", incrementPlayCount);

module.exports = router;