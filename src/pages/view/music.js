let isPlaying = false

class MusicPlayer {
  constructor(elementID, songs, songVols) {
    this.element = $(elementID)
    this.songs = songs
    this.songVols = songVols
    this.currSong = -1
    this.playToggle = false
    this.container = $(".music-controls")
  }

  updatePlay() {
    isPlaying = this.playToggle
    if (this.playToggle) {
      this.element.get(0).play()
      this.container.html('<i class="fas fa-pause"></i>')
    } else {
      this.element.get(0).pause()
      this.container.html('<i class="fas fa-play"></i>')
    }
  }

  togglePlay() {
    if (!this.playToggle) {
      this.playToggle = true
    } else {
      this.playToggle = false
    }
    this.updatePlay()
  }

  nextSong() {
    this.currSong++
    if (this.currSong == this.songs.length) {
      this.currSong = 0
    }
    var songSrc = this.songs[this.currSong]
    this.element.attr("src", songSrc)
    this.element.get(0).volume = this.songVols[this.currSong]
    this.element.get(0).load()
    this.updatePlay()
  }
}

export default MusicPlayer
