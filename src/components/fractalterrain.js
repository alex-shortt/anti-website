import _regeneratorRuntime from "babel-runtime/regenerator";

var svgInit = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var slowDraw = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(w) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                prog++;
                drawTop(w, ctxTop);
                drawBot(w, ctxBot);
                if (w <= size) requestAnimationFrame(function () {
                  slowDraw(w + 1);
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function slowDraw(_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    var canvasTop, ctxTop, canvasBot, ctxBot, width, height, prog, size, water, seed, hmap, topLine, botLine, topPen, botPen, random, setup, drawTop, drawBot, redrawFractal;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            redrawFractal = function redrawFractal() {
              ctxTop.fillStyle = "#000000";
              ctxTop.fillRect(0, 0, $("body").width() * 2, $("body").height());
              ctxBot.fillStyle = "#000000";
              ctxBot.fillRect(0, 0, $("body").width() * 2, $("body").height());

              width = $("body").width() * 2;
              height = $("body").height();

              canvasTop.width = width * 2;
              canvasTop.height = height;
              canvasBot.width = width * 2;
              canvasBot.height = height;

              botLine = new Float32Array(size + 1);
              topLine = new Float32Array(size + 1);

              topPen = false;
              botPen = false;

              for (var w = 0; w <= size; w++) {
                drawTop(w, ctxTop);
                drawBot(w, ctxBot);
              }
            };

            drawBot = function drawBot(w, thisContext) {
              var locSize = 256;
              var r = locSize / size;
              var k = 0;
              botPen = false;
              thisContext.strokeStyle = "#c1c1c1";
              for (var z = 0; z <= size; z++) {
                var xe = r * z * 1; //smoothness of mountains
                var ye = r * 0.66 * w + hmap[z][w] * 1; //peak
                if (ye <= botLine[z] || hmap[z][w] === 0 && w / water !== (w / water | 0)) {
                  if (botPen) thisContext.stroke();
                  botPen = false;
                } else {
                  if (botPen === false) thisContext.moveTo(width * 2 * xe / locSize, height * (locSize - ye) / locSize);else thisContext.lineTo(width * 2 * xe / locSize, height * ye / locSize);
                  if (!botPen) thisContext.beginPath();
                  botPen = true;
                  botLine[z] = ye;
                }
              }
              return w < size;
            };

            drawTop = function drawTop(w, thisContext) {
              var locSize = 256;
              var r = locSize / size;
              var k = 0;
              topPen = false;
              thisContext.strokeStyle = "#c1c1c1";
              for (var z = 0; z <= size; z++) {
                var xe = r * z * 1; //smoothness of mountains
                var ye = r * 0.66 * w + hmap[z][w] * 1; //peak
                if (ye <= topLine[z] || hmap[z][w] === 0 && w / water !== (w / water | 0)) {
                  if (topPen) thisContext.stroke();
                  topPen = false;
                } else {
                  if (topPen === false) thisContext.moveTo(width * 2 * xe / locSize, height * (locSize - ye) / locSize);else thisContext.lineTo(width * 2 * xe / locSize, height * (locSize - ye) / locSize);
                  if (!topPen) thisContext.beginPath();
                  topPen = true;
                  topLine[z] = ye;
                }
              }
              return w < size;
            };

            setup = function setup() {
              canvasTop.width = width * 2;
              canvasTop.height = height;
              canvasBot.width = width * 2;
              canvasBot.height = height;

              var randomLevel = 60;
              var nbits = size.toString(2).length - 1;
              var rnd = function rnd() {
                return randomLevel * (-1 + 2 * random());
              };
              botLine = new Float32Array(size + 1);
              topLine = new Float32Array(size + 1);
              for (var i = 0; i <= size; i++) {
                hmap[i] = new Float32Array(size + 1);
              }var t = 1;
              var x = size / 2;
              for (var s = 1; s <= nbits; s++) {
                for (var v = 0; v <= size; v += 2 * x) {
                  for (var n = 1; n <= t; n += 2) {
                    hmap[n * x][v] = (hmap[(n - 1) * x][v] + hmap[(n + 1) * x][v]) / 2 + rnd();
                    hmap[v][n * x] = (hmap[v][(n - 1) * x] + hmap[v][(n + 1) * x]) / 2 + rnd();
                  }
                }
                for (var _n = 1; _n <= t; _n += 2) {
                  for (var m = 1; m <= t; m += 2) {
                    hmap[_n * x][m * x] = 0.25 * (hmap[_n * x + x][m * x] + hmap[_n * x - x][m * x] + hmap[_n * x][m * x + x] + hmap[_n * x][m * x - x]) + rnd();
                  }
                }
                t = 2 * t + 1;
                x /= 2;
                randomLevel /= 2;
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
            };

            random = function random() {
              seed = seed * 16807 % 2147483647;
              return (seed - 1) / 2147483646;
            };

            canvasTop = $("#fractal-terrain-top").get(0);
            ctxTop = canvasTop.getContext("2d");
            canvasBot = $("#fractal-terrain-bottom").get(0);
            ctxBot = canvasBot.getContext("2d");
            width = $("body").width();
            height = $("body").height();
            prog = 0;

            /////////////////////////////////////

            size = Math.pow(2, 8);
            water = 1; // 0 for no water

            seed = Math.random() * 100000 | 0;
            hmap = [];
            topLine = void 0;
            botLine = void 0;
            topPen = false;
            botPen = false;
            /////////////////////////////////////

            console.log("fractal random seed: " + seed);


            setup();
            slowDraw(0);

          case 23:
            if (!(prog < 256)) {
              _context2.next = 28;
              break;
            }

            _context2.next = 26;
            return delay(1);

          case 26:
            _context2.next = 23;
            break;

          case 28:
            window.onresize = redrawFractal;

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function svgInit() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import SVG from "../common/SVG.js";
import { delay } from "../common/promises.js";

export default svgInit;