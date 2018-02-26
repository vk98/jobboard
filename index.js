var yaml = require('js-yaml');
var fs = require('fs');

function findInLabels(labels,string){
    for(label of labels){
        if(label.name.toLowerCase().indexOf(string.toLowerCase()) != -1)return true;
    }
    return false;
}
function find(string,issue){
    if (issue.title.toLowerCase().indexOf(string.toLowerCase()) != -1 
    || findInLabels(issue.labels, string)) 
    return true; 
    
    else return false; 
}
function matchAll(issue){
    var doc = yaml.safeLoad(fs.readFileSync('criteria.yaml', 'utf8'));
    var is_matching=true;
    for(var criteria of doc.allOfThis){
        if(!find(criteria,issue))is_matching=false;
    }
    return is_matching;
}
function matchAny(issue){
    var doc = yaml.safeLoad(fs.readFileSync('criteria.yaml', 'utf8'));
    var is_matching=false;
    for(var criteria of doc.anyOfThis){
        if(find(criteria,issue))is_matching=true;
    }
    return is_matching;
}
function filter(offers){
    var filteredIssues=[];
    for(var issue of offers){
        if(matchAny(issue) || matchAll(issue)){       
            filteredIssues.push(issue);
        }
    }
    return filteredIssues;
}
var request = require('request');
var url = 'https://api.github.com/repos/f2etw/jobs/issues';
function getAllOffers(issue = '') {
  return new Promise(function(resolve, reject) {
    request.get({
        url: url+issue,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          // data is already parsed as JSON:
          //console.log(data);
          // for(let da of data){
          //   console.log(da.labels)
          // }
          resolve(data);
        }
    })
  });
}
function printOffersFiltered(){
  var Table = require('cli-table');
  // instantiate
  var table = new Table({
      head: ['Number', 'Title']
  });
  var data = getAllOffers().then((data)=>{
    data = filter(data);
    for(var issue of data){
      table.push(
        [issue.number, issue.title]
    );
    }
    console.log(table.toString());
  });
}
function printOffers(){
  var Table = require('cli-table');
  // instantiate
  var table = new Table({
      head: ['Number', 'Title']
  });
  var data = getAllOffers().then((data)=>{
    for(var issue of data){
      table.push(
        [issue.number, issue.title]
    );
    }
    console.log(table.toString());
  });
}
function printOfferSelected(){
  var issue = '';
  if(process.argv[2] !== undefined){
      issue = '/'+process.argv[2];
  }
  var issue = getAllOffers(issue);
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
  });
}
exports.getOffers =  getAllOffers;
exports.printOffers =  printOffers;
exports.printOffersFiltered = printOffersFiltered;
exports.printOfferSelected = printOfferSelected;
