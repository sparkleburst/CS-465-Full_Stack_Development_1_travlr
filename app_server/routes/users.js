const express = require('express');
const router = express.Router();

/* GET users listing. */
console.log('Inside app_server, routes, users.js.');
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
