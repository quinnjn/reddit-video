function parseVideoIdFromUrl(url) {
  return url.split('v=')[1]
    .split('&')[0]
    .split('?')[0];
}

module.exports = function (post) {
  var videoId = parseVideoIdFromUrl(post.url);

  return {
    title: '[' + post.subreddit.display_name + '] ' + post.title,
    redditUrl: 'http://reddit.com' + post.permalink,
    videoId: videoId,
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/default.jpg'.replace('VIDEO_ID', videoId)
  }
};
