#!/usr/bin/env node

var flags = require('flags');
var index = require('./index.js');

flags.defineNumber('id');
flags.defineBoolean('nf').setDefault(true);
flags.parse(['--nf', '--id']);

if(flags.get('id')){
  
  index.printOfferSelected(flags.get('id'));
}
//else console.error("Offer number undefined");
  
else if(flags.get('nf')){
  console.log("ioko")
  index.printOffers();
}
else{
  index.printOffersFiltered();
}
