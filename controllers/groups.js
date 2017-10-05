var express = require('express');
var db = require('../models');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/main');

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
    // res.json(groups);
    res.render('allGroups', {
      groups: groups
    })
  })
  .catch(function(error) {
    res.json(error);
  });
});

// GET groups/create
router.get('/create', function(req, res){
  res.render('newGroup', {
    message: null
  });
});

// POST /groups
router.post('/create', function(req, res) {
  var em;
  var details;
  // calling jwt.verify again to save the user's email address
  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    em = decoded.data;
  });
  // find user in our database and pull their information
  db.user.find({
    where: {
      userEmail: em
    }
  })
  .then(userDetails => {
    db.group.create({
      groupName: req.body.groupName,
      groupPicture: req.body.groupPicture,
      groupDescription: req.body.groupDescription
    })
    .then(function(group) {
      db.user.findOrCreate({
        where: {
          userFirstName: userDetails.userFirstName,
          userLastName: userDetails.userLastName,
          userPicture: userDetails.userPicture,
          userEmail: userDetails.userEmail,
          userVotes: userDetails.userVotes
        }
      })
      .spread((user, created) => {
        user.addGroup(user);
        group.addUser(user);
        // res.json(group);
        res.redirect('/groups');
      });
    })
    .catch(function(error) {
      res.json(error);
    });
  })

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
    res.render('group', {
      group: group
    });
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
