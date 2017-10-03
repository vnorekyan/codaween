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
  var dataLength = 0;
  var posted;

  before(function(done) {
    api.get('/costumes')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      dataLength = response.body.length;
      done();
    });
  });

  before(function(done) {
    api.post('/costumes')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'NAME',
      'description': 'DESCRIPTION',
      'picture': 'PICTURE',
      'link': 'AMAZON LINK'
    })
    .end(function(error, response) {
      //creates new destination
      posted = response.body.id;
      expect(response.body.length).to.not.equal(dataLength);
      done();
    });
  });

  it('should create a new costume associated with a user with an id, name, description, picture, and amazon link', function(done) {
    api.get('/costumes/' + posted)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      assert.property(response.body, 'id');
      assert.property(response.body, 'name');
      assert.property(response.body, 'description');
      assert.property(response.body, 'picture');
      assert.property(response.body, 'link');
      assert.typeOf(response.body.id, 'integer');
      assert.typeOf(response.body.name, 'string');
      assert.typeOf(response.body.description, 'string');
      assert.typeOf(response.body.picture, 'string');
      assert.equal(response.body.name, 'NAME');
      assert.equal(response.body.description, 'DESCRIPTION');
      assert.equal(response.body.picture, 'PICTURE');
      assert.equal(response.body.link, 'AMAZON LINK');
      done();
    });
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
  var toUpdate;
  var oldName = '';
  var oldPicture = '';
  var oldDescription = '';
  var oldLink = '';

  before(function(done) {
    api.post('/costumes')
    .set('Accept', 'application/json')
    .end(function(error, response) {
      toUpdate = response.body.id;
      done();
    });
  });

  before(function(done) {
    api.get('/costumes/' + toUpdate)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      oldName = response.body.name;
      oldPicture = response.body.picture;
      oldDescription = response.body.description;
      oldLink = response.body.link;
      done();
    });
  });

  it('should update a costumes name, description, picture, and link to "NEW NAME", "NEW DESCRIPTION", "NEW PICTURE", and "NEW LINK", respectively', function(done) {
    api.put('/costumes/' + toUpdate)
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'NEW NAME',
      'picture': 'NEW PICTURE',
      'description': 'NEW DESCRIPTION',
      'link': 'NEW LINK'
    })
    .end(function(error, response) {
      //properties are updated
      expect(response.body.name).to.not.equal(oldName);
      expect(response.body.picture).to.not.equal(oldPicture);
      expect(response.body.description).to.not.equal(oldDescription);
      expect(response.body.link).to.not.equal(oldLink);
      //to the correct values
      assert.equal(response.body.name, 'NEW NAME');
      assert.equal(response.body.picture, 'NEW PICTURE');
      assert.equal(response.body.description, 'NEW DESCRIPTION');
      assert.equal(response.body.link, 'NEW LINK');
      done();
    });
  });
});

// DELETE /costumes/:id
describe('DELETE /costumes/:id', function() {
  var toDelete;

  before(function(done) {
    api.post('/costumes')
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'name': 'DELETE ME',
      'picture': 'DELETE ME',
      'description': 'DELETE ME',
      'link': 'DELETE ME'
    })
    .end(function(error, response) {
      toDelete = response.body.id;
      done();
    });
  });

  it('should delete a costume', function(done) {
    api.get('/costumes/' + toDelete)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.equal(null);
      done();
    });
  });
});
