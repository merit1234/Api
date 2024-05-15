const Article = require("../../models/Article");
const logger = require("../../services/winstonLogger");
const calculateReadingTime = require("../../utils/calculateReadingSpeed");

async function createPost(req, res) {
  try {
    const { title, description, tags, body } = req.body;
    // userId of authenticated User
    const author = req.user.userId;
    // Calculate reading time of the body
    const readingTime = calculateReadingTime(body, 50); // Changed variable name
    // Create a new post
    const post = await Article.create({ title, description, author, tags, body, readingTime }); // Include readingTime in the object
    // Return success response
    res.status(201).json(post);
  } catch (error) {
    //used winston logger to log error
    logger.info(error);
    res.status(500).json({ error: error });
  }
}

module.exports = createPost;
