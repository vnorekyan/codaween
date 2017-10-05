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

router.get('/:id/edit', function(req, res){
  // extra security to block unauthorized users from editing costumes
  var thisId = req.params.id;
  var userEmail;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.group.find({
    where: {id: thisId },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    // check if user is included in group
    if(group.users.filter(u => { return u.userEmail == userEmail; }).length > 0){
      res.render('editGroup', {
        group: group
      });
    } else {
      res.send('this is not your costume!')
    }
  })

});

router.get('/:id/join', (req, res) => {
  var currentUserEmail;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    currentUserEmail = decoded.data;
  });

  db.group.find({
    where: { id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    // extra check -- make sure user is not already in the group
    if(group.users.filter(u => { return u.userEmail === currentUserEmail; }).length > 0){
      res.send('you are already in this group!!');
    } else {
      db.user.find({
        where: { userEmail: currentUserEmail }
      })
      .then(u => {
        group.addUser(u);
        res.redirect(`/groups/${req.params.id}`);
      })
      .catch(err => {
        res.json(err);
      })
    }

  })
  .catch(function(error) {
    res.json(error);
  });
});

// GET /groups/:id
router.get('/:id', function(req, res) {
  var userEmail;
  var isMine = false;
  // grabbing and storing the user's email
  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.group.find({
    where: { id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    if (!group) throw Error();

    // see if current user is included in the costume object
    if(group.users.filter(u => { return u.userEmail == userEmail; }).length > 0){
      isMine = true;
    }

    res.render('group', {
      group: group,
      mine: isMine
    });

  })
  .catch(function(error) {
    res.json(error);
  });
});

router.put('/:id/leave', (req, res) => {
  var userEmail;
  // grabbing and storing the user's email
  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.group.find({
    where: { id: req.params.id }
  })
  .then(gp => {
    db.user.find({
      where: { userEmail: userEmail }
    })
    .then(u => {
      gp.removeUser(u);
      res.redirect('/groups');
    })
    .catch(err => {
      res.json(err);
    })
  })
  .catch(err => {
    // can't remove user?
    res.json(err);
  })





});

// PUT /groups/:id
router.put('/:id', function(req, res) {
  // extra security to block unauthorized users
  var thisId = req.params.id;
  var userEmail;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.group.find({
    where: {id: thisId },
    include: [{
      model: db.user
    }]
  })
  .then(function(group) {
    // check if user is included in costume
    if(group.users.filter(u => { return u.userEmail == userEmail; }).length > 0){
      group.updateAttributes(req.body);
      res.redirect(`/groups/${thisId}`);

    } else {
      res.send('This is not your group!')
    }
  })
  // .then(function(costume) {
  //   res.redirect('/costumes');
  //   // console.log('success')
  // })
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
    res.redirect('/groups');
  });
});

module.exports = router;
