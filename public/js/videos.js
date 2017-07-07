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
