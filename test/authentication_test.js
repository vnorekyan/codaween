var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

// POST /login
describe('GET /costumes', function() {
  it('should return a 200 response for a valid login', function(done) {
    api.post('/authenticate/login')
    .type('form')
    .send({
      userEmail: "capitalone",
      userPassword: "dev"
    })
    .expect(200, done);
  });
  it('should return a 401 response for unauthorized GET', function(done) {
    api.get('/users')
    .expect(401, done);
  });
  it('should return a 401 response for unauthorized POST', function(done) {
    api.post('/costumes/create')
    .send({
      userEmail: "newuser",
      userPassword: "dev"
    })
    .expect(401, done);
  });
  it('should return a 401 response for unauthorized PUT', function(done) {
    api.put('/users/1/edit')
    .send({
      userFirstName: 'blahblahblah'
    })
    .expect(401, done);
  });
  it('should return a 401 response for unauthorized DELETE', function(done) {
    api.put('/users/1/')
    .send({
      userFirstName: 'blahblahblah'
    })
    .expect(401, done);
  });
});
