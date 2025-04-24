const adminModel = require('../models/admin.model'); // Assuming you have an Admin model
const propertyModel = require('../models/properties.model');
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

// Admin signup
module.exports.signupAdminController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        console.log("Received data:", req.body); // Log the received data to verify

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            console.log("Admin already exists"); // Log for debugging
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new admin
        const newAdmin = new adminModel({
            userName,
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        console.log("New Admin created:", newAdmin); // Log the created admin details

        // Generate token with role
        const token = jwt.sign(
            { id: newAdmin._id, role: "admin" },
            process.env.JWT_SECRET_KEY
        );

        res.status(201).json({
            message: "Admin registered successfully",
            admin: {
                _id: newAdmin._id,
                userName: newAdmin.userName,
                email: newAdmin.email
            },
            token
        });
    } catch (error) {
        console.error("Admin signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




// Admin login
module.exports.loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // ✅ Include role in payload for middleware checks
        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            process.env.JWT_SECRET_KEY, // Don't hardcode secrets
        );

        // ✅ Secure Cookie Settings
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only true in production
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.status(200).json({ message: "Login successful", token }); // token optional
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// admin verify **
module.exports.verifyAdminController = async (req, res) => {
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        
        // If no token is found, return error
        if (!token) {
            return res.status(401).json({ authenticated: false, message: "No token provided" });
        }

        // Verify the token with the secret key
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if (err) {
                // Handle token verification errors (invalid or expired token)
                console.error('JWT Error:', err); // Log for debugging
                return res.status(401).json({ authenticated: false, message: "Invalid or expired token" });
            }

            // Look for the admin in the database using the decoded ID
            const admin = await adminModel.findById(decoded.id);
            if (!admin) {
                // If no admin is found, return error
                return res.status(404).json({ authenticated: false, message: "Admin not found" });
            }

            // If everything is fine, return the admin details
            res.status(200).json({ authenticated: true, admin });
        });
    } catch (error) {
        // Catch any server errors and respond
        console.error('Server Error:', error); // Log the error for debugging
        res.status(500).json({ authenticated: false, message: "Internal server error", error });
    }
};

/*logout admin */
module.exports.logoutAdminController = async (req, res) => {
  try {
    const token = req.cookies.token; 
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging out" });
  }
}


/**********get current user */

module.exports.getCurrentUser = async (req , res) =>{
    try {
        const admin = await adminModel.findById(req.user.id).select("-password");
        if (!admin) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(admin);
      } catch (err) {
        res.status(500).json({ message: "Server error" });
      }
}

/*******updateProfile  */
module.exports.updateAdminProfile = async (req, res) =>{
    try {
        const adminId = req.user.id;
        const { userName, email } = req.body;

        const updatedAdmin = await adminModel.findByIdAndUpdate(
            adminId,
            { userName, email },
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/* get all users*/
module.exports.getAllUserController = async (req, res) => {
    try {
        const users = await userModel.find(); // fetch all users
        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

/* update user status*/
module.exports.updateUserStatusController = async (req, res) => {
  const {userId } = req.params; 
  const {status } = req.body;

  if (!userId || !status) {
    return res.status(400).json({ message: "User ID and status are required" });
  }

  if (!['verified', 'rejected','pending','blocked'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: `User ${status} successfully`, user });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update Status of property
module.exports.updatePropertyStatusController = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const property = await propertyModel.findById(id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      property.status = status;
      await property.save();
  
      res.status(200).json({ message: 'Status updated successfully', property });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
