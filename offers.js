#!/usr/bin/env node

const hasFlag = require('has-flag');
var index = require('./index.js');

if(hasFlag('nf')){
  index.printOffers();
}
else{
  index.printOffersFiltered();
}
