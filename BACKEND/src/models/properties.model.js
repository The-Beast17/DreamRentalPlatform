const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    propertyImages: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    }],
    location: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    propertyType: {
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
    propertyDocImages: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["verified", "pending", "rejected"],
        default: "pending",
    },
    availability: {
        type: Boolean,
        default: true, // true for available, false for unavailable
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const propertyModel = mongoose.model("properties", propertySchema);

module.exports = propertyModel;