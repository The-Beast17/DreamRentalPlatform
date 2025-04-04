const express = require("express") ;
const userRouter = require("./routes/user.route");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const corsOptions = {
   origin: ['http://localhost:5173', 'https://dreamrental-1-frontend.onrender.com']
    credentials: true, // Allow cookies and authorization headers
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter);


module.exports = app;
