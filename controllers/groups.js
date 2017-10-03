var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /groups
router.get('/', function(req, res) {
  //res.send('GET /groups');
  db.group.findAll({
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
  db.group.create({
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
      user.addGroup(user);
      res.json(group);
    });
  })
  .catch(function(error) {
    res.json(error);
  });
});

// GET /groups/:id
router.get('/:id', function(req, res) {
  db.group.find({
    where: { id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    if (!group) throw Error();
    res.json(group);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// PUT /groups/:id
router.put('/:id', function(req, res) {
  db.group.find({
    where: {id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    group.updateAttributes(req.body);
  })
  .then(function(group) {
    res.json(group);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// DELETE /groups/:id
router.delete('/:id', function(req, res) {
  db.group.find({
    where: {id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    group.destroy();
  })
  .then(function(group) {
    res.json(group);
  });
});

module.exports = router;
