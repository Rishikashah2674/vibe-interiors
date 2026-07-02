const express = require("express");
const router = express.Router();
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialsController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/testimonials -> Get all testimonials (public)
router.get("/", getAllTestimonials);

// POST /api/testimonials -> Create new testimonial (admin only)
router.post("/", authMiddleware, createTestimonial);

// PUT /api/testimonials/:id -> Update testimonial (admin only)
router.put("/:id", authMiddleware, updateTestimonial);

// DELETE /api/testimonials/:id -> Delete testimonial (admin only)
router.delete("/:id", authMiddleware, deleteTestimonial);

module.exports = router;
