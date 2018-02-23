const program = require('commander');

var offers = require('./offers.js');

program
  .version('1.0.0')
  .description('Remotegigs job board');

program
  .command('getOffers')
  .alias('get')
  .description('Showing all active job offers from the job board.')
  .action(function(){
    offers.run();
  });

  program
  .command('getOffersFiltered')
  .alias('getFiltered')
  .description('Showing all active job offers with applied filter from the criteria.yaml from the job board.')
  .action(function(){
    offers.runWithFilter();
  });

program.parse(process.argv);