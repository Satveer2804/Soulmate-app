const Audio = require("../models/Audio");

/**
 * @desc   Create new audio (Admin)
 * @route  POST /api/admin/audio
 * @access Admin
 */
exports.createAudio = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      audioUrl,
      coverImageUrl,
      duration,
      fileSize,
      fileType,
      artist,
      album,
      tags,
      isFeatured,
      displayOrder,
    } = req.body;

    const audio = await Audio.create({
      title,
      description,
      category,
      audioUrl,
      coverImageUrl,
      duration,
      fileSize,
      fileType,
      artist,
      album,
      tags,
      isFeatured,
      displayOrder,
      uploadedBy: "admin",
    });

    res.status(201).json({
      success: true,
      message: "Audio uploaded successfully",
      data: audio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc   Get all active audios (User App)
 * @route  GET /api/audios
 * @access Public
 */
exports.getAllAudios = async (req, res) => {
  try {
    const audios = await Audio.find({
      isActive: true,
      isDeleted: false,
    })
      .sort({ displayOrder: 1, createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: audios.length,
      data: audios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc   Get audios by category
 * @route  GET /api/audios/category/:category
 * @access Public
 */
exports.getAudiosByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const audios = await Audio.find({
      category,
      isActive: true,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: audios,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc   Update audio details (Admin)
 * @route  PATCH /api/admin/audio/:id
 * @access Admin
 */
exports.updateAudio = async (req, res) => {
  try {
    const audio = await Audio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!audio) {
      return res.status(404).json({
        success: false,
        message: "Audio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Audio updated successfully",
      data: audio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc   Soft delete audio (Admin)
 * @route  DELETE /api/admin/audio/:id
 * @access Admin
 */
exports.deleteAudio = async (req, res) => {
  try {
    const audio = await Audio.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, isActive: false },
      { new: true }
    );

    if (!audio) {
      return res.status(404).json({
        success: false,
        message: "Audio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Audio deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc   Increase play count
 * @route  PATCH /api/audios/:id/play
 * @access Public
 */
exports.incrementPlayCount = async (req, res) => {
  try {
    await Audio.findByIdAndUpdate(req.params.id, {
      $inc: { playCount: 1 },
    });

    res.status(200).json({
      success: true,
      message: "Play count updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};