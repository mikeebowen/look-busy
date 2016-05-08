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
		},
		{
			host: 'swapi.co',
			path: '/api/?format=json'
		},
		{
	  	host: 'randomname.de',
	  	path: '/?format=json'
		},
		{
		  host: 'qrng.anu.edu.au',
		  path: '/API/jsonI.php?length=10&type=hex16&size=2'
		},
		{
		  host: 'itsthisforthat.com',
		  path: '/api.php?json'
		}
	];

	output = apis[Math.floor(Math.random() * apis.length)];
	return output;
}