const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//signup controller
module.exports.signupUserController = async(req , res)=>{
  const {userName , email , password , mobileNumber, gender , state , city} = req.body;
  console.log(userName , email)
  const isUser = await userModel.findOne({
    email
  });

  if(isUser){
    return res.status(400).json({
        message : "user already exist with this email"
    })
  }

  const hashPassword = bcrypt.hashSync(password,10);
  const user = await userModel.create({
    userName , email , password:hashPassword, mobileNumber , gender , state , city
   });

   const token = jwt.sign({
     id : user._id,
     email : user.email,
   },"dream-rental-secret-key");

   res.cookie("token" , token);

   res.status(201).json({
    user : user,
    token : token
   })
}


// login controller
module.exports.loginUserController = async (req , res)=>{
  const {email , password} = req.body;
  const user = await userModel.findOne({email});
  if(!user){
    return res.status(400).json({message :"Email is incorrect"})
  }

  //it return true or flase
  const isMatch = await bcrypt.compare(password , user.password);
  
  if(!isMatch){
     return res.status(400).json({message:"incorrect Password"});
  }

  const token = jwt.sign({
    id:user._id,
    email : user.email
  },"dream-rental-secret-key");

  res.cookie("token" , token);

  res.status(201).json({
     user : user , token
  }); 
    
}

//logout controller
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


//verify user
module.exports.verifyUserController = async(req , res)=>{
  try{
    const token = req.cookies.token   //|| req.headers.authorization.split(" ")[1];
    if(!token){
      return res.status(401).json({authenticated: false});
    }
    
    //jo bhi data token banete time pass kra tha wo yaha se decode hoke mil jayega
    const decoded = jwt.verify(token , "dream-rental-secret-key");
    req.user = decoded;
    
    const user = await userModel.findById(decoded.id).select("-password"); // -password means password ko nahi dikhana hai
    if(!user){
      return res.status(401).json({authenticated: false});
    }

    res.json({ authenticated: true, user: user });
    } catch (err) {
      console.log(err)
        res.status(401).json({ authenticated: false , message : "User not authenticated" });
    }
}
