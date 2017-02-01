const express = require('express');
const morgan = require('morgan');
const snoowrap = require('snoowrap');
const redditVideo = require('./src/models/redditvideo');
const url = require('url');
const app = express();
const reddit = new snoowrap({
  userAgent: 'redditube',
  clientId: 'BVV8OtICbWutJA',
  clientSecret: 'EwvIbK9IVj6gBOEBR5-zhyfYw1w',
  refreshToken: '7361396-VewgqQ_T7YoBNO5mXkeRhgrc5XU'
});

function recordAnalytics(data) {
  console.log(data);
}


app.use(morgan('combined'));
app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});
app.get('/r/:subreddit/:videoId*?', function (req, res) {
  var subreddit = req.params.subreddit
  var videoId = req.params.videoId || '';
  reddit.getSubreddit(subreddit)
    .getHot()
    .filter(function (submission) {
      return /youtube.com/.test(submission.url) && /v=/.test(submission.url);
    })
    .map(redditVideo)
    .then(function (videos, reject) {
      var pointer = videos.findIndex(function (video) {
        return videoId === video.videoId;
      });

      if (pointer === -1) {
        pointer = 0;
      } 

      var videoData = {
        pointer: pointer,
        videos: videos
      };

      recordAnalytics({
        subreddit: subreddit,
        videoData: {
          pointer: videoData.pointer,
          length: videoData.videos.length
        },
        url: req.url
      });

      res.render('index', {
        videoData: videoData
      }); 
    });
});

app.set('view engine', 'pug');
app.use(express.static('./public'))
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
})
