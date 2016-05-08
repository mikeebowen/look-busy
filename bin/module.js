#!/usr/bin/env node
'use strict';

let lib = require('../lib/index.js');

let randomData = lib.getRandomData();

// setInterval(randomData, 500);
randomData();
