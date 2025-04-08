const express = require('express');
const postController = require('../controllers/post.controller');
const userMiddleware = require('../middlewares/userAuth.middleware'); // Assuming you have an auth middleware
const router = express.Router();


router.post('/createPost',userMiddleware.authUser, postController.createPostController);

router.get('/getPosts', userMiddleware.authUser ,postController.getPostsController);

router.get('/getPost/:id', userMiddleware.authUser ,postController.getPostController);

router.get('/getAllPosts', userMiddleware.authUser ,postController.getAllPostsController);

module.exports = router;