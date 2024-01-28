const express = require('express');
const router = express.Router();
const controller= require('../controllers/about');

/* GET about view. */
console.log('Inside app_server, routes, about.js.');
router.get('/', controller.about);

module.exports = router;