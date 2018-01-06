/* global describe, it, before, after, beforeEach, afterEach */

const chai = require('chai');

const should = chai.should();

describe('Calculator Module', function () {

  it('should export an object with 4 methods', function () {
    const calculator = require('../modules/calculator')
    calculator.should.be.an('object');
    calculator.should.have.all.keys('add', 'subtract', 'multiply', 'divide');
  });

});


describe('App parent file', function () {

  it('should require module and destructure the properties', function () {
    const calculator = require('../app')
    calculator.should.be.an('object');
    calculator.should.have.all.keys('add', 'subtract', 'multiply', 'divide');
  });

});
