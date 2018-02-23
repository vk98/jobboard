var offers = require('./offers.js');
var issue = '';
if(process.argv[2] !== undefined){
    issue = '/'+process.argv[2];
}
var issue = offers.getOffers(issue);
issue.then((data) => {
    var Table = require('cli-table');
// instantiate
    var labels = '';
    for(let item of data['labels']){
        labels = labels + ' ' + item.name;
    }
    var table = new Table();
    table.push(
        { 'number': data['number']},
        { 'user': data['user']['login']},
        { 'url': data['url'] },
        { 'repository_url': data['repository_url'] },
        { 'state': data['state']},
        { 'labels': labels}
    );
    console.log(table.toString());
})