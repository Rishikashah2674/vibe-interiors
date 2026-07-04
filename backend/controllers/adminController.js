const Admin = require("../models/Admin");

// @desc    Get all admins
// @route   GET /api/admin
// @access  Private
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
    return res.status(200).json(admins);
  } catch (error) {
    console.error("Get All Admins Controller Error:", error);
    return res.status(500).json({ message: "Failed to retrieve administrators." });
  }
};

// @desc    Create new admin
// @route   POST /api/admin
// @access  Private
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    const emailNormalized = email.toLowerCase().trim();
    const existingAdmin = await Admin.findOne({ email: emailNormalized });
    if (existingAdmin) {
      return res.status(400).json({ message: "An administrator with this email already exists." });
    }

    const newAdmin = new Admin({
      name: name.trim(),
      email: emailNormalized,
      password, // Password will be hashed automatically by Mongoose pre-save hook
    });

    await newAdmin.save();

    return res.status(201).json({
      message: "Administrator created successfully.",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error) {
    console.error("Create Admin Controller Error:", error);
    return res.status(500).json({ message: "Failed to create administrator." });
  }
};

// @desc    Update admin details
// @route   PUT /api/admin/:id
// @access  Private
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required." });
    }

    const emailNormalized = email.toLowerCase().trim();

    // Check if another admin already uses the email
    const duplicateAdmin = await Admin.findOne({
      email: emailNormalized,
      _id: { $ne: id },
    });
    if (duplicateAdmin) {
      return res.status(400).json({ message: "An administrator with this email already exists." });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrator not found." });
    }

    admin.name = name.trim();
    admin.email = emailNormalized;
    await admin.save();

    return res.status(200).json({
      message: "Administrator updated successfully.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error("Update Admin Controller Error:", error);
    return res.status(500).json({ message: "Failed to update administrator." });
  }
};

// @desc    Change admin password
// @route   PATCH /api/admin/:id/password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrator not found." });
    }

    admin.password = newPassword; // Will be hashed automatically by Mongoose pre-save hook
    await admin.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Change Password Controller Error:", error);
    return res.status(500).json({ message: "Failed to update password." });
  }
};

// @desc    Delete admin
// @route   DELETE /api/admin/:id
// @access  Private
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Safety Rule 1: Prevent deleting currently logged-in admin
    if (req.admin._id.toString() === id) {
      return res.status(400).json({ message: "You cannot delete your own account." });
    }

    // Safety Rule 2: Prevent deleting the last remaining admin
    const totalAdmins = await Admin.countDocuments();
    if (totalAdmins <= 1) {
      return res.status(400).json({ message: "Cannot delete the last remaining administrator." });
    }

    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Administrator not found." });
    }

    return res.status(200).json({ message: "Administrator deleted successfully." });
  } catch (error) {
    console.error("Delete Admin Controller Error:", error);
    return res.status(500).json({ message: "Failed to delete administrator." });
  }
};

module.exports = {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  changePassword,
  deleteAdmin,
};
