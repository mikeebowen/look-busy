'use strict';

const express = require('express');;
const http = require('http');
const argv = require('yargs').argv;
const ProgressBar = require('progress');
const clc = require('cli-color');
const api = require('./randomApi');
let callFunc = true;


function logStuff() {
	let clArg = Object.keys(argv)[1];
	let progressTimer = Math.ceil((Math.random() * 150) + 50);
	// console.log(whatToOutput);
	let argColor;
	if (argv.color) {
		argColor = argv.color.toString();
	}
	else if (argv.c && !argv.olr) {
		argColor = argv.c.toString();
	}
	else {
		argColor = null;
	}

	function getRandomData() {
		let route = api();
		let routeOptions = {
		  host: route.host,
		  path: route.path
		};
		http.get(routeOptions, function(res) {
			let responseString;
			res.on('data', function(data) {
				responseString += data;
			});
			res.on('end', function() {
				let randomData = responseString.replace(/^\s+|\s+$|\s/g, '').replace('undefined', '');			
				let addColor;
				let output;
				if (argColor) {
					addColor = eval(`clc.${argColor}`);
					output = addColor(randomData)
				} else {
					output = randomData;
				}
				process.stdout.write(output);
				callFunc = true;
			})
		})
		.on('error', function(e) {
		  console.log('Got error: ' + e.message);
		});
	
	}
	
	function makeProgressBar() {
		callFunc = false;
		http.get({ host: 'itsthisforthat.com', path: '/api.php?json'}, function(res) {
			let completeOptions = ['=', '*', '#', 'X'];
			let progressTokens = [':current', ':total', ':elapsed', ':percent', ':eta'];
			let randomTokens = progressTokens[Math.floor(Math.random() * progressTokens.length)];
			let randomTotal = Math.ceil((Math.random() * 80) + 20);
			let randomWordsArr = [];
			let addColor;
			let randomWords;
			let progressBarStyle;

			res.on('data', function(data) {
				randomWords = data.toString();
			})
			res.on('end', function() {
				randomWords = JSON.parse(randomWords.toString());
				randomWordsArr.push(randomWords);
				
				if (argColor) {
				let addColor = eval(`clc.${argColor}`);
					progressBarStyle = addColor(`  ${randomWordsArr[0].this} [:bar] ${randomTokens}`);
				} else {
					progressBarStyle = `  ${randomWordsArr[0].this} [:bar] ${randomTokens}`;
				}
				let bar = new ProgressBar(progressBarStyle, {
			    complete: completeOptions[Math.floor(Math.random() * completeOptions.length)],
			    incomplete: ' ',
			    width: process.stdout.columns,
			    total: randomTotal
			  });
				let timer = setInterval(function () {
			  bar.tick();
			
			  if (bar.complete) {
			    clearInterval(timer);
			  	callFunc = true;
			  }
				}, progressTimer);

			});
		});
		
	}

	setInterval(function() {
		let outputOptions = ['api', 'progressBar'];
		let choiceIndex = Math.ceil(Math.random() * 100) > 90 ? 1 : 0;
		let whatToOutput = outputOptions[choiceIndex];
		// console.log(whatToOutput);
		if (whatToOutput === 'api' && callFunc) {
			getRandomData();
		}
		if (whatToOutput === 'progressBar' && callFunc) {
			makeProgressBar();
		}
	
	}, 500);
}

module.exports.logStuff = logStuff;