import _regeneratorRuntime from "babel-runtime/regenerator";

var initSlider = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var slideIndex, currentSlideIndex, slideArray, Slide, slideObjs, prevSlide, nextSlide, counter, left, right;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            nextSlide = function nextSlide() {
              // Figure out what the next slide is
              var nextSlideIndex;
              // If we are at the last slide the next one is the first (zero based)
              if (currentSlideIndex === slideArray.length - 1) {
                nextSlideIndex = 0;
              } else {
                // Otherwise the next slide is the current one plus 1
                nextSlideIndex = currentSlideIndex + 1;
              }

              // Setup the next slide and current slide for animations
              document.getElementById("slide" + nextSlideIndex).style.left = "100%";
              document.getElementById("slide" + currentSlideIndex).style.left = 0;

              // Add the appropriate animation class to the slide
              document.getElementById("slide" + nextSlideIndex).setAttribute("class", "popup-slide singleSlide slideInRight");
              document.getElementById("slide" + currentSlideIndex).setAttribute("class", "popup-slide singleSlide slideOutLeft");

              // Set current slide to the new current slide
              currentSlideIndex = nextSlideIndex;
            };

            prevSlide = function prevSlide() {
              // Figure out what the previous slide is
              var nextSlideIndex;
              // If we are at zero go to the last slide in the list
              if (currentSlideIndex === 0) {
                nextSlideIndex = slideArray.length - 1;
              } else {
                // Otherwise the next one is this slide minus 1
                nextSlideIndex = currentSlideIndex - 1;
              }

              // Setup the next slide and current slide for animations
              document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
              document.getElementById("slide" + currentSlideIndex).style.left = 0;

              // Add the appropriate animation class to the slide
              document.getElementById("slide" + nextSlideIndex).setAttribute("class", "popup-slide singleSlide slideInLeft");
              document.getElementById("slide" + currentSlideIndex).setAttribute("class", "popup-slide singleSlide slideOutRight");

              // Set current slide to the new current slide
              currentSlideIndex = nextSlideIndex;
            };

            Slide = function Slide(elemID) {
              this.elem = $(elemID);
            };

            // Used to add a numeric id on slide creation to let us target the element later
            slideIndex = 0;
            // Tells us which slide we are on

            currentSlideIndex = 0;
            // An Array to hold all the slides

            slideArray = [];


            // Creating our slide objects, you can make as many as you want
            slideObjs = $(".popup-slide");

            slideObjs.each(function () {
              $(this).attr("id", "slide" + slideIndex);
              slideIndex++;
              var slideTemp = new Slide($(this).attr("id"));
              slideArray.push(slideTemp);
            });

            document.getElementById("slide" + currentSlideIndex).style.left = 0;

            // Navigates to the previous slide in the list


            // Navigates to the next slide in the list
            counter = currentSlideIndex + 1;

            $(".popup-text-controller-counter").html(counter + "/" + slideArray.length);
            left = $(".popup-text-controller-left");
            right = $(".popup-text-controller-right");


            left.click(_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
              var counter;
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      prevSlide();
                      counter = currentSlideIndex + 1;

                      $(".popup-text-controller-counter").html(counter + "/" + slideArray.length);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            })));

            right.click(_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
              var counter;
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      nextSlide();
                      counter = currentSlideIndex + 1;

                      $(".popup-text-controller-counter").html(counter + "/" + slideArray.length);

                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            })));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function initSlider() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

export default initSlider;