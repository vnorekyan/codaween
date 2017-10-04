var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /users
router.get('/', function(req, res) {
  // res.send('GET /users');
  db.user.findAll({
    include: [{
      model: db.group
    },
    {
      model: db.costume
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
  return db.user.create({
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userPicture: req.body.userPicture,
    userEmail: req.body.userEmail,
    userVotes: req.body.userVotes
  })
  .then(function(user) {
    db.group.findOrCreate({
      where: {
        groupName: req.body.groupName,
        groupPicture: req.body.groupPicture,
        groupDescription: req.body.groupDescription
      }
    })
    .spread((group, created) => {
      user.addGroup(group);
    })
    return user;
  })
  .then(function(user) {
    console.log('user', user);
    db.costume.findOrCreate({
      where: {
        costumeName: req.body.costumeName,
        costumePicture: req.body.costumePicture,
        costumeDescription: req.body.costumeDescription,
        costumeLink: req.body.costumeLink
      }
    })
    .spread((costume, created) => {
      user.addCostume(costume);
      res.json(user);
    })
  })
  .catch(function(error) {
    res.json(error);
  });
})

// GET /users/:id
router.get('/:id', function(req, res) {
  db.user.find({
    where: { id: req.params.id },
    include: [{
      model: db.group
    },
    {
      model: db.costume
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
    },
    {
      model: db.costume
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
    },
    {
      model: db.costume
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
