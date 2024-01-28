const express = require('express');
const router = express.Router();
const controller = require('../controllers/travel');

/* GET travel view. */
console.log('Inside app_server, routes, travel.js.');
// Define the route
router.get('/', controller.travel);

module.exports = router;
