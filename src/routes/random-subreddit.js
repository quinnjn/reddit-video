const request = require('request');

module.exports = function (req, res) {
  var options = {
    method: 'HEAD',
    uri: 'https://www.reddit.com/random.json'
  };
  request(options, function (err, response, body) {
    var subreddit = 'videos';
    var location = response.headers['location']

    if (location) {
      subreddit = location.match(/\/r\/(w+)/);     
    }

    res.location('/r/' + subreddit);
  });
};
