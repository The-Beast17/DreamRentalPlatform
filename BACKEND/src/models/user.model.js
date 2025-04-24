const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   userName: {
      type: String,
   },
   email: {
      type: String,
   },
   password: {
      type: String,
   },
   countryCode: {
      type: String,
   },
   mobileNumber: {
      type: Number,
   },
   gender: {
      type: String,
   },
   state: {
      type: String,
   },
   city: {
      type: String,
   },
   profileImage: {
      type: String,
      default: "FRONTEND/src/images/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
   },
   role: {
      type: String,
      enum: ['tenant', 'landlord'],
      default: 'tenant'
   },

   idProofType: {
      type: String,
   },
   idProofNumber: {
      type: String,
   },
   idProofImages: [{
      url: { type: String, required: true },
      public_id: { type: String, required: true }
   }],

   bio: {
      type: String,
      default: "",
   },

   status: {
      type: String,
      enum: ["verified", "pending", "rejected", "blocked"],
      default: "pending",
   },

   properties: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "properties"
      }
   ],

   wishList: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "properties"
      }
   ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
