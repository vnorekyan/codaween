var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

// GET /costumes
describe('GET /costumes', function() {
  it('should return a 200 response', function(done) {
    api.get('/costumes')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should respond with an array of costumes', function(done){
    api.get('/costumes')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.be.an('array');
      done();
    });
  });
});

// POST /costumes
describe('POST /costumes', function() {

});

// GET /costumes/:id
describe('GET /costumes/:id', function() {

});

// PUT /costumes/:id
describe('PUT /costumes/:id', function() {

});

// DELETE /costumes/:id
describe('DELETE /costumes/:id', function() {

});
