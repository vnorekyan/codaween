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
  it('should create a new costume associated with a user with an id, name, description, picture, and amazon link', function(done) {

  });
});

// GET /costumes/:id
describe('GET /costumes/:id', function() {
  it('should return a 200 response', function(done) {
    api.get('/costumes/1')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return a costume associated with a user with an id, name, description, picture, and amazon link', function(done) {
    api.get('/costumes/1')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'name');
      assert.property(response.body, 'description');
      assert.property(response.body, 'picture');
      assert.property(response.body, 'link');
      done();
    });
  });
});

// PUT /costumes/:id
describe('PUT /costumes/:id', function() {
  it('should update a costumes name, description, picture, and link to "NEW NAME", "NEW DESCRIPTION", "NEW PICTURE", and "NEW LINK", respectively', function(done) {

  });
});

// DELETE /costumes/:id
describe('DELETE /costumes/:id', function() {
  it('should delete a costume', function(done) {

  });
});
