var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /costumes
router.get('/', function(req, res) {
  //res.send('GET /groups');
  db.costume.findAll({
    include: [{
      model: db.user
    }]
  })
  .then(function(costumes) {
    res.json(costumes);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// POST /costumes
router.post('/', function(req, res) {
  db.costume.create({
    costumeName: req.body.costumeName,
    costumePicture: req.body.costumePicture,
    costumeDescription: req.body.costumeDescription,
    costumeLink: req.body.costumeLink
  })
  .then(function(costume) {
    db.user.findOrCreate({
      where: {
        userName: req.body.userName,
        userPicture: req.body.userPicture,
        userEmail: req.body.userEmail,
        userVotes: req.body.userVotes
      }
    })
    .spread((user, created) => {
      user.addCostume(user);
      res.json(costume);
    });
  })
  .catch(function(error) {
    res.json(error);
  });
});

// GET /costumes/:id
router.get('/:id', function(req, res) {
  db.costume.find({
    where: { id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(costume) {
    if (!costume) throw Error();
    res.json(costume);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// PUT /costumes/:id
router.put('/:id', function(req, res) {
  db.costume.find({
    where: {id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(costume) {
    costume.updateAttributes(req.body);
  })
  .then(function(costume) {
    res.json(costume);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// DELETE /costumes/:id
router.delete('/:id', function(req, res) {
  db.costume.find({
    where: {id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(costume) {
    costume.destroy();
  })
  .then(function(costume) {
    res.json(costume);
  });
});

module.exports = router;
