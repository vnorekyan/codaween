var express = require('express');
var db = require('../models');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    res.render('allUsers', {
      active: "users",
      page: req.url,
      users: users
    });
  })
  .catch(function(error) {
    res.json(error);
  });
});

router.get('/me', csrfProtection, (req, res) => {
  var me;
  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    me = decoded.data;
  });

  db.user.find({
    where: {
      userEmail: me
    }, include: [{
      model: db.group
    },
    {
      model: db.costume
    }]
  })
  .then(u => {
    res.render('user', {
      active: "profile",
      page: req.url,
      user: u,
      me: true,
      csrfToken: req.csrfToken()

    });
  })
  .catch(err => {
    res.json(err);
  })
});

// POST /users
router.post('/', function(req, res) {
  return db.user.create({
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userPicture: req.body.userPicture,
    userEmail: req.body.userEmail
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

// GET /users/data/:id
router.get('/data/:id', function(req, res) {
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
    // res.json(user);
    res.json(user);
  })
  .catch(function(error) {
    res.json(error);
  });
});

// PUT /users/:id
router.put('/:id', urlencodedParser, csrfProtection, function(req, res) {
  var thisId = req.params.id;
  var em;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    em = decoded.data;
  });

  db.user.find({
    where: { userEmail: em },
    include: [{
      model: db.group
    },
    {
      model: db.costume
    }]
  })
  .then(function(user) {
    user.updateAttributes(req.body);
    res.redirect(`/users/${thisId}`);
  })
  .catch(function(error) {
    // res.json(error);
    res.send('not you!');
  });
});

// GET /users/:id
router.get('/:id', csrfProtection, function(req, res) {
  var isMe = false;
  var email;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    email = decoded.data;
  });

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
    // res.json(user);
    if(user.userEmail == email){
      res.render('user', {
        active: "users",
        page: req.url,
        user: user,
        me: true,
        csrfToken: req.csrfToken()
      });
    } else {
      res.render('user', {
        active: "users",
        page: req.url,
        user: user,
        me: false,
        csrfToken: req.csrfToken()
      });
    }
  })
  .catch(function(error) {
    res.json(error);
  });
});

router.get('/:id/edit', csrfProtection, function(req, res){
  // ensuring user can only edit his/her own profile
  var thisId = req.params.id;
  var userEmail;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.user.find({
    where: { userEmail: userEmail }
  })
  .then(function(user) {
    if(thisId == user.id){
      // costume.updateAttributes(req.body);
      res.render('editUser', {
        active: "users",
        page: req.url,
        user: user,
        csrfToken: req.csrfToken()
      });
    } else {
      res.send('this is not you!')
    }
  })
  .catch(function(err){
    res.send('this is not you');
  })

});

// DELETE /users/:id
router.delete('/:id', urlencodedParser, csrfProtection, function(req, res) {
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
    res.clearCookie("jwt").redirect('/authenticate/login');
  });
});

module.exports = router;
