const express = require('express');
const router = express.Router();
const controller= require('../controllers/travel');

/* GET home page. */
console.log('Inside app_server, routes, travel.js.');
router.get('/', controller.travel);

module.exports = router;
