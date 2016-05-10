#!/usr/bin/env node
'use strict';

let lib = require('../lib/index.js');

let getRandomData = lib.getRandomData;

setInterval(lib.getRandomData, 500);
