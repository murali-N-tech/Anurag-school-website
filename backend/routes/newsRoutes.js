const express = require('express');
const router = express.Router();
const { getNews, createNews } = require('../controllers/newsController');

// Route to get all news and create a new article
router.route('/').get(getNews).post(createNews);

module.exports = router;