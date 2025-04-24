const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();


router.get("/verify" , authController.verifyController);

 module.exports  = router;