const multer = require("multer");
const path = require("path");
const postModel = require("../models/post.model");
const { get } = require("http");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads/images"));// Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp|avif|gif|bmp|tiff|svg/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed"));
        }
    },
});

// Controller for creating a post
module.exports.createPostController = [
    upload.array("images", 5), // Middleware to handle up to 5 image uploads
    async (req, res) => {
        const { title, description, location, propertyType, bedrooms, bathrooms, price, amenities, features } = req.body;
        const author = req.user.id; // Assuming you have user authentication middleware that sets req.user

        try {
            const images = req.files.map(file => `/uploads/images/${file.filename}`);
            // Get file paths of uploaded images

            const newPost = await postModel.create({
                title,
                description,
                images,
                location,
                propertyType,
                bedrooms,
                bathrooms,
                price,
                amenities: amenities.split(","),
                features: features.split(","),
                author,
            });

            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: "Error creating post", error });
        }
    },
];


/*get [posts]*/

module.exports.getPostsController = async (req, res) => {
    const author = req.user.id; // Assuming user authentication middleware sets req.user
    try {
        const posts = await postModel.find({ author });
        console.log(posts)
        res.status(200).json(posts);
    } catch (error) {
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
        const post = await postModel.findById(id).populate("author", "userName email phone");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
}

// get all [posts]
module.exports.getAllPostsController = async (req, res) => {
    try {
        const posts = await postModel.find({}).populate("author", "userName email phone");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};