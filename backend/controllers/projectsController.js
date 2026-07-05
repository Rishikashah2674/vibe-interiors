const Project = require("../models/Project");
const fs = require("fs");
const path = require("path");

// Helper to delete an image file safely from disk
const deleteImageFile = (imagePath) => {
  if (!imagePath) return;
  // If it's a relative path starting with /uploads/
  if (imagePath.startsWith("/uploads/")) {
    const filename = imagePath.replace("/uploads/", "");
    const fullPath = path.join(__dirname, "../uploads", filename);
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error("Failed to delete image file:", err);
      }
    }
  }
};

// Helper to normalize image paths (storing only relative paths)
const normalizeImagePath = (img) => {
  if (!img) return "";
  let cleaned = img;
  // Strip host/protocol
  cleaned = cleaned.replace(/^https?:\/\/[^\/]+/, "");
  // Clean double or multiple slashes
  cleaned = cleaned.replace(/\/+/g, "/");
  // Clean double /uploads/ prefix
  cleaned = cleaned.replace(/^\/uploads\/uploads\//, "/uploads/");
  return cleaned;
};

// @desc    Get all portfolio projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Get Projects Controller Error:", error);
    return res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};

// @desc    Create a new portfolio project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const title = req.body.title ? req.body.title.trim() : "";
    const category = req.body.category ? req.body.category.trim() : "";
    const description = req.body.description ? req.body.description.trim() : "";
    const location = req.body.location ? req.body.location.trim() : "";
    let image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    // Backend Input Validation
    if (!title || !category || !description || !location || !image) {
      return res.status(400).json({ success: false, message: "All fields (title, category, description, location, image) are required and cannot be empty" });
    }

    // Category validation
    const validCategories = ["Residential", "Office", "Bungalows", "Commercial"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: `Category must be one of: ${validCategories.join(", ")}` });
    }

    // Prevent duplicate projects
    const existingProject = await Project.findOne({
      title: { $regex: new RegExp("^" + title.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$", "i") },
      category: category,
      location: { $regex: new RegExp("^" + location.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$", "i") },
    });

    if (existingProject) {
      // If a file was uploaded by multer, we should delete it since creation failed
      if (req.file) {
        deleteImageFile(`/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ success: false, message: "A project with the same title, category, and location already exists." });
    }

    const newProject = new Project({
      title,
      category,
      description,
      image: normalizeImagePath(image),
      location,
    });

    const savedProject = await newProject.save();

    return res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    console.error("Create Project Controller Error:", error);
    if (req.file) {
      deleteImageFile(`/uploads/${req.file.filename}`);
    }
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// @desc    Update a portfolio project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {


    const projectId = req.params.id;
    let project = await Project.findById(projectId);
    if (!project) {
      if (req.file) {
        deleteImageFile(`/uploads/${req.file.filename}`);
      }
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const title = req.body.title ? req.body.title.trim() : "";
    const category = req.body.category ? req.body.category.trim() : "";
    const description = req.body.description ? req.body.description.trim() : "";
    const location = req.body.location ? req.body.location.trim() : "";
    
    // Validate inputs
    if (title === "" || category === "" || description === "" || location === "") {
      if (req.file) {
        deleteImageFile(`/uploads/${req.file.filename}`);
      }
      return res.status(400).json({ success: false, message: "Fields cannot be empty after trimming." });
    }

    // Category validation if passed
    if (category) {
      const validCategories = ["Residential", "Office", "Bungalows", "Commercial"];
      if (!validCategories.includes(category)) {
        if (req.file) {
          deleteImageFile(`/uploads/${req.file.filename}`);
        }
        return res.status(400).json({ success: false, message: `Category must be one of: ${validCategories.join(", ")}` });
      }
    }

    project.title = title || project.title;
    project.category = category || project.category;
    project.description = description || project.description;
    project.location = location || project.location;

    let oldImagePath = null;
    let hasNewImage = false;

    if (req.file) {
      oldImagePath = project.image;
      project.image = normalizeImagePath(`/uploads/${req.file.filename}`);
      hasNewImage = true;
    } else if (req.body.image !== undefined && req.body.image !== null && req.body.image !== "") {
      project.image = normalizeImagePath(req.body.image);
    }

    const updatedProject = await project.save();


    // Only after database update succeeds, delete old image from uploads
    if (hasNewImage && oldImagePath && oldImagePath !== project.image) {
      try {
        deleteImageFile(oldImagePath);
      } catch (err) {
        console.error("Failed to delete old image:", err);
      }
    }

    return res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("Update Project Controller Error:", error);
    if (req.file) {
      deleteImageFile(`/uploads/${req.file.filename}`);
    }
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// @desc    Delete a portfolio project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const imagePath = project.image;

    // Delete MongoDB document first
    await Project.findByIdAndDelete(projectId);

    // Delete image from uploads folder after successful DB deletion
    if (imagePath) {
      try {
        deleteImageFile(imagePath);
      } catch (err) {
        console.error("Failed to delete image file associated with project:", err);
      }
    }

    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Controller Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
