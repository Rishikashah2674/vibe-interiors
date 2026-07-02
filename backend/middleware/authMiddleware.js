const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Retrieve token from Authorization header (Bearer <token>)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. Token is missing.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "vibe_interiors_luxury_secret_key_2026");

    // Fetch the admin from DB
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({
        message: "Not authorized. Admin user not found.",
      });
    }

    // Attach admin to request object
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message || error);
    return res.status(401).json({
      message: "Not authorized. Token is invalid or expired.",
    });
  }
};

module.exports = authMiddleware;
