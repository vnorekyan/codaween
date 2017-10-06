var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var path = require('path');
var methodOverride = require('method-override');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
// validation shit
var jwt = require('jsonwebtoken');
var validateJwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var config = require('./config/main');
var methodOverride = require('method-override');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(ejsLayouts);

app.use(validateJwt({
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
  })
  .unless({path: ['/authenticate/login', '/authenticate/register']}
));




app.get('/', function(req, res) {
  res.render('index', {
    active: "home",
    page: req.url
  });
  // db.user.findAll()
  // .then(function(users) {
  //   res.status(200).json(users);
  // })
  // .catch(function(error) {
  //   res.json(error);
  // });
});

app.use('/users', require('./controllers/users'));
app.use('/groups', require('./controllers/groups'));
app.use('/costumes', require('./controllers/costumes'));
app.use('/authenticate', require('./controllers/authenticate'));


var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Server started on port 8080');
});

module.exports = server;
