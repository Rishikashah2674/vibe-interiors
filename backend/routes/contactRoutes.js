const express = require("express");
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/contact -> submit a design consultation request (public)
router.post("/", submitContact);

// GET /api/contact -> retrieve all inquiries (admin only)
router.get("/", authMiddleware, getAllContacts);

// PATCH /api/contact/:id/status -> update inquiry status (admin only)
router.patch("/:id/status", authMiddleware, updateContactStatus);

// DELETE /api/contact/:id -> delete inquiry (admin only)
router.delete("/:id", authMiddleware, deleteContact);

module.exports = router;
