var player;
var titleHtml = document.getElementById('title');
var videos = new Videos(videoData);
 
function createYoutubeIframe() {
  var tag = document.createElement('script');
  var firstScriptTag = document.getElementsByTagName('script')[0];

  tag.src = "https://www.youtube.com/iframe_api";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
   
function createYoutubePlayer(options) {
  var player = new YT.Player('player', {
    height: '800',
    width: '1080',
    videoId: options.videoId,
    events: {
      'onReady': options.onReady,
      'onStateChange': options.onStateChange
    }
  });

  return player;
}

function load(video) {
  if (video) {
    decorateTitle(video);
    player.loadVideoById(video); 
  }
}

function loadNext() {
  load(videos.next());
}

function loadPrev() {
  load(videos.prev());
}

function loadVideo(videoId) {
  var video = videos.find(videoId);

  load(video);
  videos.setPointerToVideo(video);
}

function onYouTubeIframeAPIReady() {
  decorateTitle(videos.get());
  player = createYoutubePlayer({
    videoId: videos.get().videoId,
    onReady: function (event) {
      event.target.playVideo();
    },
    onStateChange: function (event) {
      if ([0].includes(event.data)) { 
        loadNext();
      }
    }
  });
} 

function decorateTitle(video) {
 var path = window.location.pathname;
 var a = document.getElementById('reddit-title');
 var pathname = window.location.pathname.split('/');

 a.href = video.redditUrl;
 a.innerText = video.title;

 if (pathname.length <= 3) {
   pathname.push('');
 }

 pathname[3] = video.videoId;
 window.history.pushState('', '', pathname.join('/'));
}

function start() {
  createYoutubeIframe();
}

document.getElementById('next').addEventListener('click', loadNext);
document.getElementById('prev').addEventListener('click', loadPrev);
document.onkeydown = function (e) {
  e = e || window.event;
  switch(e.keyCode) {
    case '37': // Left Arrow
      loadPrev();
      break;
    case '39': // Right Arrow
      loadNext();
      break;
  }
};

start();
