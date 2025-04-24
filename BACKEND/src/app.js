const express = require("express") ;
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/properties.route");
const adminRouter = require("./routes/admin.route");
const authRouter = require("./routes/auth.route")
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });



const allowedOrigins = [process.env.CLIENT_URL]; // add more if needed

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


app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Static files - serves files from uploads/ like /uploads/images/xyz.jpg
app.use('/uploads', express.static('uploads'));


app.use("/user", userRouter);
app.use("/properties", postRouter);
app.use("/admin",adminRouter);
app.use("/auth",authRouter);


module.exports = app;
