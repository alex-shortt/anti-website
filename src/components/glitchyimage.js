import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var initGlitch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(src) {
    var img_count, img_num, parent_container, isLoaded, glitch, imgSrc, started, canvas, static_timing, transition_ratio, checkImageLoop, sketch, glitch_image;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            checkImageLoop = function checkImageLoop() {
              if (img_num == img_count) {
                img_num = 0;
              } else if (img_num == -1) {
                img_num = img_count - 1;
              }
            };

            img_count = src.length;
            img_num = 0;
            parent_container = $(".lookbook-gallery");
            isLoaded = false;
            glitch = new Array(img_count);
            imgSrc = src;
            started = false;
            canvas = void 0;
            static_timing = [3000, 5000];
            transition_ratio = [1000, 100];

            sketch = function sketch(p) {
              p.setup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                var windowW, windowH, _loop, i, counter, left, right;

                return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        windowW = parent_container.width();
                        windowH = parent_container.height();

                        canvas = p.createCanvas(windowW, windowH);
                        $(".lookbook-gallery").append($("#defaultCanvas0"));

                        _loop = function _loop(i) {
                          p.loadImage(imgSrc[i], function (img) {
                            glitch[i] = new Glitch(img);
                            isLoaded = true;
                          });
                        };

                        for (i = 0; i < img_count; i++) {
                          _loop(i);
                        }

                        window.addEventListener("resize", function () {
                          var windowW = parent_container.width();
                          var windowH = parent_container.height();
                          $("#defaultCanvas0").css("width", windowW + "px");
                          $("#defaultCanvas0").css("height", windowH + "px");

                          var _loop2 = function _loop2(i) {
                            p.loadImage(imgSrc[i], function (img) {
                              glitch[i] = new Glitch(img);
                              isLoaded = true;
                            });
                          };

                          for (var i = 0; i < img_count; i++) {
                            _loop2(i);
                          }
                        });

                        counter = img_num + 1;

                        $(".lookbook-text-controller-counter").html(counter + "/" + img_count);
                        left = $(".lookbook-text-controller-left");
                        right = $(".lookbook-text-controller-right");


                        left.click(_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                          var counter;
                          return _regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  static_timing[0] /= transition_ratio[0];
                                  static_timing[1] /= transition_ratio[1];
                                  glitch[img_num].throughFlag = true;
                                  p.clear();
                                  _context.next = 6;
                                  return delay(750);

                                case 6:
                                  img_num--;
                                  checkImageLoop();
                                  counter = img_num + 1;

                                  $(".lookbook-text-controller-counter").html(counter + "/" + img_count);
                                  _context.next = 12;
                                  return delay(750);

                                case 12:
                                  static_timing[0] *= transition_ratio[0];
                                  static_timing[1] *= transition_ratio[1];

                                case 14:
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
                                  static_timing[0] /= transition_ratio[0];
                                  static_timing[1] /= transition_ratio[1];
                                  glitch[img_num].throughFlag = true;
                                  p.clear();
                                  _context2.next = 6;
                                  return delay(750);

                                case 6:
                                  img_num++;
                                  checkImageLoop();
                                  counter = img_num + 1;

                                  $(".lookbook-text-controller-counter").html(counter + "/" + img_count);
                                  _context2.next = 12;
                                  return delay(750);

                                case 12:
                                  static_timing[0] *= transition_ratio[0];
                                  static_timing[1] *= transition_ratio[1];

                                case 14:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, this);
                        })));

                      case 13:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));

              p.draw = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (loadChecks.lookbookLoad) {
                          _context4.next = 2;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 2:
                        p.clear();

                        if (isLoaded) {
                          glitch[img_num].show();
                        }

                        // fill(255, 255, 255);
                        // textSize(14);
                        // text('FPS: ' + floor(frameRate()), 20, 30);

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              }));

              var Glitch = function () {
                function Glitch(img) {
                  _classCallCheck(this, Glitch);

                  this.channelLen = 4;
                  this.imgOrigin = img;
                  this.imgOrigin.loadPixels();
                  this.copyData = [];
                  this.flowLineImgs = [];
                  this.shiftLineImgs = [];
                  this.shiftRGBs = [];
                  this.scatImgs = [];
                  this.throughFlag = true;
                  this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

                  // flow line
                  for (var i = 0; i < 1; i++) {
                    var o = {
                      pixels: null,
                      t1: p.floor(p.random(0, 1000)),
                      speed: p.floor(p.random(4, 24)),
                      randX: p.floor(p.random(24, 80))
                    };
                    this.flowLineImgs.push(o);
                  }

                  // shift line
                  for (var _i = 0; _i < 6; _i++) {
                    var _o = null;
                    this.shiftLineImgs.push(_o);
                  }

                  // shift RGB
                  for (var _i2 = 0; _i2 < 1; _i2++) {
                    var _o2 = null;
                    this.shiftRGBs.push(_o2);
                  }

                  // scat imgs
                  for (var _i3 = 0; _i3 < 3; _i3++) {
                    var scatImg = {
                      img: null,
                      x: 0,
                      y: 0
                    };
                    this.scatImgs.push(scatImg);
                  }
                }

                _createClass(Glitch, [{
                  key: "replaceData",
                  value: function replaceData(destImg, srcPixels) {
                    for (var y = 0; y < destImg.height; y++) {
                      for (var x = 0; x < destImg.width; x++) {
                        var r = void 0,
                            g = void 0,
                            b = void 0,
                            a = void 0;
                        var index = void 0;
                        index = (y * destImg.width + x) * this.channelLen;
                        r = index;
                        g = index + 1;
                        b = index + 2;
                        a = index + 3;
                        destImg.pixels[r] = srcPixels[r];
                        destImg.pixels[g] = srcPixels[g];
                        destImg.pixels[b] = srcPixels[b];
                        destImg.pixels[a] = srcPixels[a];
                      }
                    }
                    destImg.updatePixels();
                  }
                }, {
                  key: "flowLine",
                  value: function flowLine(srcImg, obj) {
                    var destPixels = void 0,
                        tempY = void 0;
                    destPixels = new Uint8ClampedArray(srcImg.pixels);
                    obj.t1 %= srcImg.height;
                    obj.t1 += obj.speed;
                    //tempY = floor(noise(obj.t1) * srcImg.height);
                    tempY = p.floor(obj.t1);
                    for (var y = 0; y < srcImg.height; y++) {
                      if (tempY === y) {
                        for (var x = 0; x < srcImg.width; x++) {
                          var r = void 0,
                              g = void 0,
                              b = void 0,
                              a = void 0;
                          var index = void 0;
                          index = (y * srcImg.width + x) * this.channelLen;
                          r = index;
                          g = index + 1;
                          b = index + 2;
                          a = index + 3;
                          destPixels[r] = srcImg.pixels[r] + obj.randX;
                          destPixels[g] = srcImg.pixels[g] + obj.randX;
                          destPixels[b] = srcImg.pixels[b] + obj.randX;
                          destPixels[a] = srcImg.pixels[a];
                        }
                      }
                    }
                    return destPixels;
                  }
                }, {
                  key: "shiftLine",
                  value: function shiftLine(srcImg) {
                    var offsetX = void 0;
                    var rangeMin = void 0,
                        rangeMax = void 0;
                    var destPixels = void 0;
                    var rangeH = void 0;

                    destPixels = new Uint8ClampedArray(srcImg.pixels);
                    rangeH = srcImg.height;
                    rangeMin = p.floor(p.random(0, rangeH));
                    rangeMax = rangeMin + p.floor(p.random(1, rangeH - rangeMin));
                    offsetX = this.channelLen * p.floor(p.random(-40, 40));

                    for (var y = 0; y < srcImg.height; y++) {
                      if (y > rangeMin && y < rangeMax) {
                        for (var x = 0; x < srcImg.width; x++) {
                          var r = void 0,
                              g = void 0,
                              b = void 0,
                              a = void 0;
                          var r2 = void 0,
                              g2 = void 0,
                              b2 = void 0,
                              a2 = void 0;
                          var index = void 0;

                          index = (y * srcImg.width + x) * this.channelLen;
                          r = index;
                          g = index + 1;
                          b = index + 2;
                          a = index + 3;
                          r2 = r + offsetX;
                          g2 = g + offsetX;
                          b2 = b + offsetX;
                          destPixels[r] = srcImg.pixels[r2];
                          destPixels[g] = srcImg.pixels[g2];
                          destPixels[b] = srcImg.pixels[b2];
                          destPixels[a] = srcImg.pixels[a];
                        }
                      }
                    }
                    return destPixels;
                  }
                }, {
                  key: "shiftRGB",
                  value: function shiftRGB(srcImg) {
                    var randR = void 0,
                        randG = void 0,
                        randB = void 0;
                    var destPixels = void 0;
                    var range = void 0;

                    range = 16;
                    destPixels = new Uint8ClampedArray(srcImg.pixels);
                    randR = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * this.channelLen;
                    randG = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * this.channelLen;
                    randB = (p.floor(p.random(-range, range)) * srcImg.width + p.floor(p.random(-range, range))) * this.channelLen;

                    for (var y = 0; y < srcImg.height; y++) {
                      for (var x = 0; x < srcImg.width; x++) {
                        var r = void 0,
                            g = void 0,
                            b = void 0,
                            a = void 0;
                        var r2 = void 0,
                            g2 = void 0,
                            b2 = void 0,
                            a2 = void 0;
                        var index = void 0;

                        index = (y * srcImg.width + x) * this.channelLen;
                        r = index;
                        g = index + 1;
                        b = index + 2;
                        a = index + 3;
                        r2 = (r + randR) % srcImg.pixels.length;
                        g2 = (g + randG) % srcImg.pixels.length;
                        b2 = (b + randB) % srcImg.pixels.length;
                        destPixels[r] = srcImg.pixels[r2];
                        destPixels[g] = srcImg.pixels[g2];
                        destPixels[b] = srcImg.pixels[b2];
                        destPixels[a] = srcImg.pixels[a];
                      }
                    }

                    return destPixels;
                  }
                }, {
                  key: "getRandomRectImg",
                  value: function getRandomRectImg(srcImg) {
                    var startX = void 0;
                    var startY = void 0;
                    var rectW = void 0;
                    var rectH = void 0;
                    var destImg = void 0;
                    startX = p.floor(p.random(0, srcImg.width - 30));
                    startY = p.floor(p.random(0, srcImg.height - 50));
                    rectW = p.floor(p.random(30, srcImg.width - startX));
                    rectH = p.floor(p.random(1, 50));
                    destImg = srcImg.get(startX, startY, rectW, rectH);
                    destImg.loadPixels();
                    return destImg;
                  }
                }, {
                  key: "show",
                  value: function show() {
                    var _this = this;

                    // restore the original state
                    this.replaceData(this.imgOrigin, this.copyData);

                    // sometimes pass without effect processing
                    var n = p.floor(p.random(100));
                    if (n > 50 && this.throughFlag) {
                      this.throughFlag = false;
                      setTimeout(function () {
                        _this.throughFlag = true;
                      }, p.floor(p.random(static_timing[0], static_timing[1])));
                    }
                    if (!this.throughFlag) {
                      p.push();
                      p.translate((p.width - this.imgOrigin.width) / 2, (p.height - this.imgOrigin.height) / 2);
                      p.image(this.imgOrigin, 0, 0);
                      p.pop();
                      return;
                    }

                    // flow line
                    this.flowLineImgs.forEach(function (v, i, arr) {
                      arr[i].pixels = _this.flowLine(_this.imgOrigin, v);
                      if (arr[i].pixels) {
                        _this.replaceData(_this.imgOrigin, arr[i].pixels);
                      }
                    });

                    // shift line
                    this.shiftLineImgs.forEach(function (v, i, arr) {
                      if (p.floor(p.random(100)) > 50) {
                        arr[i] = _this.shiftLine(_this.imgOrigin);
                        _this.replaceData(_this.imgOrigin, arr[i]);
                      } else {
                        if (arr[i]) {
                          _this.replaceData(_this.imgOrigin, arr[i]);
                        }
                      }
                    });

                    // shift rgb
                    this.shiftRGBs.forEach(function (v, i, arr) {
                      if (p.floor(p.random(100)) > 65) {
                        arr[i] = _this.shiftRGB(_this.imgOrigin);
                        _this.replaceData(_this.imgOrigin, arr[i]);
                      }
                    });

                    p.push();
                    p.translate((p.width - this.imgOrigin.width) / 2, (p.height - this.imgOrigin.height) / 2);
                    p.image(this.imgOrigin, 0, 0);
                    p.pop();

                    // scat image
                    this.scatImgs.forEach(function (obj) {
                      p.push();
                      p.translate((p.width - _this.imgOrigin.width) / 2, (p.height - _this.imgOrigin.height) / 2);
                      if (p.floor(p.random(100)) > 80) {
                        obj.x = p.floor(p.random(-_this.imgOrigin.width * 0.3, _this.imgOrigin.width * 0.7));
                        obj.y = p.floor(p.random(-_this.imgOrigin.height * 0.1, _this.imgOrigin.height));
                        obj.img = _this.getRandomRectImg(_this.imgOrigin);
                      }
                      if (obj.img) {
                        p.image(obj.img, obj.x, obj.y);
                      }
                      p.pop();
                    });
                  }
                }]);

                return Glitch;
              }();
            };

            glitch_image = new p5(sketch);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function initGlitch(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { delay } from "../common/promises.js";
import loadChecks from "../pages/view/pageLoadChecks.js";

export default initGlitch;