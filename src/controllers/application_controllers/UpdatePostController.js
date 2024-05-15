const Article = require("../../models/Article");
const logger = require("../../services/winstonLogger");

async function updatePost(req, res) {
  try {
    const { title, description, tags,state, body } = req.body;
    // Update a post by ID
    const post = await Article.findByIdAndUpdate(req.params.postId, { title, description, state, tags, body },{new:true, runValidators: true });
    //if post is not found
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
     //used winston logger to log  caught error
     logger.info(error);
    res.status(500).json({ error: "Ooops! something went wrong" });
  }
}

module.exports = updatePost;
