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

});

// GET /groups/:id
describe('GET /groups/:id', function() {

});

// PUT /groups/:id
describe('PUT /groups/:id', function() {

});

// DELETE /groups/:id
describe('DELETE /groups/:id', function() {

});
