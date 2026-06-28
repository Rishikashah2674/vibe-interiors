const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  // Set DNS servers to public resolvers (Google & Cloudflare) to ensure MongoDB SRV records
  // resolve correctly even if local machine's DNS is misconfigured or loopback (127.0.0.1).
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (dnsErr) {
    console.warn("Warning: Could not set DNS servers. Connection might fail if local DNS is misconfigured.");
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables (.env file).");
    }

    // Set up post-connection listeners to monitor database status and prevent silent crashes
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err.message || err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected.");
    });

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:");
    console.error(error.message || error);
    throw error; // Re-throw to let the server entry point handle it gracefully
  }
};

module.exports = connectDB;