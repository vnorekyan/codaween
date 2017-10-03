var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /groups
router.get('/', function(req, res) {
  //res.send('GET /groups');
  db.user.findAll({
    include: [{
      // model: db.costume,
      model: db.user
    }]
  })
  .then(function(groups) {
    res.json(groups);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// POST /groups
router.post('/', function(req, res) {
  db.user.create({
    name: req.body.name,
    picture: req.body.picture,
    description: req.body.description
  })
  .then(function(group) {
    db.user.findOrCreate({
      where: {
        name: req.body.name,
        picture: req.body.picture,
        email: req.body.email
      }
    })
    .spread((user, created) => {
      user.addUser(user);
      res.json(group);
    });
  })
  .catch(function(error) {
    res.json(error);
  });
});
// GET /groups/:id
// PUT /groups/:id
// DELETE /groups/:id

module.exports = router;
