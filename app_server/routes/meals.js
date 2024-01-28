const express = require('express');
const router = express.Router();
const controller = require('../controllers/meals');

/* GET meals view. */
console.log('Inside app_server, routes, meals.js.');
// Define the route
router.get('/', controller.meals);

module.exports = router;