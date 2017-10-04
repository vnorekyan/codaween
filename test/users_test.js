var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

// POST /users
describe('POST /users', function() {
  var dataLength = 0;
  var posted;

  before(function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      dataLength = response.body.length;
      done();
    });
  });

  before(function(done) {
    api.post('/users')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'userFirstName': 'FIRST NAME',
      'userLastName': 'LAST NAME',
      'userPicture': 'PICTURE',
      'userEmail': 'EMAIL',
      'userVotes': 5
    })
    .end(function(error, response) {
      //creates new destination
      posted = response.body.id;
      userId = response.body.id;
      expect(response.body.length).to.not.equal(dataLength);
      done();
    });
  });

  it('should create a new user with an id, name, picture, email, and votes with values of "NAME", "PICTURE", and "EMAIL", and 5, respectively', function(done) {
    api.get('/users/' + posted)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'userFirstName');
      assert.property(response.body, 'userLastName');
      assert.property(response.body, 'userPicture');
      assert.property(response.body, 'userEmail');
      assert.property(response.body, 'userVotes');
      assert.equal(response.body.userFirstName, 'FIRST NAME');
      assert.equal(response.body.userLastName, 'LAST NAME');
      assert.equal(response.body.userPicture, 'PICTURE');
      assert.equal(response.body.userEmail, 'EMAIL');
      assert.equal(response.body.userVotes, 5);
      done();
    });
  });
});

// GET /users
describe('GET /users', function() {
  it('should return a 200 response', function(done) {
    api.get('/users')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should respond with an array of users', function(done){
    api.get('/users')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.be.an('array');
      done();
    });
  });
});

// GET /users/:id
describe('GET /users/:id', function() {
  it('should return a 200 response', function(done) {
    api.get('/users/1')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return a user with an id, name, picture, email, and votes', function(done) {
    api.get('/users/1')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'userFirstName');
      assert.property(response.body, 'userLastName');
      assert.property(response.body, 'userPicture');
      assert.property(response.body, 'userEmail');
      assert.property(response.body, 'userVotes');
      done();
    });
  });
});

// PUT /users/:id
describe('PUT /users/:id', function() {
  var toUpdate;
  var oldFirstName = '';
  var oldLastName = '';
  var oldPicture = '';
  var oldEmail = '';
  var oldVotes = 0;

  before(function(done) {
    api.post('/users')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'userFirstName': 'FIRST NAME',
      'userLastName': 'LAST NAME',
      'userPicture': 'PICTURE',
      'userEmail': 'EMAIL',
      'userVotes': 5
    })
    .end(function(error, response) {
      toUpdate = response.body.id;
      done();
    });
  });

  before(function(done) {
    api.get('/users/' + toUpdate)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      oldFirstName = response.body.userFirstName;
      oldLastName = response.body.userLastName;
      oldPicture = response.body.userPicture;
      oldEmail = response.body.userEmail;
      oldVotes = response.body.userVotes;
      done();
    });
  });

  it('should update a users name, picture, email, and votes', function(done) {
    api.put('/users/' + toUpdate)
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'userFirstName': 'NEW FIRST NAME',
      'userLastName': 'NEW LAST NAME',
      'userPicture': 'NEW PICTURE',
      'userEmail': 'NEW EMAIL',
      'userVotes': 4
    })
    .end(function(error, response) {
      //properties are updated
      expect(response.body.userFirstName).to.not.equal(oldFirstName);
      expect(response.body.userLastName).to.not.equal(oldLastName);
      expect(response.body.userPicture).to.not.equal(oldPicture);
      expect(response.body.userEmail).to.not.equal(oldEmail);
      expect(response.body.userVotes).to.not.equal(oldVotes);
      done();
    });
  });
});

// DELETE /users/:id
describe('DELETE /users/:id', function() {
  var toDelete;

  before(function(done) {
    api.post('/users')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'userFirstName': 'DELETE ME',
      'userLastName': 'DELETE ME',
      'userPicture': 'DELETE ME',
      'userEmail': 'DELETE ME',
      'userVotes': 0
    })
    .end(function(error, response) {
      toDelete = response.body.id;
      done();
    });
  });

  it('should delete a user', function(done) {
    api.delete('/users/' + toDelete)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.equal('');
      done();
    });
  });
});
