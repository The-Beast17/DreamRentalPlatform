const jwt = require('jsonwebtoken');

module.exports.authUser = async (req , res , next)=>{
    try{
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        if(!token){
          return  res.status(401).json({message : "User not authenticated"});
        }
    //jo bhi data token banete time pass kra tha wo yaha se decode hoke mil jayega
    const decoded = jwt.verify(token , "dream-rental-secret-key");
    
    req.user = decoded;
    next();
    }catch(err){
        res.status(401).json({message : "unauthorized"});
    }

}