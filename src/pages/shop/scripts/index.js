// Fade In
$(document).ready(() => {
  $('body').css('display', 'none')
  $('body').fadeIn(1000)

  $('#return').click(() => {
    event.preventDefault()
    var newLocation = $('#return').attr('href');
    $('body').fadeOut(1000, () => pageRedirect(newLocation))
    function pageRedirect(newLocation) {
      window.location = newLocation
    }
  })
})

import MusicPlayer from '../src/pages/view/music'

var songsFolder = "../assets/music/"
var songs = [
  songsFolder + "energybea.mp3",
  songsFolder + "speeding colby 150.m4a"
]
var songVols = [1, 0.015, 0.5]

var music = new MusicPlayer("#music-audio", songs, songVols)
music.element.on("ended", function () {
  //nextSong() method from music
  music.currSong++
  if (music.currSong == music.songs.length) {
    music.currSong = 0
  }
  var songSrc = music.songs[music.currSong]
  music.element.attr("src", songSrc)
  music.element.get(0).volume = music.songVols[music.currSong]
  music.element.get(0).load()
  music.updatePlay()
})

$(".music-controls").click(function () {
  music.togglePlay()
})

// $(".music-controls").click(function() {
//   music