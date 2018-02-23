var offers = require('./offers.js');
var issue = offers.getOffers('/'+process.argv[2])
issue.then((data) => {
    var Table = require('cli-table');
// instantiate
    var labels = '';
    for(let item of data['labels']){
        labels = labels + ' ' + item.name;
    }
    var table = new Table({
        rowHeights:[2],
        colWidths: [15, 70]
    });
    table.push(
        { 'number': data['number']},
        { 'user': data['user']['login']},
        { 'url': data['url'] },
        { 'repository_url': data['repository_url'] },
        { 'state': data['state']},
        { 'labels': labels},
        // { 'body': data['body']},
        // { '': data['']},
      
    );
    console.log(table.toString());
})