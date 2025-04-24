
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const router = express.Router();
// auth.controller.js
module.exports.verifyController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ authenticated: false });

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(401).json({ authenticated: false });

      const user = await User.findById(decoded.id);
      if (user) {
        return res.status(200).json({ authenticated: true, role: "user", user });
      }

      const admin = await Admin.findById(decoded.id);
      if (admin) {
        return res.status(200).json({ authenticated: true, role: "admin", admin });
      }

      return res.status(401).json({ authenticated: false });
    });
  } catch (error) {
    return res.status(500).json({ authenticated: false, message: "Internal error", error });
  }
};



