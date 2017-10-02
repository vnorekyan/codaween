var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /users
router.get('/', function(req, res) {
  res.send('GET /users');
});

// POST /users
// GET /users/:id
// PUT /users/:id
// DELETE /users/:id
module.exports = router;
