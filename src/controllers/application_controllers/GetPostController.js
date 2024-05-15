const Article = require("../../models/Article");
const logger = require("../../services/winstonLogger");

async function getPost(req, res) {
  try {
    // Fetch a single post by ID
    const post = await Article.findById(req.params.postId).populate('author');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    //increment the readCount by 1
    post.readCount += 1;
    //save record
    await post.save();
    //return response
    res.status(200).json(post);
  } catch (error) {
    //used winston logger to log error
    logger.info(error);
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}

module.exports = getPost;
