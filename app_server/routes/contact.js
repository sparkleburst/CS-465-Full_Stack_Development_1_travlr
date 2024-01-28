const express = require('express');
const router = express.Router();
const controller= require('../controllers/contact');

/* GET about view. */
console.log('Inside app_server, routes, contact.js.');
router.get('/', controller.contact);

module.exports = router;