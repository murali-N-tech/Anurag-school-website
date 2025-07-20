const express = require('express');
const router = express.Router();
const { getNews, createNews, getNewsArticleById } = require('../controllers/newsController');

// Route to get all news and create a new article
router.route('/').get(getNews).post(createNews);

// Route for getting a single article by ID
router.route('/:id').get(getNewsArticleById);

module.exports = router;