'use strict';

let apis = require('./apis')();

module.exports = function() {
	let output;
	output = apis[Math.floor(Math.random() * apis.length)];
	return output;
}