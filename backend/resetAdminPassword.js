const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("NewPassword@123", 10);

    await Admin.updateOne(
      { email: "info@vibeinteriors.co.in" },
      { $set: { password: hashedPassword } }
    );

    console.log("✅ Password updated successfully.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetPassword();