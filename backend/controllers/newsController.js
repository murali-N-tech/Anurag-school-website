const News = require('../models/News');

// @desc    Get all news articles
// @route   GET /api/news
exports.getNews = async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ publishDate: -1 });
    res.status(200).json(newsArticles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a news article
// @route   POST /api/news
exports.createNews = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const newArticle = new News({
      title,
      content,
      imageUrl,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single news article by ID
// @route   GET /api/news/:id
exports.getNewsArticleById = async (req, res) => {
  try {
    const article = await News.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};