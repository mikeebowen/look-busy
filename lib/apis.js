'use strict';

module.exports = function() {
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
		  host: 'api.randomuser.me',
		  path: '/'
		},
		{
		  host: 'itsthisforthat.com',
		  path: '/api.php?json'
		}
	];

	return apis;

}