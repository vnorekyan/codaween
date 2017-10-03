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
      'groupName': 'NAME',
      'groupDescription': 'DESCRIPTION',
      'groupPicture': 'PICTURE'
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
      assert.property(response.body, 'groupName');
      assert.property(response.body, 'groupDescription');
      assert.property(response.body, 'groupPicture');
      assert.typeOf(response.body.groupName, 'string');
      assert.typeOf(response.body.groupDescription, 'string');
      assert.typeOf(response.body.groupPicture, 'string');
      assert.equal(response.body.groupName, 'NAME');
      assert.equal(response.body.groupDescription, 'DESCRIPTION');
      assert.equal(response.body.groupPicture, 'PICTURE');
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
      console.log('GET groups response: ', response.body);
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
      assert.property(response.body, 'groupName');
      assert.property(response.body, 'groupDescription');
      assert.property(response.body, 'groupPicture');
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
      oldName = response.body.groupName;
      oldPicture = response.body.groupPicture;
      oldDescription = response.body.groupDescription;
      done();
    });
  });

  it('should update a groups name, description, and picture', function(done) {
    api.put('/groups/' + toUpdate)
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'groupName': 'NEW NAME',
      'groupPicture': 'NEW PICTURE',
      'groupDescription': 'NEW DESCRIPTION'
    })
    .end(function(error, response) {
      //properties are updated
      expect(response.body.groupName).to.not.equal(oldName);
      expect(response.body.groupPicture).to.not.equal(oldPicture);
      expect(response.body.groupDescription).to.not.equal(oldDescription);
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
      'groupName': 'DELETE ME',
      'groupPicture': 'DELETE ME',
      'groupDescription': 'DELETE ME'
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
