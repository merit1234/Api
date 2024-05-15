const Article = require("../../models/Article");
const logger = require("../../services/winstonLogger");
const defaultPaginationLimit = 4;
const defaultPage = 1;

async function getAllAuthUserPosts(req, res) {
  const { state } = req.query; // Extacting state from query parameters
  try {
    // Constructing query object with author as a required filter
    const query = {
      author: req.user.userId, // Filter by authenticated user
      ...(state && { state: state }) // Add state filter if provided
    };

    // Pagination parameters
    const page = parseInt(req.query.page) || defaultPage;
    const limit = parseInt(req.query.limit) || defaultPaginationLimit;
    const skip = (page - 1) * limit;

    // Fetch paginated posts based on the constructed query
    const [articles, totalArticles] = await Promise.all([
      Article.find(query).skip(skip).limit(limit).populate('author'), // Fetch articles
      Article.countDocuments(query) // Count total articles
    ]);

    // Response with pagination metadata
    res.status(200).json({
      currentPage: page,
      pageSize: limit,
      totalCount: totalArticles,
      articles: articles // Send fetched articles
    });
  } catch (error) {
    // Log error using Winston logger
    logger.error(error);
    // Send error response
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}

module.exports = getAllAuthUserPosts;
