import SVG from "../common/SVG.js"
import { delay } from "../common/promises.js"

async function svgInit() {
  let canvasTop = $("#fractal-terrain-top").get(0)
  let ctxTop = canvasTop.getContext("2d")
  let canvasBot = $("#fractal-terrain-bottom").get(0)
  let ctxBot = canvasBot.getContext("2d")
  let width = $("body").width()
  let height = $("body").height()
  let prog = 0

  /////////////////////////////////////
  const size = Math.pow(2, 8)
  const water = 1 // 0 for no water
  let seed = (Math.random() * 100000) | 0
  const hmap = []
  let topLine
  let botLine
  let topPen = false
  let botPen = false
  /////////////////////////////////////

  console.log("fractal random seed: " + seed)
  function random() {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  function setup() {
    canvasTop.width = width * 2
    canvasTop.height = height
    canvasBot.width = width * 2
    canvasBot.height = height

    let randomLevel = 60
    const nbits = size.toString(2).length - 1
    const rnd = () => randomLevel * (-1 + 2 * random())
    botLine = new Float32Array(size + 1)
    topLine = new Float32Array(size + 1)
    for (let i = 0; i <= size; i++) hmap[i] = new Float32Array(size + 1)
    let t = 1
    let x = size / 2
    for (let s = 1; s <= nbits; s++) {
      for (let v = 0; v <= size; v += 2 * x) {
        for (let n = 1; n <= t; n += 2) {
          hmap[n * x][v] =
              (hmap[(n - 1) * x][v] + hmap[(n + 1) * x][v]) / 2 + rnd()
          hmap[v][n * x] =
              (hmap[v][(n - 1) * x] + hmap[v][(n + 1) * x]) / 2 + rnd()
        }
      }
      for (let n = 1; n <= t; n += 2) {
        for (let m = 1; m <= t; m += 2) {
          hmap[n * x][m * x] =
              0.25 *
              (hmap[n * x + x][m * x] +
                  hmap[n * x - x][m * x] +
                  hmap[n * x][m * x + x] +
                  hmap[n * x][m * x - x]) +
              rnd()
        }
      }
      t = 2 * t + 1
      x /= 2
      randomLevel /= 2
    }

    // remove flat areas
    // for (let w = 0; w <= size; w++) {
    //   for (let z = 0; z <= size; z++) {
    //     if (hmap[w][z] < 0) hmap[w][z] = Math.abs(hmap[w][z]) //.25 * Math.abs(hmap[w][z])
    //   }
    // }

    // mirror over y axis
    // for (let w = size / 2; w <= size; w++) {
    //   let oppos = size / 2 - (w - size / 2)
    //   for (let z = 0; z <= size; z++) {
    //     if (hmap[oppos][z]) {
    //       hmap[oppos][z] = hmap[w][z]
    //     }
    //   }
    // }

    // //hmapInverse = hmap
    // for (let w = size / 2; w <= size; w++) {
    //   let oppos = size / 2 - (w - size / 2)
    //   for (let z = 0; z <= size; z++) {
    //     if (hmap[z][oppos]) {
    //       hmap[z][oppos] = hmap[z][w]
    //     }
    //   }
    // }
  }

  function drawTop(w, thisContext) {
    const locSize = 256
    const r = locSize / size
    let k = 0
    topPen = false
    thisContext.strokeStyle = "#c1c1c1"
    for (let z = 0; z <= size; z++) {
      let xe = r * z * 1 //smoothness of mountains
      let ye = r * 0.66 * w + hmap[z][w] * 1 //peak
      if (
          ye <= topLine[z] ||
          (hmap[z][w] === 0 && w / water !== ((w / water) | 0))
      ) {
        if (topPen) thisContext.stroke()
        topPen = false
      } else {
        if (topPen === false)
          thisContext.moveTo(
              (width * 2 * xe) / locSize,
              (height * (locSize - ye)) / locSize
          )
        else
          thisContext.lineTo(
              (width * 2 * xe) / locSize,
              (height * (locSize - ye)) / locSize
          )
        if (!topPen) thisContext.beginPath()
        topPen = true
        topLine[z] = ye
      }
    }
    return w < size
  }

  function drawBot(w, thisContext) {
    const locSize = 256
    const r = locSize / size
    let k = 0
    botPen = false
    thisContext.strokeStyle = "#c1c1c1"
    for (let z = 0; z <= size; z++) {
      let xe = r * z * 1 //smoothness of mountains
      let ye = r * 0.66 * w + hmap[z][w] * 1 //peak
      if (
          ye <= botLine[z] ||
          (hmap[z][w] === 0 && w / water !== ((w / water) | 0))
      ) {
        if (botPen) thisContext.stroke()
        botPen = false
      } else {
        if (botPen === false)
          thisContext.moveTo(
              (width * 2 * xe) / locSize,
              (height * (locSize - ye)) / locSize
          )
        else
          thisContext.lineTo(
              (width * 2 * xe) / locSize,
              (height * ye) / locSize
          )
        if (!botPen) thisContext.beginPath()
        botPen = true
        botLine[z] = ye
      }
    }
    return w < size
  }

  function redrawFractal() {
    ctxTop.fillStyle = "#000000"
    ctxTop.fillRect(0, 0, $("body").width() * 2, $("body").height())
    ctxBot.fillStyle = "#000000"
    ctxBot.fillRect(0, 0, $("body").width() * 2, $("body").height())

    width = $("body").width() * 2
    height = $("body").height()

    canvasTop.width = width * 2
    canvasTop.height = height
    canvasBot.width = width * 2
    canvasBot.height = height

    botLine = new Float32Array(size + 1)
    topLine = new Float32Array(size + 1)

    topPen = false
    botPen = false

    for (let w = 0; w <= size; w++) {
      drawTop(w, ctxTop)
      drawBot(w, ctxBot)
    }
  }

  async function slowDraw(w) {
    prog++
    drawTop(w, ctxTop)
    drawBot(w, ctxBot)
    if (w <= size)
      requestAnimationFrame(() => {
        slowDraw(w + 1)
      })
  }

  setup()
  slowDraw(0)
  while (prog < 256) {
    await delay(1)
  }
  window.onresize = redrawFractal
}

export default svgInit