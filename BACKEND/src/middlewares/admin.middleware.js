const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); 
dotenv.config({ path: "./.env" });

const adminMiddleware = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admins only." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
    
  }
};

module.exports = adminMiddleware;
