var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var path = require('path');
var methodOverride = require('method-override');
var app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  db.user.findAll()
  .then(function(users) {
    res.status(200).json(users);
  })
  .catch(function(error) {
    res.json(error);
  });
});

app.use('/users', require('./controllers/users'));
app.use('/groups', require('./controllers/groups'));
app.use('/costumes', require('./controllers/costumes'));

var server = app.listen(process.env.PORT || 8080, function() {
  console.log('Server started on port 8080');
});

module.exports = server;
