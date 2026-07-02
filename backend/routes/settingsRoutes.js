const express = require("express");
const router = express.Router();
const {
  getWebsiteSettings,
  updateWebsiteSettings,
} = require("../controllers/settingsController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/settings -> Fetch website settings (public)
router.get("/", getWebsiteSettings);

// PATCH /api/settings -> Update website settings (admin only)
router.patch("/", authMiddleware, updateWebsiteSettings);

module.exports = router;
