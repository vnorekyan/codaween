var express = require('express');
var db = require('../models');
var jwt = require('jsonwebtoken');
var config = require('../config/main');
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
    // res.json(costumes);
    res.render('allCostumes', {
      costumes: costumes
    })
  })
  .catch(function(error) {
    res.json(error);
  });
});

// GET costumes/create
router.get('/create', function(req, res){
  res.render('newCostume', {
    message: null
  });
});

// POST /costumes
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
    db.costume.create({
      costumeName: req.body.costumeName,
      costumePicture: req.body.costumePicture,
      costumeDescription: req.body.costumeDescription
    })
    .then(function(costume) {
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
        user.addCostume(user);
        costume.addUser(user);
        // res.json(costume);
        res.redirect(`/costumes/${costume.id}`)
      });
    })
    .catch(function(error) {
      res.json(error);
    });
  })

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
    res.render('costume', {
      costume: costume
    });
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
