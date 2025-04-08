const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    propertyType:{
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;