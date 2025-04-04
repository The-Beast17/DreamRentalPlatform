const mongoose = require("mongoose");
<<<<<<< HEAD

=======
>>>>>>> cce9246056440e088c79a5de3cb312a23a0da775
const userSchema =  mongoose.Schema({
     userName : {
        type : String,
     },
     email : {
        type : String,
     },
     password: {
        type : String,
     },
     mobileNumber : {
        type : Number,
     },
     gender:{
        type : String,
     },
     state : {
        type : String,
     },
     city : {
        type :String, 
     },
     profileImage : {
        type : String,
        default : "FRONTEND/src/images/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
     },
});

const userModel  = mongoose.model("user" , userSchema);
module.exports = userModel;
