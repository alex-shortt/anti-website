import { delay } from "../../common/promises.js"
import initGlitch from "../../components/glitchyimage.js"

var img_counter = 0;
var sources = [
              "assets/pictures/tiger.png",
              "assets/pictures/hourglass.png",
              "assets/pictures/dice.png"
              ]

async function initLookBook() {
  initGlitch(sources)
}

initLookBook()
