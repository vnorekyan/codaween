var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

// POST /groups
describe('POST /groups', function() {
  var dataLength = 0;
  var posted;

  before(function(done) {
    api.get('/groups')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      dataLength = response.body.length;
      done();
    });
  });

  before(function(done) {
    api.post('/groups')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'NAME',
      'description': 'DESCRIPTION',
      'picture': 'PICTURE'
    })
    .end(function(error, response) {
      //creates new destination
      groupId = response.body.id;
      posted = response.body.id;
      done();
    });
  });

  it('should create a new group associated with multiple users with an id, name, description, and picture', function(done) {
    api.get('/groups/' + posted)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'name');
      assert.property(response.body, 'description');
      assert.property(response.body, 'picture');
      assert.typeOf(response.body.name, 'string');
      assert.typeOf(response.body.description, 'string');
      assert.typeOf(response.body.picture, 'string');
      assert.equal(response.body.name, 'NAME');
      assert.equal(response.body.description, 'DESCRIPTION');
      assert.equal(response.body.picture, 'PICTURE');
      done();
    });
  });
});

// GET /groups
describe('GET /groups', function() {
  it('should return a 200 response', function(done) {
    api.get('/groups')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should respond with an array of groups', function(done){
    api.get('/groups')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.be.an('array');
      done();
    });
  });
});

// GET /groups/:id
describe('GET /groups/:id', function() {
  it('should return a 200 response', function(done) {
    api.get('/groups/1')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return a group associated with multiple users with an id, name, description, and picture', function(done) {
    api.get('/groups/1')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'name');
      assert.property(response.body, 'description');
      assert.property(response.body, 'picture');
      done();
    });
  });
});

// PUT /groups/:id
describe('PUT /groups/:id', function() {
  var toUpdate;
  var oldName = '';
  var oldPicture = '';
  var oldDescription = '';

  before(function(done) {
    api.post('/groups')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      toUpdate = response.body.id;
      done();
    });
  });

  before(function(done) {
    api.get('/groups/' + toUpdate)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      oldName = response.body.name;
      oldPicture = response.body.picture;
      oldDescription = response.body.description;
      done();
    });
  });

  it('should update a groups name, description, and picture', function(done) {
    api.put('/groups/' + toUpdate)
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'NEW NAME',
      'picture': 'NEW PICTURE',
      'description': 'NEW DESCRIPTION'
    })
    .end(function(error, response) {
      //properties are updated
      expect(response.body.name).to.not.equal(oldName);
      expect(response.body.picture).to.not.equal(oldPicture);
      expect(response.body.description).to.not.equal(oldDescription);
      done();
    });
  });
});

// DELETE /groups/:id
describe('DELETE /groups/:id', function() {
  var toDelete;

  before(function(done) {
    api.post('/groups')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'DELETE ME',
      'picture': 'DELETE ME',
      'description': 'DELETE ME'
    })
    .end(function(error, response) {
      toDelete = response.body.id;
      done();
    });
  });

  it('should delete a group', function(done) {
    api.delete('/groups/' + toDelete)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.equal('');
      done();
    });
  });
});
