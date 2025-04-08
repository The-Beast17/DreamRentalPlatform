const express = require("express") ;
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");


const allowedOrigins = ["http://localhost:5173"]; // add more if needed

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // VERY IMPORTANT for cookies
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// Static files - serves files from uploads/ like /uploads/images/xyz.jpg
app.use('/uploads', express.static('uploads'));


app.use("/user", userRouter);
app.use("/post", postRouter);


module.exports = app;
