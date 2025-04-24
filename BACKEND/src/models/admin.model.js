const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
