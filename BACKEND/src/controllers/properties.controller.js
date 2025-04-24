const fs = require('fs');
const path = require("path");
const propertyModel = require("../models/properties.model");
const userModel = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cloudinary = require('../config/cloudinaryconfig');



// Controller for creating a post
module.exports.createPostController = async (req, res) => {
    const { title, description,state,city, location, propertyType, bedrooms, bathrooms, price, amenities, features } = req.body;
    const author = req.user.id; // Assuming you have user authentication middleware that sets req.user
    try {
        const propertyImages = req.uploadedImageUrls['propertyImages']?.map(image => ({
            url: image.url,        // URL of the image
            public_id: image.public_id,  // Cloudinary public ID of the image
        })) || [];

        const propertyDocImages = req.uploadedImageUrls['propertyDocImages']?.map(doc => ({
            url: doc.url,          // URL of the document image
            public_id: doc.public_id,  // Cloudinary public ID of the document image
        })) || [];


        const newPost = await propertyModel.create({
            title,
            description,
            propertyImages,
            state,
            city,
            location,
            propertyType,
            bedrooms,
            bathrooms,
            price,
            amenities: amenities.trim().split(","),
            features: features.trim().split(","),
            propertyDocImages,
            author,
        });

         //userModel me particular user ko find karege or posts array me push kr dega 
    await userModel.findOneAndUpdate(
        {_id:req.user.id},
        {
            $push:{
                properties : newPost._id
            }
        }
    )
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
}



/*get user Properties*/
module.exports.getUserPropertiesController = async (req, res) => {
    try {
        const { id } = req.params;
        const properties = await propertyModel.find({ author: id }).populate('author').populate('author', '-password');
        res.status(200).json(properties);
    } catch (error) {
        console.error("Error fetching user properties:", error);
        res.status(500).json({ message: "Error fetching posts", error });
    }
};



/*get single [post]*/
module.exports.getPostController = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Post ID is required" });
    }

    try {
        const post = await propertyModel.findById(id).populate('author', '-password')
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
}

// get all [posts]
module.exports.getAllPropertiesController = async (req, res) => {
    try {
        const posts = await propertyModel.find({}).populate("author", "-password");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

//update property controller***
module.exports.updatePropertyController = async (req, res) => {
    const { id } = req.params;
    const { title, description,state,city, location, propertyType, bedrooms, bathrooms, price, amenities, features } = req.body;
    const author = req.user.id; // Assuming user authentication middleware sets req.user

    if (!id) {
        return res.status(400).json({ message: "Property ID is required" });
    }

    try {
        // 1. Find existing property
        const existingProperty = await propertyModel.findOne({ _id: id, author });

        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found or unauthorized" });
        }

        // 2. Delete old images from Cloudinary (if new ones are uploaded)
        if (req.uploadedImageUrls['propertyImages']?.length > 0) {
            for (const img of existingProperty.propertyImages) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        if (req.uploadedImageUrls['propertyDocImages']?.length > 0) {
            for (const doc of existingProperty.propertyDocImages) {
                await cloudinary.uploader.destroy(doc.public_id);
            }
        }

        // 3. Prepare new image arrays
        const propertyImages = req.uploadedImageUrls['propertyImages']?.map(image => ({
            url: image.url,
            public_id: image.public_id,
        })) || existingProperty.propertyImages;

        const propertyDocImages = req.uploadedImageUrls['propertyDocImages']?.map(doc => ({
            url: doc.url,
            public_id: doc.public_id,
        })) || existingProperty.propertyDocImages;

        // 4. Update the property
        const updatedPost = await propertyModel.findOneAndUpdate(
            { _id: id, author }, // Ensure the author is the one updating the post
            {
                title,
                description,
                state,
                city,
                location,
                propertyType,
                bedrooms,
                bathrooms,
                price,
                amenities: amenities?.trim().split(","),
                features: features?.trim().split(","),
                propertyImages,
                propertyDocImages,
                status: propertyDocImages !== existingProperty.propertyDocImages ? 'pending' : existingProperty.status,
            },
            { new: true } // Return the updated document
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating property", error });
    }
};

/* update availablity controller  */
module.exports.updateAvailablityController = async (req, res) => {
    try {
        const property = await propertyModel.findById(req.params.id);
        property.availability = !property.availability;
        await property.save();
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json({ message: 'Failed to toggle availability' });
    }
};


/* delete property controller */
module.exports.deletePropertyController = async (req, res) => {
    try {
        const property = await propertyModel.findById(req.params.id);
        if (!property || !property.author) {
            return res.status(404).json({ message: 'Property not found or owner missing' });
        }

        // Optional: Check if user is the owner or an admin
        if (property.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized to delete this property' });
        }

        // Delete Cloudinary images
        const deleteFromCloudinary = async (imageArray) => {
            for (const image of imageArray) {
                if (image.public_id) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }
        };

        await deleteFromCloudinary(property.propertyImages);
        await deleteFromCloudinary(property.propertyDocImages);

        // Delete the property from DB
        await propertyModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ message: 'Server error while deleting property' });
    }
};

