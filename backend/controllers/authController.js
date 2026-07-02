const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "vibe_interiors_luxury_secret_key_2026",
    { expiresIn: "30d" }
  );
};

// @desc    Admin authentication & token generation
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN_REQUEST_RECEIVED: Email:", email, "Password length:", password ? password.length : 0);

    // Validate request inputs
    if (!email || !password) {
      console.warn("LOGIN_FAILED: Missing email or password");
      return res.status(400).json({
        message: "Please enter all fields.",
      });
    }

    // Check if admin user exists (normalize search parameter)
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      console.warn("LOGIN_FAILED: No admin record found for email:", email);
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    console.log("LOGIN_ADMIN_FOUND: ID:", admin._id, "Hashed password in DB:", admin.password);

    // Match password
    const isMatch = await admin.comparePassword(password);
    console.log("LOGIN_PASSWORD_MATCH_RESULT: isMatch:", isMatch);

    if (!isMatch) {
      console.warn("LOGIN_FAILED: Password mismatch for email:", email);
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Return token and details
    console.log("LOGIN_SUCCESSFUL: Email:", email);
    return res.status(200).json({
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login Admin Controller Error:", error);
    return res.status(500).json({
      message: "Something went wrong during login.",
    });
  }
};

module.exports = {
  loginAdmin,
};
