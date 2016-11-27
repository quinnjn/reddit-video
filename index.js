const express = require('express');
const morgan = require('morgan');
const snoowrap = require('snoowrap');
const url = require('url');
const app = express();
const reddit = new snoowrap({
  userAgent: 'redditube',
  clientId: 'BVV8OtICbWutJA',
  clientSecret: 'EwvIbK9IVj6gBOEBR5-zhyfYw1w',
  refreshToken: '7361396-VewgqQ_T7YoBNO5mXkeRhgrc5XU'
});


app.use(morgan('combined'));
app.get('/r/:subreddit/:videoId*?', function (req, res) {
  var subreddit = req.params.subreddit
  var videoId = req.params.videoId || '';
  reddit.getSubreddit(subreddit)
    .getHot()
    .filter(function (submission) {
      return /youtube.com/.test(submission.url) && /v=/.test(submission.url);
    })
    .map(function (post) {
      console.log(post.url);
      var videoId = post.url.split('v=')[1]
        .split('&')[0]
        .split('?')[0];
      return {
       title: post.title,
       redditUrl: 'http://reddit.com' + post.permalink,
       videoId: videoId
      };
    })
    .then(function (videos, reject) {
      console.log(videos);
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
      console.log({
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
app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
})
