var express = require('express');
var db = require('../models');
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//GET /costumes/data
router.get('/data', function(req, res) {
  //res.send('GET /groups');
  db.costume.findAll({
    include: [{
      model: db.user
    }]
  })
  .then(function(costumes) {
    // res.json(costumes);
    res.json(costumes);
  })
  .catch(function(error) {
    res.json(error);
  });
});

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
      active: "costumes",
      page: req.url,
      costumes: costumes
    })
  })
  .catch(function(error) {
    res.json(error);
  });
});

// GET costumes/create
router.get('/create', csrfProtection, function(req, res){
  res.render('newCostume', {
    active: "create-costume",
    page: req.url,
    message: null,
    csrfToken: req.csrfToken()
  });
});

// POST /costumes
router.post('/create', urlencodedParser, csrfProtection, function(req, res) {
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
      costumeDescription: req.body.costumeDescription,
      costumeVotes: 0
    })
    .then(function(costume) {
      db.user.findOrCreate({
        where: {
          userFirstName: userDetails.userFirstName,
          userLastName: userDetails.userLastName,
          userPicture: userDetails.userPicture,
          userEmail: userDetails.userEmail
        }
      })
      .spread((user, created) => {
        user.addCostume(user);
        costume.addUser(user);
        // res.json(costume);
        res.redirect('/costumes')
      });
    })
    .catch(function(error) {
      res.json(error);
    });
  })

});


// GET /costumes/data/:id
router.get('/data/:id', function(req, res) {
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

// GET /costumes/:id
router.get('/:id', function(req, res) {
  var userEmail;
  var isMine = false;
  // grabbing and storing the user's email
  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.costume.find({
    where: { id: req.params.id },
    include: [{
      model: db.user
    }]
  })
  .then(function(costume) {
    if (!costume) throw Error();

    // see if current user is included in the costume object
    if(costume.users.filter(u => { return u.userEmail == userEmail; }).length > 0){
      isMine = true;
    }

    res.render('costume', {
      active: "costumes",
      page: req.url,
      costume: costume,
      mine: isMine
    });

  })
  .catch(function(error) {
    res.json(error);
  });
});

router.get('/:id/edit', csrfProtection, function(req, res){
  // extra security to block unauthorized users from editing costumes
  var thisId = req.params.id;
  var userEmail;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.costume.find({
    where: {id: thisId },
    include: [{
      model: db.user
    }]
  })
  .then(function(costume) {
    // check if user is included in costume
    if(costume.users.filter(u => { return u.userEmail == userEmail; }).length > 0){
      // costume.updateAttributes(req.body);
      res.render('editCostume', {
        active: "costumes",
        page: req.url,
        costume: costume,
        csrfToken: req.csrfToken()
      });
    } else {
      res.send('this is not your costume!')
    }
  })
  .catch(function(error){
    res.json(error);
  })

});


// PUT /costumes/:id
router.put('/:id', function(req, res) {
  // extra security to block unauthorized users
  var thisId = req.params.id;
  var userEmail;

  jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
    userEmail = decoded.data;
  });

  db.costume.find({
    where: {id: thisId },
    include: [{
      model: db.user
    }]
  })
  .then(function(costume) {
    //check if user is included in costume
    // if(costume.users.filter(u => { return u.userEmail == userEmail; }).length > 0){
      costume.updateAttributes(req.body);
    }).then(function(costume) {
      res.json(costume);
      // res.redirect(`/costumes/${thisId}`);
    })


    // } else {
    //   res.send('this is not your costume!')
    // }

  .catch(function(error) {
    res.json(error);

  });
});


// DELETE /costumes/:id
router.delete('/:id', urlencodedParser, csrfProtection, function(req, res) {
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
    res.redirect('/costumes');
  });
});

module.exports = router;
