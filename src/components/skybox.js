class Skybox {
  constructor() {
    this.box = $(".skybox")
    this.maxOffset = 50
    this.box.addClass("active")
  }

  rotate(xAngle, yAngle) {
    let transform = "translate(-50%, -50%)"
    let xOffset = `translateX(${(xAngle / 90) * -1 * this.maxOffset}vw)`
    let yOffset = `translateY(${(yAngle / 90) * this.maxOffset}vh)`

    transform = `${transform} ${xOffset} ${yOffset}`

    this.box.css("transform", transform)
  }
}

export default Skybox
