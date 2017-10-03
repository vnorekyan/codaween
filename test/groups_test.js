var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

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

// POST /groups
describe('POST /groups', function() {
  it('should create a new group associated with multiple users with an id, name, description, and picture', function(done) {

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
  it('should update a groups name, description, and picture to "NEW NAME", "NEW DESCRIPTION", and "NEW PICTURE", respectively', function(done) {

  });
});

// DELETE /groups/:id
describe('DELETE /groups/:id', function() {
  it('should delete a group', function(done) {

  });
});
