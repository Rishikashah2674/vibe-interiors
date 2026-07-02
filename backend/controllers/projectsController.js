const Project = require("../models/Project");

// @desc    Get all portfolio projects
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Get Projects Controller Error:", error);
    return res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// @desc    Create a new portfolio project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, category, description, image, location } = req.body;

    if (!title || !category || !description || !image || !location) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newProject = new Project({
      title,
      category,
      description,
      image,
      location,
    });

    await newProject.save();
    return res.status(201).json(newProject);
  } catch (error) {
    console.error("Create Project Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Update a portfolio project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, category, description, image, location } = req.body;
    const projectId = req.params.id;

    let project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.title = title || project.title;
    project.category = category || project.category;
    project.description = description || project.description;
    project.image = image || project.image;
    project.location = location || project.location;

    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    console.error("Update Project Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
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
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.findByIdAndDelete(projectId);
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
