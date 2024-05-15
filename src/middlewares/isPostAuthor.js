const Article = require("../models/Article");
const logger = require("../services/winstonLogger");

// Middleware to check if the authenticated user is the author of the post
async function isPostAuthor(req, res, next) {
  try {
    // Fetch the post by ID
    const post = await Article.findById(req.params.postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the author of the post matches the authenticated user
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized access: You are not the author of this post' });
    }

    // If the user is the author, proceed to the next middleware
    next();
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = isPostAuthor;
