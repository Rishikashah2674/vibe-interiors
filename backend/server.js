const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const testimonialsRoutes = require("./routes/testimonialsRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Configure CORS to allow both possible frontend ports
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

// Body parser middleware
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route returning JSON response
app.get("/", (req, res) => {
  res.json({ message: "VIBE Interiors Backend Running" });
});

// Register all route handlers
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();

    // Start Express server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server: Database connection failed.");

    // Start the server anyway to prevent a silent process crash and allow serving status/health checks
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (Database Offline)`);
    });
  }
};

startServer();