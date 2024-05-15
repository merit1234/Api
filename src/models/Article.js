const mongoose = require('mongoose');
const articleSchema = require('../schemas/articleSchema');

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
