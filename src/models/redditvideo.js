function parseVideoIdFromUrl(url) {
  return url.split('v=')[1]
    .split('&')[0]
    .split('?')[0];
}


module.exports = function (post) {
  var videoId = parseVideoIdFromUrl(post.url);

  return {
    title: post.title,
    redditUrl: 'http://reddit.com' + post.permalink,
    videoId: videoId
  }
};
