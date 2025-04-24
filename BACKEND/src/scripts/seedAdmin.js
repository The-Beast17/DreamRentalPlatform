// src/scripts/seedAdmin.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin.model"); // Path correct rakhna
const MONGO_URI = process.env.MONGO_URI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("ℹ️ Admin already exists. Skipping...");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const newAdmin = new Admin({
      userName: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();
    console.log("🎉 Admin user created successfully!");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};

module.exports = seedAdmin;
