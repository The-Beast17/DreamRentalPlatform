const express = require("express");
const userController = require("../controllers/user.controller")
const router = express.Router();
const imageUploadMiddleware = require('../middlewares/upload.middleware')
const userMiddleware = require('../middlewares/userAuth.middleware'); //auth middleware

router.post("/signup", imageUploadMiddleware,userController.signupUserController);

router.post("/login/:role",userController.loginUserController);

router.get("/logout",userController.logoutUserController);

router.get('/verify', userController.verifyUserController);

router.get("/me" ,userMiddleware.authUser, userController.getCurrentUserController);

router.get('/getUser/:id',userMiddleware.authUser, userController.getUserController);

router.put('/updateUser',userMiddleware.authUser ,imageUploadMiddleware, userController.updateUserController);

router.delete('/deleteUser/:id', userController.deleteUserController);

router.post('/toggleWishlist/:propertyId', userMiddleware.authUser, userController.toggleWishlistController);

router.get('/getWishlist', userMiddleware.authUser, userController.getWishlistController);

router.put('/update-bio', userMiddleware.authUser, userController.updateBioController);


module.exports = router;