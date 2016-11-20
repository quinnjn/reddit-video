const express = require('express')
const snoowrap = require('snoowrap');
const app = express();
const reddit = new snoowrap({
  userAgent: 'redditube',
  clientId: 'BVV8OtICbWutJA',
  clientSecret: 'EwvIbK9IVj6gBOEBR5-zhyfYw1w',
  refreshToken: '7361396-VewgqQ_T7YoBNO5mXkeRhgrc5XU'
});


app.get('/r/:subreddit', function (req, res) {

  reddit.getSubreddit(req.params.subreddit)
    .getHot()
    .filter(function (submission) {
      return /youtube.com/.test(submission.url);
    })
    .map(post => post.url.split('v=')[1])
    .then(function (videos, reject) {
      res.render('index', {
        videos: videos
      }); 
    });
});

app.set('view engine', 'pug');
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
