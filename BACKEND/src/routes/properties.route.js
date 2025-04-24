const express = require('express');
const propertyController = require('../controllers/properties.controller');
const userMiddleware = require('../middlewares/userAuth.middleware'); //auth middleware
const imageUploadMiddleware = require('../middlewares/upload.middleware')// upload middleware
const router = express.Router();


router.post('/createPost', userMiddleware.authUser,imageUploadMiddleware ,propertyController.createPostController);

router.get('/getUserProperties/:id', userMiddleware.authUser, propertyController.getUserPropertiesController);

router.get('/getProperty/:id', userMiddleware.authUser, propertyController.getPostController);

router.get('/getAllProperties', userMiddleware.authUser, propertyController.getAllPropertiesController);

router.put("/updateProperty/:id",userMiddleware.authUser,imageUploadMiddleware, propertyController.updatePropertyController);

router.patch('/availablity/:id',userMiddleware.authUser,propertyController.updateAvailablityController);

router.delete('/deleteProperty/:id',userMiddleware.authUser,propertyController.deletePropertyController);


module.exports = router;