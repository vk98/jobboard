var yaml = require('js-yaml');
var fs = require('fs');

function findInLabels(labels,string){
    for(label of labels){
        if(label.name.toLowerCase().indexOf(string.toLowerCase()) != -1)return true;
    }
    return false;
}
function find(string,issue){
    console.log('here3 '+string.toLowerCase());
    console.log(issue.title.toLowerCase());
    if (issue.title.toLowerCase().indexOf(string.toLowerCase()) != -1 || findInLabels(issue.labels, string)) 
    return true; 
    
    else return false; 
}
function match(issue){
    console.log('here2'+ issue);
    var doc = yaml.safeLoad(fs.readFileSync('criteria.yaml', 'utf8'));
    var is_matching=true;
    for(var criteria of doc.filter){
        console.log(criteria);
        if(!find(criteria,issue))is_matching=false;
    }

    console.log(doc);
    return is_matching;
}
exports.run = function filter(offers){
    var filteredIssues=[];
    for(var issue of offers){
        console.log(issue.title);
        if(match(issue)){
            console.log('match'+issue.title);// offers.splice(index,1);        
            filteredIssues.push(issue);
        }
    }
    console.log('all things here '+filteredIssues);
    return filteredIssues;
}

