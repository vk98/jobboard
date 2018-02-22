var request = require('request');

var url = 'https://api.github.com/repos/f2etw/jobs/issues';
function getAllOffers(){
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
        return data;
      }
  });
}