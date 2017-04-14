function Videos(data) {
  this.pointer = data.pointer;
  this.videos = data.videos;
}
Videos.prototype.get = function () { 
  return this.videos[this.pointer]; 
}
Videos.prototype.find = function (id) {
  return this.videos.filter(function (video) {
    return video.videoId === id;
  })[0]; 
}
Videos.prototype.next = function () { 
  this.pointer++;
  return this.get(); 
}
Videos.prototype.prev = function () { 
  this.pointer--;
  return this.get(); 
}
Videos.prototype.setPointerToVideo = function (needle) {
  var index = this.videos.findIndex(function (haystack) {
    return haystack.videoId == needle.videoId;
  }); 

  this.pointer = index;
}

var player;
var titleHtml = document.getElementById('title');
var videos = new Videos(videoData);
 
function createYoutubeIframe() {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
   
function createYoutubePlayer(options) {
  var player = new YT.Player('player', {
    height: '800',
    width: '1080',
    videoId: options.videoId,
    events: {
      'onReady': function (event) {
        options.onReady(player, event);
      },
      'onStateChange': function (event) {
        options.onStateChange(player, event);
      }
    }
  });
  return player;
}

function load(player, video) {
  if (video) {
    decorateTitle(video);
    player.loadVideoById(video); 
  } else {
    console.log('done');
  }
}

function loadNext(player) {
  load(player, videos.next());
}

function loadPrev(player) {
  load(player, videos.prev());
}

function loadVideo(videoId) {
  var video = videos.find(videoId);
  load(player, video);
  videos.setPointerToVideo(video);
}

createYoutubeIframe();
function onYouTubeIframeAPIReady() {
  console.log('ready');
  decorateTitle(videos.get());
  player = createYoutubePlayer({
    videoId: videos.get().videoId,
    onReady: function (player, event) {
      event.target.playVideo();
    },
    onStateChange: function (player, event) {
      console.log('event', event);
      if ([0].includes(event.data)) { 
        loadNext(player);
      }
    }
  });
} 

function decorateTitle(video) {
 var path = window.location.pathname;
 var a = document.getElementById('reddit-title');
 a.href = video.redditUrl;
 a.innerText = video.title;

 var pathname = window.location.pathname.split('/');
 if (pathname.length <= 3) {
   pathname.push('');
 }
 pathname[3] = video.videoId;
 window.history.pushState('', '', pathname.join('/'));
}

document.getElementById('next').addEventListener('click', function () { 
  loadNext(player); 
});

document.getElementById('prev').addEventListener('click', function () { 
  loadPrev(player); 
});
