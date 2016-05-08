'use strict';

let express = require('express');;
let http = require('http');
let colors = require('colors');


let getRandomData = function() {
	console.log('hola mundo');
	let options = {
	  // host: 'taco-randomizer.herokuapp.com',
	  host: 'astrocast.herokuapp.com/bites',
	  // port: 80,
	  path: '/random/'
	};
	http.get(options, function(res) {
		res.on('data', function(data) {
			let output = JSON.parse(data);
			let randomData = output.toString();
			console.log(randomData);
			// res.json(randomData);
			
		})
	})
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	
}


// setInterval(getRandomData, 250);
exports.getRandomData = getRandomData;