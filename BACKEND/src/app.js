const express = require("express") ;
const userRouter = require("./routes/user.route");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const allowedOrigins = [
  "http://localhost:5173",
  "https://dreamrental-1-frontend.onrender.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🚀 Request Origin:", origin); // For debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // <-- this line handles preflight

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use("/user", userRouter);


module.exports = app;
