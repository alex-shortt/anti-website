async function initSlider() {
  // Used to add a numeric id on slide creation to let us target the element later
  var slideIndex = 0
  // Tells us which slide we are on
  var currentSlideIndex = 0
  // An Array to hold all the slides
  var slideArray = []

  function Slide(elemID) {
    this.elem = $(elemID)
  }

  // Creating our slide objects, you can make as many as you want
  var slideObjs = $(".popup-slide")
  slideObjs.each(function() {
    $(this).attr("id", "slide" + slideIndex)
    slideIndex++
    var slideTemp = new Slide($(this).attr("id"))
    slideArray.push(slideTemp)
  })

  document.getElementById("slide" + currentSlideIndex).style.left = 0

  // Navigates to the previous slide in the list
  function prevSlide() {
    // Figure out what the previous slide is
    var nextSlideIndex
    // If we are at zero go to the last slide in the list
    if (currentSlideIndex === 0) {
      nextSlideIndex = slideArray.length - 1
    } else {
      // Otherwise the next one is this slide minus 1
      nextSlideIndex = currentSlideIndex - 1
    }

    // Setup the next slide and current slide for animations
    document.getElementById("slide" + nextSlideIndex).style.left = "-100%"
    document.getElementById("slide" + currentSlideIndex).style.left = 0

    // Add the appropriate animation class to the slide
    document
        .getElementById("slide" + nextSlideIndex)
        .setAttribute("class", "popup-slide singleSlide slideInLeft")
    document
        .getElementById("slide" + currentSlideIndex)
        .setAttribute("class", "popup-slide singleSlide slideOutRight")

    // Set current slide to the new current slide
    currentSlideIndex = nextSlideIndex
  }

  // Navigates to the next slide in the list
  function nextSlide() {
    // Figure out what the next slide is
    var nextSlideIndex
    // If we are at the last slide the next one is the first (zero based)
    if (currentSlideIndex === slideArray.length - 1) {
      nextSlideIndex = 0
    } else {
      // Otherwise the next slide is the current one plus 1
      nextSlideIndex = currentSlideIndex + 1
    }

    // Setup the next slide and current slide for animations
    document.getElementById("slide" + nextSlideIndex).style.left = "100%"
    document.getElementById("slide" + currentSlideIndex).style.left = 0

    // Add the appropriate animation class to the slide
    document
        .getElementById("slide" + nextSlideIndex)
        .setAttribute("class", "popup-slide singleSlide slideInRight")
    document
        .getElementById("slide" + currentSlideIndex)
        .setAttribute("class", "popup-slide singleSlide slideOutLeft")

    // Set current slide to the new current slide
    currentSlideIndex = nextSlideIndex
  }

  let counter = currentSlideIndex + 1
  $(".popup-text-controller-counter").html(`${counter}/${slideArray.length}`)
  var left = $(".popup-text-controller-left")
  var right = $(".popup-text-controller-right")

  left.click(async function() {
    prevSlide()
    let counter = currentSlideIndex + 1
    $(".popup-text-controller-counter").html(`${counter}/${slideArray.length}`)
  })

  right.click(async function() {
    nextSlide()
    let counter = currentSlideIndex + 1
    $(".popup-text-controller-counter").html(`${counter}/${slideArray.length}`)
  })
}

export default initSlider