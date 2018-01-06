/* global describe, it, beforeEach, afterEach */

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiSpies = require('chai-spies');

const expect = chai.expect; 
const assert = require('chai').assert;

chai.use(chaiHttp);
chai.use(chaiSpies);

describe('Basic Logging Middleware', function(){
  let hook;
  
  beforeEach(function(){
    hook = captureStream(process.stdout);
  });
  afterEach(function(){
    hook.unhook(); 
  });
  
  it('should log request to `/accounts` to the console', function(){
    return chai.request(app).get('/accounts')
      .then(function (res) {
        assert.equal(hook.captured(),'GET /accounts');
        
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });
  
  it('should log request to `/accounts/42` to the console', function(){
    return chai.request(app).get('/accounts/42')
      .then(function (res) {
        assert.equal(hook.captured(),'GET /accounts/42');
        
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });  
  
  it('should NOT log requests to routes that are not /accounts', function () {
    return chai.request(app).get('/products')
      .then(function(res) {
        assert.equal(hook.captured(),'');
        
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');

      });
  });
});


function captureStream(stream){
  var oldWrite = stream.write;
  var buf = '';
  stream.write = function(chunk, encoding, callback){
    buf += chunk.toString().replace('\n', ''); // chunk is a String or Buffer
    oldWrite.apply(stream, arguments);
  }
 
  return {
    unhook: function unhook(){
     stream.write = oldWrite;  
    },
    captured: function(){
      return buf;
    }
  };
}