import { delay } from "../common/promises.js"
import loadChecks from "../pages/view/pageLoadChecks.js"

async function initGlitch(src) {
  let img_count = src.length
  let img_num = 0
  let parent_container = $(".lookbook-gallery")
  let isLoaded = false
  let glitch = new Array(img_count)
  let imgSrc = src
  let started = false
  let canvas
  let static_timing = [3000, 5000]
  let transition_ratio = [1000, 100]

  function checkImageLoop() {
    if (img_num == img_count) {
      img_num = 0
    } else if (img_num == -1) {
      img_num = img_count - 1
    }
  }

  var sketch = function(p) {
    p.setup = async function() {
      let windowW = parent_container.width()
      let windowH = parent_container.height()
      canvas = p.createCanvas(windowW, windowH)
      $(".lookbook-gallery").append($("#defaultCanvas0"))
      for (let i = 0; i < img_count; i++) {
        p.loadImage(imgSrc[i], function(img) {
          glitch[i] = new Glitch(img)
          isLoaded = true
        })
      }

      window.addEventListener("resize", function() {
        let windowW = parent_container.width()
        let windowH = parent_container.height()
        $("#defaultCanvas0").css("width", windowW + "px")
        $("#defaultCanvas0").css("height", windowH + "px")

        for (let i = 0; i < img_count; i++) {
          p.loadImage(imgSrc[i], function(img) {
            glitch[i] = new Glitch(img)
            isLoaded = true
          })
        }
      })

      let counter = img_num + 1
      $(".lookbook-text-controller-counter").html(`${counter}/${img_count}`)
      var left = $(".lookbook-text-controller-left")
      var right = $(".lookbook-text-controller-right")

      left.click(async function() {
        static_timing[0] /= transition_ratio[0]
        static_timing[1] /= transition_ratio[1]
        glitch[img_num].throughFlag = true
        p.clear()
        await delay(750)
        img_num--
        checkImageLoop()
        let counter = img_num + 1
        $(".lookbook-text-controller-counter").html(`${counter}/${img_count}`)
        await delay(750)
        static_timing[0] *= transition_ratio[0]
        static_timing[1] *= transition_ratio[1]
      })

      right.click(async function() {
        static_timing[0] /= transition_ratio[0]
        static_timing[1] /= transition_ratio[1]
        glitch[img_num].throughFlag = true
        p.clear()
        await delay(750)
        img_num++
        checkImageLoop()
        let counter = img_num + 1
        $(".lookbook-text-controller-counter").html(`${counter}/${img_count}`)
        await delay(750)
        static_timing[0] *= transition_ratio[0]
        static_timing[1] *= transition_ratio[1]
      })
    }

    p.draw = async function() {
      if (!loadChecks.lookbookLoad) {
        return
      }
      p.clear()

      if (isLoaded) {
        glitch[img_num].show()
      }

      // fill(255, 255, 255);
      // textSize(14);
      // text('FPS: ' + floor(frameRate()), 20, 30);
    }

    class Glitch {
      constructor(img) {
        this.channelLen = 4
        this.imgOrigin = img
        this.imgOrigin.loadPixels()
        this.copyData = []
        this.flowLineImgs = []
        this.shiftLineImgs = []
        this.shiftRGBs = []
        this.scatImgs = []
        this.throughFlag = true
        this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels)

        // flow line
        for (let i = 0; i < 1; i++) {
          let o = {
            pixels: null,
            t1: p.floor(p.random(0, 1000)),
            speed: p.floor(p.random(4, 24)),
            randX: p.floor(p.random(24, 80))
          }
          this.flowLineImgs.push(o)
        }

        // shift line
        for (let i = 0; i < 6; i++) {
          let o = null
          this.shiftLineImgs.push(o)
        }

        // shift RGB
        for (let i = 0; i < 1; i++) {
          let o = null
          this.shiftRGBs.push(o)
        }

        // scat imgs
        for (let i = 0; i < 3; i++) {
          let scatImg = {
            img: null,
            x: 0,
            y: 0
          }
          this.scatImgs.push(scatImg)
        }
      }

      replaceData(destImg, srcPixels) {
        for (let y = 0; y < destImg.height; y++) {
          for (let x = 0; x < destImg.width; x++) {
            let r, g, b, a
            let index
            index = (y * destImg.width + x) * this.channelLen
            r = index
            g = index + 1
            b = index + 2
            a = index + 3
            destImg.pixels[r] = srcPixels[r]
            destImg.pixels[g] = srcPixels[g]
            destImg.pixels[b] = srcPixels[b]
            destImg.pixels[a] = srcPixels[a]
          }
        }
        destImg.updatePixels()
      }

      flowLine(srcImg, obj) {
        let destPixels, tempY
        destPixels = new Uint8ClampedArray(srcImg.pixels)
        obj.t1 %= srcImg.height
        obj.t1 += obj.speed
        //tempY = floor(noise(obj.t1) * srcImg.height);
        tempY = p.floor(obj.t1)
        for (let y = 0; y < srcImg.height; y++) {
          if (tempY === y) {
            for (let x = 0; x < srcImg.width; x++) {
              let r, g, b, a
              let index
              index = (y * srcImg.width + x) * this.channelLen
              r = index
              g = index + 1
              b = index + 2
              a = index + 3
              destPixels[r] = srcImg.pixels[r] + obj.randX
              destPixels[g] = srcImg.pixels[g] + obj.randX
              destPixels[b] = srcImg.pixels[b] + obj.randX
              destPixels[a] = srcImg.pixels[a]
            }
          }
        }
        return destPixels
      }

      shiftLine(srcImg) {
        let offsetX
        let rangeMin, rangeMax
        let destPixels
        let rangeH

        destPixels = new Uint8ClampedArray(srcImg.pixels)
        rangeH = srcImg.height
        rangeMin = p.floor(p.random(0, rangeH))
        rangeMax = rangeMin + p.floor(p.random(1, rangeH - rangeMin))
        offsetX = this.channelLen * p.floor(p.random(-40, 40))

        for (let y = 0; y < srcImg.height; y++) {
          if (y > rangeMin && y < rangeMax) {
            for (let x = 0; x < srcImg.width; x++) {
              let r, g, b, a
              let r2, g2, b2, a2
              let index

              index = (y * srcImg.width + x) * this.channelLen
              r = index
              g = index + 1
              b = index + 2
              a = index + 3
              r2 = r + offsetX
              g2 = g + offsetX
              b2 = b + offsetX
              destPixels[r] = srcImg.pixels[r2]
              destPixels[g] = srcImg.pixels[g2]
              destPixels[b] = srcImg.pixels[b2]
              destPixels[a] = srcImg.pixels[a]
            }
          }
        }
        return destPixels
      }

      shiftRGB(srcImg) {
        let randR, randG, randB
        let destPixels
        let range

        range = 16
        destPixels = new Uint8ClampedArray(srcImg.pixels)
        randR =
          (p.floor(p.random(-range, range)) * srcImg.width +
            p.floor(p.random(-range, range))) *
          this.channelLen
        randG =
          (p.floor(p.random(-range, range)) * srcImg.width +
            p.floor(p.random(-range, range))) *
          this.channelLen
        randB =
          (p.floor(p.random(-range, range)) * srcImg.width +
            p.floor(p.random(-range, range))) *
          this.channelLen

        for (let y = 0; y < srcImg.height; y++) {
          for (let x = 0; x < srcImg.width; x++) {
            let r, g, b, a
            let r2, g2, b2, a2
            let index

            index = (y * srcImg.width + x) * this.channelLen
            r = index
            g = index + 1
            b = index + 2
            a = index + 3
            r2 = (r + randR) % srcImg.pixels.length
            g2 = (g + randG) % srcImg.pixels.length
            b2 = (b + randB) % srcImg.pixels.length
            destPixels[r] = srcImg.pixels[r2]
            destPixels[g] = srcImg.pixels[g2]
            destPixels[b] = srcImg.pixels[b2]
            destPixels[a] = srcImg.pixels[a]
          }
        }

        return destPixels
      }

      getRandomRectImg(srcImg) {
        let startX
        let startY
        let rectW
        let rectH
        let destImg
        startX = p.floor(p.random(0, srcImg.width - 30))
        startY = p.floor(p.random(0, srcImg.height - 50))
        rectW = p.floor(p.random(30, srcImg.width - startX))
        rectH = p.floor(p.random(1, 50))
        destImg = srcImg.get(startX, startY, rectW, rectH)
        destImg.loadPixels()
        return destImg
      }

      show() {
        // restore the original state
        this.replaceData(this.imgOrigin, this.copyData)

        // sometimes pass without effect processing
        let n = p.floor(p.random(100))
        if (n > 50 && this.throughFlag) {
          this.throughFlag = false
          setTimeout(() => {
            this.throughFlag = true
          }, p.floor(p.random(static_timing[0], static_timing[1])))
        }
        if (!this.throughFlag) {
          p.push()
          p.translate(
            (p.width - this.imgOrigin.width) / 2,
            (p.height - this.imgOrigin.height) / 2
          )
          p.image(this.imgOrigin, 0, 0)
          p.pop()
          return
        }

        // flow line
        this.flowLineImgs.forEach((v, i, arr) => {
          arr[i].pixels = this.flowLine(this.imgOrigin, v)
          if (arr[i].pixels) {
            this.replaceData(this.imgOrigin, arr[i].pixels)
          }
        })

        // shift line
        this.shiftLineImgs.forEach((v, i, arr) => {
          if (p.floor(p.random(100)) > 50) {
            arr[i] = this.shiftLine(this.imgOrigin)
            this.replaceData(this.imgOrigin, arr[i])
          } else {
            if (arr[i]) {
              this.replaceData(this.imgOrigin, arr[i])
            }
          }
        })

        // shift rgb
        this.shiftRGBs.forEach((v, i, arr) => {
          if (p.floor(p.random(100)) > 65) {
            arr[i] = this.shiftRGB(this.imgOrigin)
            this.replaceData(this.imgOrigin, arr[i])
          }
        })

        p.push()
        p.translate(
          (p.width - this.imgOrigin.width) / 2,
          (p.height - this.imgOrigin.height) / 2
        )
        p.image(this.imgOrigin, 0, 0)
        p.pop()

        // scat image
        this.scatImgs.forEach(obj => {
          p.push()
          p.translate(
            (p.width - this.imgOrigin.width) / 2,
            (p.height - this.imgOrigin.height) / 2
          )
          if (p.floor(p.random(100)) > 80) {
            obj.x = p.floor(
              p.random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7)
            )
            obj.y = p.floor(
              p.random(-this.imgOrigin.height * 0.1, this.imgOrigin.height)
            )
            obj.img = this.getRandomRectImg(this.imgOrigin)
          }
          if (obj.img) {
            p.image(obj.img, obj.x, obj.y)
          }
          p.pop()
        })
      }
    }
  }

  var glitch_image = new p5(sketch)
}

export default initGlitch
