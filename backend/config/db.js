const mongoose = require("mongoose");
const dns = require("dns");
const Admin = require("../models/Admin");
const WebsiteSettings = require("../models/WebsiteSettings");
const { defaultSettings } = require("../controllers/settingsController");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is not defined in the environment variables (.env file)."
    );
  }

  // Set up post-connection listeners to monitor database status and prevent silent crashes
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB Connection Error:", err.message || err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
  });

  let connected = false;

  // 1. Try default connection
  try {
    console.log("Connecting to primary MongoDB (Default DNS)...");
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 4000 });
    console.log("MongoDB Connected Successfully (Primary/Default DNS)");
    connected = true;
  } catch (error) {
    console.warn("Primary MongoDB connection with default DNS failed:", error.message || error);
  }

  // 2. Try with custom DNS if default DNS failed
  if (!connected) {
    try {
      console.log("Setting DNS servers to 8.8.8.8, 1.1.1.1...");
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      console.log("Connecting to primary MongoDB (Custom DNS)...");
      await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 4000 });
      console.log("MongoDB Connected Successfully (Primary/Custom DNS)");
      connected = true;
    } catch (error) {
      console.warn("Primary MongoDB connection with custom DNS failed:", error.message || error);
    }
  }

  // 3. Try local fallback if primary connection failed completely
  if (!connected) {
    try {
      const localURI = "mongodb://127.0.0.1:27017/vibe-interiors";
      console.log("Attempting local MongoDB fallback...");
      await mongoose.connect(localURI, { serverSelectionTimeoutMS: 4000 });
      console.log("MongoDB Connected Successfully (Local Fallback)");
      connected = true;
    } catch (error) {
      console.error("Local fallback MongoDB connection also failed:", error.message || error);
      throw error;
    }
  }

  try {
    // Clean up any old admin records that are not part of the active credentials list
    const allowedEmails = ["info@vibeinteriors.co.in", "rishika@gmail.com"];
    await Admin.deleteMany({ email: { $nin: allowedEmails } });

    // Seed/Verify Admin 1: info@vibeinteriors.co.in (Priyanka Shah)
    const email1 = "info@vibeinteriors.co.in";
    let admin1 = await Admin.findOne({ email: email1 });
    if (!admin1) {
      admin1 = new Admin({
        name: "Priyanka Shah",
        email: email1,
        password: "Vibe@123",
      });
      await admin1.save();
      console.log("Admin created email:", email1);
      console.log("Password hash generated:", admin1.password);
    } else {
      console.log("Admin exists:", email1);
      const isMatch = await admin1.comparePassword("Vibe@123");
      if (!isMatch || admin1.name !== "Priyanka Shah") {
        admin1.name = "Priyanka Shah";
        admin1.password = "Vibe@123";
        await admin1.save();
        console.log("Password hash updated for:", email1);
        console.log("Password hash generated:", admin1.password);
      }
    }

    // Seed/Verify Admin 2: rishika@gmail.com (Rishika Shah)
    const email2 = "rishika@gmail.com";
    let admin2 = await Admin.findOne({ email: email2 });
    if (!admin2) {
      admin2 = new Admin({
        name: "Rishika Shah",
        email: email2,
        password: "Rishika@123",
      });
      await admin2.save();
      console.log("Admin created email:", email2);
      console.log("Password hash generated:", admin2.password);
    } else {
      console.log("Admin exists:", email2);
      const isMatch = await admin2.comparePassword("Rishika@123");
      if (!isMatch || admin2.name !== "Rishika Shah") {
        admin2.name = "Rishika Shah";
        admin2.password = "Rishika@123";
        await admin2.save();
        console.log("Password hash updated for:", email2);
        console.log("Password hash generated:", admin2.password);
      }
    }

    console.log("Admin user created/verified");

    // Auto-seed default website settings if none exist
    const settingsCount = await WebsiteSettings.countDocuments();
    if (settingsCount === 0) {
      const seedSettings = new WebsiteSettings(defaultSettings);
      await seedSettings.save();
      console.log("Seed Status: Created Default Website Settings Successfully.");
    }
  } catch (error) {
    console.error("MongoDB Connection Failed:");
    console.error(error.message || error);
    throw error; // Re-throw to let the server entry point handle it gracefully
  }
};

module.exports = connectDB;