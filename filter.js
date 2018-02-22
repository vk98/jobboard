var yaml = require('js-yaml');
var fs = require('fs');


function find(string,issue){
    if (issue.toLowerCase().indexOf("string") != -1) return true;
    else return false; 
}
function match(issue){
    var doc = yaml.safeLoad(fs.readFileSync('criteria.yaml', 'utf8'));
    var is_matching=true;
    doc.filter.forEach(function(name){
        if(!find(name,issue))is_matching=false;
    });

    console.log(doc);
    return is_matching;
}
function filter(offers){
    offers.forEach(function(issue,index, object){
        if(!match(issue))object.splice(index,1);        
    });
    return offers;
}
