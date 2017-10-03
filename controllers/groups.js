var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /groups
router.get('/', function(req, res) {
  res.send('GET /groups');
});

// POST /groups
// GET /groups/:id
// PUT /groups/:id
// DELETE /groups/:id

module.exports = router;
