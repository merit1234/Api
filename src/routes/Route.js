const express = require('express');
const router = express.Router();
const controller = require('../controllers/BaseController');
const { authenticateToken } = require('../middlewares/AuthMiddleware');
const isPostAuthor = require('../middlewares/isPostAuthor');


// Authentication routes
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/sign-out', controller.signOut);

// Blog routes
//create new article route
router.post('/posts', authenticateToken, controller.createPost);
//get all published articles route
router.get('/', controller.getAllPosts);
//get all articles posted by authenticated user route
router.get('/auth-user-articles',  authenticateToken, controller.getAllAuthUserPosts);
//get details of a single article route
router.get('/posts/:postId', controller.getPost);
//edit article route
router.put('/posts/:postId', authenticateToken, isPostAuthor, controller.updatePost);
//delete an article route
router.delete('/posts/:postId', authenticateToken, isPostAuthor, controller.deletePost);

module.exports = router;
