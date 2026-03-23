const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
  {
    // BASIC INFO
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: ["hindi", "english", "punjabi", "other"],
      required: true,
    },

    // MEDIA URLS (Cloudflare R2)
    audioUrl: {
      type: String,
      required: true,
    },

    coverImageUrl: {
      type: String,
      required: true,
    },

    // METADATA
    duration: {
      type: Number, // seconds
      default: 0,
    },

    fileSize: {
      type: Number, // bytes
      default: 0,
    },

    fileType: {
      type: String, // mp3, wav, aac
      default: "mp3",
    },

    // MUSIC INFO
    artist: {
      type: String,
      default: "Unknown",
    },

    album: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    // ADMIN CONTROL
    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    uploadedBy: {
      type: String,
      enum: ["admin", "system"],
      default: "admin",
    },

    // ANALYTICS
    playCount: {
      type: Number,
      default: 0,
    },

    likeCount: {
      type: Number,
      default: 0,
    },

    // SAFE DELETE
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Audio", audioSchema);