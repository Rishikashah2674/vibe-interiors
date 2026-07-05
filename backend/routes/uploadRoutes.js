const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { uploadImage } = require("../middleware/uploadMiddleware");

// POST /api/upload -> Upload an image (admin only)
router.post("/", authMiddleware, uploadImage, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    // Return relative URL that Express static serves
    const relativePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({ success: true, image: relativePath });
  } catch (error) {
    console.error("Image Upload Route Error:", error);
    return res.status(500).json({ success: false, message: "File upload failed" });
  }
});

module.exports = router;
