var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var supertest = require('supertest');
var api = supertest('http://localhost:8080');

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
      'costumeName': 'NAME',
      'costumeDescription': 'DESCRIPTION',
      'costumePicture': 'PICTURE',
      'costumeLink': 'AMAZON LINK'
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
      assert.property(response.body, 'costumeName');
      assert.property(response.body, 'costumeDescription');
      assert.property(response.body, 'costumePicture');
      assert.property(response.body, 'costumeLink');
      assert.typeOf(response.body.costumeName, 'string');
      assert.typeOf(response.body.costumeDescription, 'string');
      assert.typeOf(response.body.costumePicture, 'string');
      assert.equal(response.body.costumeName, 'NAME');
      assert.equal(response.body.costumeDescription, 'DESCRIPTION');
      assert.equal(response.body.costumePicture, 'PICTURE');
      assert.equal(response.body.costumeLink, 'AMAZON LINK');
      done();
    });
  });
});


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
      assert.property(response.body, 'costumeName');
      assert.property(response.body, 'costumeDescription');
      assert.property(response.body, 'costumePicture');
      assert.property(response.body, 'costumeLink');
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
      oldName = response.body.costumeName;
      oldPicture = response.body.costumePicture;
      oldDescription = response.body.costumeDescription;
      oldLink = response.body.costumeLink;
      done();
    });
  });

  it('should update a costumes name, description, picture, and link', function(done) {
    api.put('/costumes/' + toUpdate)
    .set('Accept', 'application/json')
    .type('form')
    .send({
      'costumeName': 'NEW NAME',
      'costumePicture': 'NEW PICTURE',
      'costumeDescription': 'NEW DESCRIPTION',
      'costumeLink': 'NEW LINK'
    })
    .end(function(error, response) {
      //properties are updated
      expect(response.body.costumeName).to.not.equal(oldName);
      expect(response.body.costumePicture).to.not.equal(oldPicture);
      expect(response.body.costumeDescription).to.not.equal(oldDescription);
      expect(response.body.costumeLink).to.not.equal(oldLink);
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
      'costumeName': 'DELETE ME',
      'costumePicture': 'DELETE ME',
      'costumeDescription': 'DELETE ME',
      'costumeLink': 'DELETE ME'
    })
    .end(function(error, response) {
      toDelete = response.body.id;
      done();
    });
  });

  it('should delete a costume', function(done) {
    api.delete('/costumes/' + toDelete)
    .set('Accept', 'application/json')
    .end(function(error, response) {
      expect(response.body).to.equal('');
      done();
    });
  });
});
