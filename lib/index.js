'use strict';

let express = require('express');;
let http = require('http');
let colors = require('colors');
let api = require('./randomApi');


let getRandomData = function() {
	let route = api();
	let options = {
	  host: route.host,
	  path: route.path
	};
	http.get(options, function(res) {
		let responseString;
		res.on('data', function(data) {
			responseString += data;
		})
		res.on('end', function() {
			let output = responseString.replace(/^\s+|\s+$|\s/g, '').replace('undefined', '');
			console.log(output);
		})
	})
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	
}


// setInterval(getRandomData, 250);
module.exports.getRandomData = getRandomData;