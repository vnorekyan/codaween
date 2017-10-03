var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

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
      'name': 'NAME',
      'picture': 'PICTURE',
      'email': 'EMAIL'
    })
    .end(function(error, response) {
      //creates new destination
      posted = response.body.id;
      expect(response.body.length).to.not.equal(dataLength);
      done();
    });
  });

  it('should create a new user with an id of type integer, name, picture, and email of type string and with values of "NAME", "PICTURE", and "EMAIL", respectively', function(done) {
    api.get('/users/' + posted)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'name');
      assert.property(response.body, 'picture');
      assert.property(response.body, 'email');
      assert.typeOf(response.body.id, 'integer');
      assert.typeOf(response.body.name, 'string');
      assert.typeOf(response.body.picture, 'string');
      assert.typeOf(response.body.email, 'string');
      assert.equal(response.body.name, 'NAME');
      assert.equal(response.body.picture, 'PICTURE');
      assert.equal(response.body.email, 'EMAIL');
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
  it('should return a user with an id, name, picture, and email', function(done) {
    api.get('/users/1')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'name');
      assert.property(response.body, 'picture');
      assert.property(response.body, 'email');
      done();
    });
  });
});

// PUT /users/:id
describe('PUT /users/:id', function() {
  var toUpdate;
  var oldName = '';
  var oldPicture = '';
  var oldEmail = '';

  before(function(done) {
    api.post('/users')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      toUpdate = response.body.id;
      done();
    });
  });

  before(function(done) {
    api.get('/users/' + toUpdate)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      oldName = response.body.name;
      oldPicture = response.body.picture;
      oldEmail = response.body.email;
      done();
    });
  });

  it('should update a users name, picture, and email to "NEW NAME", "NEW PICTURE", and "NEW EMAIL", respectively', function(done) {
    api.put('/users/' + toUpdate)
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'NEW NAME',
      'picture': 'NEW PICTURE',
      'email': 'NEW EMAIL'
    })
    .end(function(error, response) {
      //properties are updated
      expect(response.body.name).to.not.equal(oldName);
      expect(response.body.picture).to.not.equal(oldPicture);
      expect(response.body.email).to.not.equal(oldEmail);
      //to the correct values
      assert.equal(response.body.name, 'NEW NAME');
      assert.equal(response.body.picture, 'NEW PICTURE');
      assert.equal(response.body.email, 'NEW EMAIL');
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
      'name': 'DELETE ME',
      'picture': 'DELETE ME',
      'email': 'DELETE ME'
    })
    .end(function(error, response) {
      toDelete = response.body.id;
      done();
    });
  });
  
  it('should delete a user', function(done) {
    api.get('/users/' + toDelete)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.equal(null);
      done();
    });
  });
});
