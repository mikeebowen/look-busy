#!/usr/bin/env node
'use strict';

let lib = require('../lib/index.js');

let randomData = lib.getRandomData();

console.log(randomData);