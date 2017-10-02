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

});

// GET /users/:id
describe('GET /users/:id', function() {

});

// PUT /users/:id
describe('PUT /users/:id', function() {

});

// DELETE /users/:id
describe('DELETE /users/:id', function() {

});
