const express = require("express");
const userController = require("../controllers/user.controller")
const router = express.Router();


router.post("/signup",userController.signupUserController);

router.post("/login",userController.loginUserController);

router.get("/logout",userController.logoutUserController);

router.get('/verify', userController.verifyUserController);

router.get('/getUser/:id', userController.getUserController);


module.exports = router;