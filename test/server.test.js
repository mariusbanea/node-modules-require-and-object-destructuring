/* global describe, it, before, after, beforeEach, afterEach */

const app = require('../calculator');
const chai = require('chai');

const should = chai.should();

describe('Todo API:', function () {

  before(function () {  
  });
  
  beforeEach(function () {
  });

  afterEach(function () {
  }); 

  after(function () {
  }); 

  describe('GET /v1/todos', function () {

    it('should respond to GET `/v1/todos` with an array of todos and status 200', function () {
      return chai.request(app)
        .get('/v1/todos')
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length(5);
          res.body.forEach((item) => {
            item.should.be.a('object');
            item.should.include.keys('id', 'title', 'completed');
          });
        });
    });

  });


});
