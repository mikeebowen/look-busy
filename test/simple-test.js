'use strict';

let chai = require('chai');
let expect = chai.expect;

describe('Test that tests run', function (done) {
  it('should run a simple test', function (done) {
    expect(true).to.eql(true);
    done();
  });
});
