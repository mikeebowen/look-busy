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
		  host: 'http://webknox.com:8080',
		  path: '/jokes/random?maxLength=100&apiKey=begdcidchebpdxwnbgtalpbcgnxxjye'
		},
		{
		  host: 'itsthisforthat.com',
		  path: '/api.php?json'
		}
	];

	return apis;

}