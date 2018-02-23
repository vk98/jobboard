var request = require('request');
var filter = require('./filter.js');
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
exports.getOffers = function re(issue =''){
  return getAllOffers(issue);
}
// var Table = require('cli-table');
// // instantiate
// var table = new Table({
//     head: ['TH 1 label', 'TH 2 label']
//   , colWidths: [20, 40]
// });
// var data = getAllOffers().then((data)=>{
//   data = filter.run(data);
//   // console.log("data:"+data);
//   for(var issue of data){
//     // console.log(da.number)
//     // console.log(da.title)
//     table.push(
//       [issue.number, issue.title]
//   );
//   }
//   console.log(table.toString());
// });
// table is an Array, so you can `push`, `unshift`, `splice` and friends
