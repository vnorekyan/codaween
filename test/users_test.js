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
  it('should create a new user with an id, name, picture, and email', function(done) {

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

  });
});

// PUT /users/:id
describe('PUT /users/:id', function() {
  it('should update a users name, picture, and email to "NEW NAME", "NEW PICTURE", and "NEW EMAIL", respectively', function(done) {

  });
});

// DELETE /users/:id
describe('DELETE /users/:id', function() {
  it('should delete a user', function(done) {

  });
});
