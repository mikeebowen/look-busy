'use strict';

let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let toType = require('to-type');
let apis = require('../lib/apis')();

chai.use(chaiHttp);

describe('APIs', function(done) {

	for(let i = 0, length1 = apis.length; i < length1; i++){
		it(`${apis[i].host + apis[i].path} should return data that can be printed to the console`, function(done) {
			chai.request(apis[i].host)
			.get(apis[i].path)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(toType(res.body)).not.to.eql(undefined);
				done();
			});
		});
	}
});