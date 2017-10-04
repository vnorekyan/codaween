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
  res.render('register');
});

router.post('/register', function(req, res){
  if(!req.body.email || !req.body.password){
    res.json({success: false, message: 'please enter an email and password to register'});
  } else {

    bcrypt.genSalt(10, function(err, salt){
      if (err) { return next(err); }
      bcrypt.hash(req.body.password, salt)
      .then(hash => {
        var newUser = db.user.create({
          userEmail: req.body.email,
          userPassword: hash
        })
        .then(
          function(user){
            // attempt to save the new user
            res.status(200).send(user)
          }
        )
        .catch(err => {
          res.send('username taken! try again.');
        })
      })
      .catch(err => {
        throw err;
      })
    });
  }
});

// login using jwts
router.get('/login', function(req, res){
  res.render('login');
});


router.post('/login', function(req, res){
  // in sequelize
  db.user.find({
    where: {
        userName: req.body.email,
      }
    })
    .then(function(user){
      bcrypt.compare(req.body.password, user.userPassword)
      .then(response => {
        if(response){
          var data = req.body.email;
          var token = jwt.sign({data}, config.secret, { expiresIn: '1h' });
          res.cookie('jwt', token);
          console.log('token: ', token);
          res.redirect('/authenticate/dashboard');
        } else {
          res.send('authentication failed')
        }

      })
      .catch(err => {
        res.send('authentication failed');
      });
    })
    .catch(err => {
      res.send('authentication failed. check username or password.');
    })

});

// protect the dashboard with jwt token check
router.get('/dashboard', validateJwt({
    secret: config.secret,
    getToken: function fromCookie (req) {
      if (req.cookies.jwt) {
        jwt.verify(req.cookies.jwt, config.secret, function(err, decoded){
          if (err) throw err;
        })
        return req.cookies.jwt;
      }
      return null;
    }
  }), function(req, res){
  res.send('you are in!');
});

// logout route
router.post('/logout', function(req, res){
  if (req.cookies.jwt){
    res.clearCookie("jwt").send('successfully logged out');
  } res.redirect('/authenticate/login');
})



module.exports = router;
