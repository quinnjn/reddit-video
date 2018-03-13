var extractId = require('youtube-url').extractId;

module.exports = function (post) {
  var videoId = extractId(post.url);

  return {
    title: '[' + post.subreddit.display_name + '] ' + post.title,
    redditUrl: 'http://reddit.com' + post.permalink,
    videoId: videoId,
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/default.jpg'.replace('VIDEO_ID', videoId)
  }
};
