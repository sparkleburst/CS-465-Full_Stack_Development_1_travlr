const express = require('express');
const router = express.Router();
const controller = require('../controllers/news');

/* GET news view. */
console.log('Inside app_server, routes, news.js.');
// Define the route
router.get('/', controller.news);

module.exports = router;