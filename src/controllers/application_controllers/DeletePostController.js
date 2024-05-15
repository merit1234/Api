const Article = require("../../models/Article");
const logger = require("../../services/winstonLogger");

async function deletePost(req, res) {
  try {
    // Delete a post by ID
    const post = await Article.findByIdAndDelete(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
     //used winston logger to log error
     logger.info(error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
}

module.exports = deletePost;
