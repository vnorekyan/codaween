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
    res.status(200).json(users);
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
router.get('/:id', function(req, res) {
  db.user.find({
    where: { id: req.params.id },
    include: [{
      model: db.group
    }]
  })
  .then(function(user) {
    if (!user) throw Error();
    res.json(user);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// PUT /users/:id
router.put('/:id', function(req, res) {
  db.user.find({
    where: {id: req.params.id },
    include: [{
      model: db.group
    }]
  })
  .then(function(user) {
    user.updateAttributes(req.body);
  })
  .then(function(user) {
    res.json(user);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// DELETE /users/:id
router.delete('/:id', function(req, res) {
  db.user.find({
    where: {id: req.params.id },
    include: [{
      model: db.group
    }]
  })
  .then(function(user) {
    user.destroy();
  })
  .then(function(user) {
    res.json(user);
  });
});
module.exports = router;
