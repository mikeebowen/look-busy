'use strict';

let express = require('express');;
let http = require('http');
let colors = require('colors');


let getRandomData = function() {
	console.log('hola mundo');
	let options = {
	  // host: 'taco-randomizer.herokuapp.com',
	  host: 'astrocast.herokuapp.com',
	  path: '/bites'
	};
	http.get(options, function(res) {
		let responseString;
		res.on('data', function(data) {
			responseString += data;
		})
		res.on('end', function() {
			let output = responseString.replace(/^\s+|\s+$|\s/g, '');;
			console.log(output);
		})
	})
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	
}


// setInterval(getRandomData, 250);
exports.getRandomData = getRandomData;