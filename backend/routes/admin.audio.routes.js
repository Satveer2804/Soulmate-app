const express = require("express");
const router = express.Router();

const {
  createAudio,
  updateAudio,
  deleteAudio,
} = require("../controllers/audio.controller");

// ⚠️ Later we will add admin auth middleware here

// Create audio
router.post("/", createAudio);

// Update audio
router.patch("/:id", updateAudio);

// Soft delete audio
router.delete("/:id", deleteAudio);

module.exports = router;