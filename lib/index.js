'use strict';

let express = require('express');;
let http = require('http');
let colors = require('colors');
let argv = require('yargs').argv;
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
			let color = Object.keys(argv)[1];
			let randomDataArr;
			
			switch (color) {
				case 'r':
					randomData = output.rainbow;
					break;
				case 't': 
					randomData = output.trap;
					break;
				case 'x': 
					randomData = output.trap.rainbow;
					break;
				case 'i':
					randomData = output.inverse;
					break;
				case 'g':
					randomData = output.green;
					break;
				default:
					randomData = output;
					break;
			}

			randomDataArr = randomData.match(/.{1,3500}/g);

			for(var i = 0, length1 = randomDataArr.length; i < length1; i++){
				
				console.log(randomDataArr[i]);
			}
		})
	})
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	
}

module.exports.getRandomData = getRandomData;