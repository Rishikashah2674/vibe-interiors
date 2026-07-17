const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadProjectImages } = require("../middleware/uploadMiddleware");

// GET /api/projects -> Get all projects (public)
router.get("/", getAllProjects);

// POST /api/projects -> Create new project (admin only)
router.post("/", authMiddleware, uploadProjectImages, createProject);

// PUT /api/projects/:id -> Update project (admin only)
router.put("/:id", authMiddleware, uploadProjectImages, updateProject);

// DELETE /api/projects/:id -> Delete project (admin only)
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;

