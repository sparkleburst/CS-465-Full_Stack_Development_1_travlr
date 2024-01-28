const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
console.log('Inside app_server, routes, index.js.');
router.get('/', ctrlMain.index);

module.exports = router;
