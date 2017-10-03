var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /costumes
router.get('/', function(req, res) {
  res.send('GET /costumes');
});

// POST /costumes
// GET /costumes/:id
// PUT /costumes/:id
// DELETE /costumes/:id

module.exports = router;