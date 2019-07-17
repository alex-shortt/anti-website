import { delay } from "../../common/promises.js"
import svgInit from "../../components/fractalterrain.js"
import initFrame from "../../components/tiltingframe.js"
import MusicPlayer from "../view/music.js"

async function clickToEnter() {
  $(".welcome").click(async () => {
    $(".welcome").off("click")

    var songsFolder = "assets/music/"
    var songs = [
        songsFolder + "energybea.mp3",
        songsFolder + "speeding colby 150.m4a"
    ]
    var songVols = [1, 0.015, 0.5]

    var music = new MusicPlayer("#music-audio", songs, songVols)
    music.element.on("ended", function() {
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

    $(".music-controls").click(function() {
      music.togglePlay()
    })

    $(".welcome").addClass("shrink")
    $(".welcome-text").addClass("fade")
    $(".welcome-text").css("pointer-events", "none")

    $(".welcome-logo-text").show()
    $(".welcome-logo-text").css("height", "115px")
    await delay(750)
    $(".welcome-logo-text").addClass("fade-in")
    await delay(250)

    $(".welcome-text").hide()
    $("#fractal-terrain").show()
    initFrame()

    music.nextSong()
    music.togglePlay()

    await delay(1000)

    await svgInit()
    $(".landing-links").show()
    $(".landing-links").attr("z-index", "999")
    $(".landing-links").addClass("fadeIn")
    $(".landing-links-socials-bot").addClass("fadeIn")
  })

  $(".terms-page").hide()
  $(".privacy-page").hide()
  $(".tax-page").hide()

  $(".welcome-logo-text-others-terms").click(async () => {
    $(".terms-page").show()
    $(".terms-page").css("opacity", "1")
  })
  $(".terms-page-exit").click(async () => {
    $(".terms-page").css("opacity", "0")
    await delay(1000)
    $(".terms-page").hide()
  })

  $(".welcome-logo-text-others-privacy").click(async () => {
    $(".privacy-page").show()
    $(".privacy-page").css("opacity", "1")
  })
  $(".privacy-page-exit").click(async () => {
    $(".privacy-page").css("opacity", "0")
    await delay(1000)
    $(".privacy-page").hide()
  })

  $(".welcome-logo-text-others-tax").click(async () => {
    $(".tax-page").show()
    $(".tax-page").css("opacity", "1")
  })
  $(".tax-page-exit").click(async () => {
    $(".tax-page").css("opacity", "0")
    await delay(1000)
    $(".tax-page").hide()
  })

  printCredits()
}

function printCredits() {
  const credits = `
   ______     __   __     ______   __
  /\\  __ \\   /\\ "-.\\ \\   /\\__  _\\ /\\ \\
  \\ \\  __ \\  \\ \\ \\-.  \\  \\/_/\\ \\/ \\ \\ \\
   \\ \\_\\ \\_\\  \\ \\_\\\\"\\_\\    \\ \\_\\  \\ \\_\\
    \\/_/\\/_/   \\/_/ \\/_/     \\/_/   \\/_/


  Alex Shortt
      https://instagram.com/alexander.shortt
      https://twitter.com/_alexshortt

  Steven Huynh-Tran
      https://instagram.com/stevnotran
      https://www.linkedin.com/in/stevenht/`
  console.log(credits)
}

export default clickToEnter
