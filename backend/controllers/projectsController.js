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
    const area = req.body.area ? req.body.area.trim() : "";

    const imageFile = req.files && req.files["image"] ? req.files["image"][0] : null;
    const imagesFiles = req.files && req.files["images"] ? req.files["images"] : [];

    let image = imageFile ? `/uploads/${imageFile.filename}` : req.body.image;

    const APPROVED_CATEGORIES = [
      "Residential",
      "Commercial",
      "Office",
      "Living Room",
      "Bedroom",
      "Kitchen",
      "Hospitality",
      "Healthcare",
      "Retail",
      "Renovation",
      "Exterior",
      "Custom Design"
    ];

    // Backend Input Validation
    if (!title || !category || !description || !location || !image) {
      // If files were uploaded, clean them up
      if (imageFile) deleteImageFile(`/uploads/${imageFile.filename}`);
      imagesFiles.forEach(f => deleteImageFile(`/uploads/${f.filename}`));

      return res.status(400).json({
        success: false,
        message: "All fields (title, category, description, location, image) are required and cannot be empty",
      });
    }

    if (!APPROVED_CATEGORIES.includes(category)) {
      if (imageFile) deleteImageFile(`/uploads/${imageFile.filename}`);
      imagesFiles.forEach(f => deleteImageFile(`/uploads/${f.filename}`));

      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${APPROVED_CATEGORIES.join(", ")}`,
      });
    }

    // Prevent duplicate projects
    const existingProject = await Project.findOne({
      title: { $regex: new RegExp("^" + title.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$", "i") },
      category: category,
      location: { $regex: new RegExp("^" + location.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$", "i") },
    });

    if (existingProject) {
      if (imageFile) deleteImageFile(`/uploads/${imageFile.filename}`);
      imagesFiles.forEach(f => deleteImageFile(`/uploads/${f.filename}`));

      return res.status(400).json({
        success: false,
        message: "A project with the same title, category, and location already exists.",
      });
    }

    // Construct images array (cover image first, then additional)
    let images = [normalizeImagePath(image)];
    imagesFiles.forEach(f => {
      const p = normalizeImagePath(`/uploads/${f.filename}`);
      if (!images.includes(p)) {
        images.push(p);
      }
    });

    const designStyle = req.body.designStyle ? req.body.designStyle.trim() : "";
    const materials = req.body.materials ? req.body.materials.trim() : "";
    const services = req.body.services ? req.body.services.trim() : "";

    const newProject = new Project({
      title,
      category,
      description,
      image: normalizeImagePath(image),
      images,
      location,
      area: area || undefined,
      designStyle: designStyle || undefined,
      materials: materials || undefined,
      services: services || undefined,
    });

    const savedProject = await newProject.save();

    return res.status(201).json({ success: true, data: savedProject });
  } catch (error) {
    console.error("Create Project Controller Error:", error);
    if (req.files) {
      if (req.files["image"]) deleteImageFile(`/uploads/${req.files["image"][0].filename}`);
      if (req.files["images"]) req.files["images"].forEach(f => deleteImageFile(`/uploads/${f.filename}`));
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
      if (req.files) {
        if (req.files["image"]) deleteImageFile(`/uploads/${req.files["image"][0].filename}`);
        if (req.files["images"]) req.files["images"].forEach(f => deleteImageFile(`/uploads/${f.filename}`));
      }
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    const title = req.body.title ? req.body.title.trim() : "";
    const category = req.body.category ? req.body.category.trim() : "";
    const description = req.body.description ? req.body.description.trim() : "";
    const location = req.body.location ? req.body.location.trim() : "";
    const area = req.body.area ? req.body.area.trim() : "";

    // Validate inputs
    if (title === "" || category === "" || description === "" || location === "") {
      if (req.files) {
        if (req.files["image"]) deleteImageFile(`/uploads/${req.files["image"][0].filename}`);
        if (req.files["images"]) req.files["images"].forEach(f => deleteImageFile(`/uploads/${f.filename}`));
      }
      return res.status(400).json({ success: false, message: "Fields cannot be empty after trimming." });
    }

    const APPROVED_CATEGORIES = [
      "Residential",
      "Commercial",
      "Office",
      "Living Room",
      "Bedroom",
      "Kitchen",
      "Hospitality",
      "Healthcare",
      "Retail",
      "Renovation",
      "Exterior",
      "Custom Design"
    ];

    if (category && !APPROVED_CATEGORIES.includes(category)) {
      if (req.files) {
        if (req.files["image"]) deleteImageFile(`/uploads/${req.files["image"][0].filename}`);
        if (req.files["images"]) req.files["images"].forEach(f => deleteImageFile(`/uploads/${f.filename}`));
      }
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${APPROVED_CATEGORIES.join(", ")}`,
      });
    }

    project.title = title || project.title;
    project.category = category || project.category;
    project.description = description || project.description;
    project.location = location || project.location;
    project.area = area !== undefined ? area : project.area;
    
    if (req.body.designStyle !== undefined) project.designStyle = req.body.designStyle.trim();
    if (req.body.materials !== undefined) project.materials = req.body.materials.trim();
    if (req.body.services !== undefined) project.services = req.body.services.trim();

    let oldImagePath = project.image;
    let hasNewImage = false;

    if (req.files && req.files["image"]) {
      project.image = normalizeImagePath(`/uploads/${req.files["image"][0].filename}`);
      hasNewImage = true;
    } else if (req.body.image !== undefined && req.body.image !== null && req.body.image !== "") {
      project.image = normalizeImagePath(req.body.image);
    }

    // Now handle existing & new additional images
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = typeof req.body.existingImages === "string"
          ? JSON.parse(req.body.existingImages)
          : req.body.existingImages;
      } catch (err) {
        existingImages = req.body.existingImages.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    // Gather new uploaded files
    const newUploadedImages = req.files && req.files["images"]
      ? req.files["images"].map(f => `/uploads/${f.filename}`)
      : [];

    // Combine them (make sure cover image project.image is first)
    let finalImages = [project.image];
    existingImages.forEach(img => {
      const normalized = normalizeImagePath(img);
      if (normalized && normalized !== project.image && !finalImages.includes(normalized)) {
        finalImages.push(normalized);
      }
    });
    newUploadedImages.forEach(img => {
      const normalized = normalizeImagePath(img);
      if (normalized && !finalImages.includes(normalized)) {
        finalImages.push(normalized);
      }
    });

    const oldImages = project.images || [];
    project.images = finalImages;

    const updatedProject = await project.save();

    // After successful update, clean up deleted image files
    if (hasNewImage && oldImagePath && oldImagePath !== project.image) {
      deleteImageFile(oldImagePath);
    }

    // Delete any additional images that are no longer in project.images
    const removedImages = oldImages.filter(img => !project.images.includes(img) && img !== oldImagePath);
    removedImages.forEach(img => {
      try {
        deleteImageFile(img);
      } catch (err) {
        console.error("Failed to delete removed image file:", err);
      }
    });

    return res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("Update Project Controller Error:", error);
    if (req.files) {
      if (req.files["image"]) deleteImageFile(`/uploads/${req.files["image"][0].filename}`);
      if (req.files["images"]) req.files["images"].forEach(f => deleteImageFile(`/uploads/${f.filename}`));
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

    // Gather all paths to delete
    const imagePaths = project.images && project.images.length > 0 ? project.images : [project.image];

    // Delete MongoDB document first
    await Project.findByIdAndDelete(projectId);

    // Delete all associated image files from disk after successful DB deletion
    imagePaths.forEach(img => {
      if (img) {
        try {
          deleteImageFile(img);
        } catch (err) {
          console.error("Failed to delete image file associated with project:", err);
        }
      }
    });

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

