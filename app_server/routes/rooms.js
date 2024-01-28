const express = require('express');
const router = express.Router();
const controller = require('../controllers/rooms');

/* GET rooms view. */
console.log('Inside app_server, routes, rooms.js.');
// Define the route
router.get('/', controller.rooms);

module.exports = router;