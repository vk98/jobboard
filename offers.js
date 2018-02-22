var request = require('request');

var url = 'https://api.github.com/repos/f2etw/jobs/issues';
function getAllOffers() {
  return new Promise(function(resolve, reject) {
    request.get({
        url: url,
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

// var Table = require('cli-table');
// // instantiate
// var table = new Table({
//     head: ['TH 1 label', 'TH 2 label']
//   , colWidths: [20, 40]
// });
// var data = getAllOffers().then((data)=>{
//   for(let da of data){
//     console.log(da.number)
//     console.log(da.title)
//     table.push(
//       [da.number, da.title]
//   );
//   }
// });
// // table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['First value', 'Second value']
//   , ['First value', 'Second value']
// );

// console.log(table.toString());