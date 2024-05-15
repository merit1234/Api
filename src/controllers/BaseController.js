const createPostController = require('./application_controllers/CreatePostController');
const getAllPostsController = require('./application_controllers/GetAllPostsController');
const getPostController = require('./application_controllers/GetPostController');
const updatePostController = require('./application_controllers/UpdatePostController');
const deletePostController = require('./application_controllers/DeletePostController');
const signUpController = require('./auth_controllers/SignUpController');
const signInController = require('./auth_controllers/SignInController');
const { signOutController } = require('./auth_controllers/SignOutController');
const getAllAuthUserPostsController = require('./application_controllers/GetAllAuthUserPosts');

module.exports = {
  createPost: createPostController,
  getAllPosts: getAllPostsController,
  getAllAuthUserPosts: getAllAuthUserPostsController,
  getPost: getPostController,
  updatePost: updatePostController,
  deletePost: deletePostController,
  register: signUpController,
  login: signInController,
  signOut:signOutController,
};
