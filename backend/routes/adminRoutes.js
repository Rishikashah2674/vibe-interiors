const express = require("express");
const router = express.Router();
const {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  changePassword,
  deleteAdmin,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all routes in this router with authMiddleware
router.use(authMiddleware);

// GET /api/admin -> Get all admins
// POST /api/admin -> Create new admin
router.route("/")
  .get(getAllAdmins)
  .post(createAdmin);

// PUT /api/admin/:id -> Update admin
// DELETE /api/admin/:id -> Delete admin
router.route("/:id")
  .put(updateAdmin)
  .delete(deleteAdmin);

// PATCH /api/admin/:id/password -> Change password
router.patch("/:id/password", changePassword);

module.exports = router;
