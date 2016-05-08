'use strict';

module.exports = function() {
	let output;
	let apis = [
		{
			host: 'taco-randomizer.herokuapp.com',
			path: '/random/'
		},
		{
			host: 'astrocast.herokuapp.com',
			path: '/bites'
		}
	];

	output = apis[Math.floor(Math.random() * apis.length)];
	return output;
}