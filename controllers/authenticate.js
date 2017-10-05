var express = require('express');
var db = require('../models');
var router = express.Router();
var db = require('../models');
var jwt = require('jsonwebtoken');
var validateJwt = require('express-jwt');
var config = require('../config/main');
var bcrypt = require('bcrypt');

// register new users
router.get('/register', function(req, res){
  res.render('register', {
    message: null
  });
});

router.post('/register', function(req, res){
  console.log(req.body);
  if(!req.body.email || !req.body.password){
    res.render('register', {
      message: 'please enter an email and password to register'
    });
  } else if(req.body.password !== req.body.verifypassword){
    res.render('register', {
      message: 'passwords do not match'
    });
  }
  else {
    bcrypt.genSalt(10, function(err, salt){
      if (err) { return next(err); }
      bcrypt.hash(req.body.password, salt)
      .then(hash => {
        var newUser = db.user.create({
          userFirstName: req.body.fname,
          userLastName: req.body.lname,
          userEmail: req.body.email,
          userPassword: hash
        })
        .then(
          function(user){
            // user created! generate token then send to the homepage
            var data = user.userEmail;
            var token = jwt.sign({data}, config.secret, { expiresIn: '1h' });
            res.cookie('jwt', token);
            // res.cookie('user', data);
            res.render('homepage', {
              user: user
            });
          }
        )
        .catch(err => {
          res.render('register', {
            message: `${req.body.email} is already a registered user`
          })
        })
      })
      .catch(err => {
        res.json(err);
      })
    });
  }
});

// login using jwts
router.get('/login', function(req, res){
  res.render('login', {
    message: null
  });
});


router.post('/login', function(req, res){
  db.user.find({
    where: {
        userEmail: req.body.email,
      }
    })
    .then(function(user){
      bcrypt.compare(req.body.password, user.userPassword)
      .then(response => {
        if(response){
          var data = req.body.email;
          var token = jwt.sign({data}, config.secret, { expiresIn: '1h' });
          res.cookie('jwt', token);
          res.redirect('/authenticate/homepage');
        } else {
          // username is correct but password is not
          res.render('login', {
            message: 'invalid login credentials'
          });
        }
      })
    })
    .catch(err => {
      // unable to find user in database
      res.render('login', {
        message: 'invalid login credentials'
      });
      // res.send('authentication failed. check username or password.');
    })

});

// protect the homepage with jwt token check
router.get('/homepage', function(req, res){
    // variable for user's email we'll get from the jwt
    var em;
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
      res.render('homepage', {
        user: userDetails
      });
    })
    .catch(err => {
      res.json(err);
    })
});

// logout route
router.post('/logout', function(req, res){
  if (req.cookies.jwt){
    res.clearCookie("jwt").redirect('/authenticate/login');
  } res.redirect('/authenticate/login');
})



module.exports = router;
