const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require("path");
const dotenv = require("dotenv");
const propertyModel = require("../models/properties.model"); // Assuming you have a property model
dotenv.config({ path: "./.env" });
const cloudinary = require('../config/cloudinaryconfig');


//signup controller********************************************************************
module.exports.signupUserController = async (req, res) => {
  const { userName, email, password, countryCode, mobileNumber, gender, state, city, role, idProofNumber, idProofType } = req.body;
  console.log(userName, email)
  const isUser = await userModel.findOne({
    email
  });

  if (isUser) {
    return res.status(400).json({
      message: "user already exist with this email"
    })
  }

  let idProofImages = [];
  if (role === "landlord") {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "ID proof images are required for landlords."
      });
    }
    idProofImages = req.uploadedImageUrls['idProofImages']?.map(image => ({
      url: image.url,
      public_id: image.public_id,
    })) || [];
  }

  const hashPassword = bcrypt.hashSync(password, 10);
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
    mobileNumber,
    countryCode,
    gender,
    state,
    city,
    role,
    idProofImages,
    idProofNumber,
    idProofType,
  });

  const token = jwt.sign({
    id: user._id,
    email: user.email,
  }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // use true in production (HTTPS)
    sameSite: "Lax", // or "None" if HTTPS + cross-site
  });

  res.status(201).json({
    user: user,
    token: token
  })
}


// login controller************************************************************
module.exports.loginUserController = async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Email is incorrect" })
  }

  if (user.role !== role) {
    return res.status(400).json({ message: "Role mismatch: Your account does not match the selected role. Please select either Tenant or Landlord." });
  }

  //it return true or flase
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "incorrect Password" });
  }

  const token = jwt.sign({
    id: user._id,
    email: user.email
  }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // use true in production (HTTPS)
    sameSite: "Lax", // or "None" if HTTPS + cross-site
  });

  res.status(201).json({
    user: user, token
  });

}

//logout controller*************************************************************************
module.exports.logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token;
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging out" });
  }
}


//verify user****************************************************************************
module.exports.verifyUserController = async (req, res) => {
  try {
    const token = req.cookies.token   //|| req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    //jo bhi data token banete time pass kra tha wo yaha se decode hoke mil jayega
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    const user = await userModel.findById(decoded.id).select("-password"); // -password means password ko nahi dikhana hai
    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    res.json({ authenticated: true, user: user });
  } catch (err) {
    console.log(err)
    res.status(401).json({ authenticated: false, message: "User not authenticated" });
  }
}

//get current user data*****************************************************************************
module.exports.getCurrentUserController = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT payload has `id`

    const user = await userModel.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user
    });
  } catch (err) {
    console.error("Error in getCurrentUserController:", err.message);
    res.status(500).json({ message: "Server error while fetching user" });
  }
};

// get user controller****************************************************************************
module.exports.getUserController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await userModel.findById(id).select("-password"); // -password means password ko nahi dikhana hai
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user
    }
    );
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

//update user profile***************************************************************************
module.exports.updateUserController = async (req, res) => {
  const userId = req.user.id;
  const {
    userName,
    email,
    mobileNumber,
    gender,
    state,
    city,
    password,
    confirmPassword,
    idProofType,
    idProofNumber,
  } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Basic fields
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;
    user.gender = gender || user.gender;
    user.state = state || user.state;
    user.city = city || user.city;

    // Password update
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      user.password = bcrypt.hashSync(password, 10);
    }

    if (user.role === 'landlord') {
      if (idProofType) user.idProofType = idProofType;
      if (idProofNumber) user.idProofNumber = idProofNumber;

      // If new ID proof images are uploaded
      if (
        req.uploadedImageUrls &&
        req.uploadedImageUrls['idProofImages'] &&
        req.uploadedImageUrls['idProofImages'].length > 0
      ) {
        // Optional: delete old Cloudinary images if needed
        if (user.idProofImages && user.idProofImages.length > 0) {
          for (const img of user.idProofImages) {
            if (img.public_id) {
              await cloudinary.uploader.destroy(img.public_id); // delete from Cloudinary
            }
          }
        }

        // Save new images
        user.idProofImages = req.uploadedImageUrls['idProofImages'].map(image => ({
          url: image.url,
          public_id: image.public_id,
        }));


        if (idProofNumber || idProofType || user.idProofImages) {
          user.status = "pending";
        }
      }
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        userName: user.userName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        gender: user.gender,
        state: user.state,
        city: user.city,
        role: user.role,
        ...(user.role === 'landlord' && {
          idProofType: user.idProofType,
          idProofNumber: user.idProofNumber,
          idProofImages: user.idProofImages,
        }),
      },
    });
  } catch (error) {
    console.error("Error in updateUserController:", error.message);
    res.status(500).json({ message: "Server error while updating user" });
  }
};

//delete user controller****************************************************************************
module.exports.deleteUserController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user's ID proof images from Cloudinary
    if (user.idProofImages && user.idProofImages.length > 0) {
      for (const img of user.idProofImages) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

     // If the user is a landlord, delete all their properties and images
     if (user.role === 'landlord') {
      const properties = await propertyModel.find({ author: id });

      for (const property of properties) {
        // Delete property images from Cloudinary
        if (property.propertyImages && property.propertyImages.length > 0) {
          for (const img of property.propertyImages) {
            if (img.public_id) {
              await cloudinary.uploader.destroy(img.public_id);
            }
          }
        }

        // Delete property document images from Cloudinary
        if (property.propertyDocImages && property.propertyDocImages.length > 0) {
          for (const doc of property.propertyDocImages) {
            if (doc.public_id) {
              await cloudinary.uploader.destroy(doc.public_id);
            }
          }
        }

        // Delete property from database
        await propertyModel.findByIdAndDelete(property._id);
      }
    }

    await userModel.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUserController:", error.message);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};

/*WhisList controller****************************************************************************/
// Toggle Wishlist Property
module.exports.toggleWishlistController = async (req, res) => {
  try {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyWishlisted = user.wishList.includes(propertyId);

    if (alreadyWishlisted) {
      user.wishList.pull(propertyId); // remove from wishlist
    } else {
      user.wishList.push(propertyId); // add to wishlist
    }

    await user.save();

    res.status(200).json({
      message: alreadyWishlisted ? "Removed from wishlist" : "Added to wishlist",
      wishList: user.wishList
    });
  } catch (error) {
    console.error("Toggle wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Wishlist*************************************************************************
module.exports.getWishlistController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).populate("wishList");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.wishList);
  } catch (error) {
    console.error("Fetch wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/*Update Bio Controller*************************************************************************/

module.exports.updateBioController = async (req, res) => {
  const { bio } = req.body;
  const userId = req.user.id;
  console.log("Bio:", bio);

  try {
    if (!bio || bio.trim() === '') {
      return res.status(400).json({ message: "Bio cannot be empty." });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Bio updated successfully", bio: updatedUser.bio });
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).json({ message: "Server error while updating bio." });
  }
};

