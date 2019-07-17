import Container from "./container.js"
import { delay } from "../common/promises.js"
import loadChecks from "../pages/view/pageLoadChecks.js"

class Sphere {
  constructor(xcells, ycells, skybox) {
    this.sphere = $(".sphere")
    this.xcells = xcells
    this.ycells = ycells
    this.cells = new Array()
    this.skybox = skybox
    this.currX = 0
    this.currY = 0
    this.spacing = ""
    $(window).on("resize", () => this.resizeSphere())
  }

  async zoomOut() {
    var sphere = this.sphere
    var x = this.currX
    var y = this.currY
    var x_angle = x * (360 / this.xcells)
    var y_angle = y * (360 / this.ycells)
    sphere.css("transition", "transform 0.5s")
    sphere.css(
        "transform",
        `translate(-50%, -50%) translateZ(0) rotateY(${x_angle}deg) rotateX(${y_angle}deg)`
    )
  }

  async zoomIn() {
    var sphere = this.sphere
    var x = this.currX
    var y = this.currY
    var x_angle = x * (360 / this.xcells)
    var y_angle = y * (360 / this.ycells)
    sphere.css("transition", "transform 0.5s")
    sphere.css(
        "transform",
        `translate(-50%, -50%) translateZ(${
            this.spacing
            }) rotateY(${x_angle}deg) rotateX(${y_angle}deg)`
    )
  }

  loadContainers() {
    var containers = $(".container")

    for (var i = 0; i < containers.length; i++) {
      var coord = $(containers[i]).attr("name")
      var x = coord.substring(0, 1)
      if (x == "-") {
        x = coord.substring(0, 2)
      }
      var y = coord.substring(x.length + 1)

      this.cells[i] = new Container($(containers[i]), x, y)
    }
  }

  initialOrient() {
    var cells = this.cells

    for (var i = 0; i < cells.length; i++) {
      var container = cells[i].elem
      var x = cells[i].x
      var y = cells[i].y

      var x_angle = x * (360 / this.xcells)
      var y_angle = y * (360 / this.ycells)
      container.css("position", "absolute")
      container.css(
          "transform",
          `rotateY(${x_angle}deg) rotateX(${y_angle}deg) translateZ(-${
              this.spacing
              })`
      )
    }

    this.sphere.css(
        "transform",
        `translate(-50%, -50%) translateZ(${this.spacing}) rotateY(0) rotateX(0)`
    )

    this.resizeSphere()
  }

  resizeSphere() {
    let vw = $(window).width()
    let vh = $(window).height()

    let spacing = 100
    if (vw > 1000) spacing *= 2
    else if (vw > 800) spacing *= 3.5
    else if (vw > 650) spacing *= 4
    else if (vw > 500) spacing *= 5
    else spacing *= 6

    this.spacing = `${spacing}vw`

    var cells = this.cells

    for (var i = 0; i < cells.length; i++) {
      var container = cells[i].elem
      var x = cells[i].x
      var y = cells[i].y

      var x_angle = x * (360 / this.xcells)
      var y_angle = y * (360 / this.ycells)
      container.css("position", "absolute")
      container.css(
          "transform",
          `rotateY(${x_angle}deg) rotateX(${y_angle}deg) translateZ(-${
              this.spacing
              })`
      )
    }

    var sphere = this.sphere
    var x = this.currX
    var y = this.currY
    var x_angle = x * (360 / this.xcells)
    var y_angle = y * (360 / this.ycells)

    this.sphere.css(
        "transform",
        `translate(-50%, -50%) translateZ(${
            this.spacing
            }) rotateY(${x_angle}deg) rotateX(${y_angle}deg)`
    )
  }

  async moveTo(x, y) {
    var sphere = this.sphere
    var skybox = this.skybox
    var x_angle = x * (360 / this.xcells)
    var y_angle = y * (360 / this.ycells)
    await delay(500)
    sphere.css("transition", "transform 1s")
    sphere.css(
        "transform",
        `translate(-50%, -50%) translateZ(0) rotateY(${x_angle}deg) rotateX(${y_angle}deg)`
    )
    skybox.rotate(x_angle, y_angle)
    sphere.currX = x
    sphere.currY = y
    await delay(1000)
    await this.zoomIn()
    if(this.currX == 0 && this.currY == 0){
      loadChecks.socialsLoad = false;
      loadChecks.popupLoad = false;
      loadChecks.contactLoad = false;
      loadChecks.lookbookLoad = false;
    }
  }
}

export default Sphere
