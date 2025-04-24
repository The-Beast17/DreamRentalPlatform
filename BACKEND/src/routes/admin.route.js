const express = require("express");
const adminController = require("../controllers/admin.controller");
const adminMiddleware = require("../middlewares/admin.middleware")
const router = express.Router();

// routes for admin
router.post("/signup",adminMiddleware, adminController.signupAdminController);
router.post("/login", adminController.loginAdminController);
router.get("/verify" , adminController.verifyAdminController );
router.get('/logout',adminController.logoutAdminController);
router.get('/me',adminMiddleware,adminController.getCurrentUser);
router.put('/update-profile',adminMiddleware, adminController.updateAdminProfile);
router.get('/getAllUsers',adminMiddleware,adminController.getAllUserController);
router.put('/updateUserStatus/:userId',adminMiddleware,adminController.updateUserStatusController);
router.put('/updatePropertyStatus/:id',adminMiddleware,adminController.updatePropertyStatusController);


module.exports = router;