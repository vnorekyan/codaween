var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /users
router.get('/', function(req, res) {
  // res.send('GET /users');
  db.user.findAll({
    include: [{
      // model: db.costume,
      model: db.group
    }]
  })
  .then(function(users) {
    res.json(users);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// POST /users
router.post('/', function(req, res) {
  db.user.create({
    name: req.body.name,
    picture: req.body.picture,
    email: req.body.email
  })
  .then(function(user) {
    db.group.findOrCreate({
      where: {
        name: req.body.name,
        picture: req.body.picture,
        description: req.body.description
      }
    })
    .spread((group, created) => {
      user.addGroup(group);
      res.json(user);
    });
  })
  .catch(function(error) {
    res.json(error);
  });
});
// GET /users/:id
// PUT /users/:id
// DELETE /users/:id
module.exports = router;
