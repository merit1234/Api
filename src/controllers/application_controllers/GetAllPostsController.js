const Article = require("../../models/Article");
const logger = require("../../services/winstonLogger");
const defaultPaginationLimit = 4;
const defaultPage = 1;

async function getAllPosts(req, res) {
  const {author, title, tags, sortBy} = req.query;
  const allowedState = "published"
  try {
    //contructing the query params
    const query = {
      state: allowedState,
    // Add params if provided in query
      ...(author && {author}),
      ...(title && {title}),
      ...(tags && {tags:{$in: tags.split(',')}})
    };

    //set the sorting params based on what the user provided in query
    const sortParam = sortBy === "timestamp"?{timestamp:-1}:{readCount:-1}

    // Pagination params
    const page = parseInt(req.query.page) || defaultPage; // Default to page to show
    const limit = parseInt(req.query.limit) || defaultPaginationLimit; // Default limit of posts per page
    
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;
     console.log(query);
    // Fetch paginated posts with state published including the author data
    const posts = await Article.find(query).populate('author').skip(skip).limit(limit).sort(sortParam);
    // Response with pagination metadata
    res.status(200).json({
      currentPage: page,
      // totalPages: totalPages, // You need to calculate totalPages from the total number of documents, which is not present in this code
      pageSize: limit,
      // totalCount: totalPosts, // Same as totalPages, you need to fetch total count of documents from the database
      articles: posts,
    });
  } catch (error) {
     //used winston logger to log error
     logger.info(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

module.exports = getAllPosts;
