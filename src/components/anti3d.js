import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var initAnti3D = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
      var config,
        colorConfig,
        Planet,
        Particle,
        canvas,
        ctx,
        w,
        h,
        hue,
        particles,
        spikeLength,
        planets,
        A,
        B,
        a,
        b,
        tick,
        setup,
        reset,
        mousemove,
        draw,
        clear,
        drawText,
        updatePlanets,
        updateParticles;
      return _regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                updateParticles = function updateParticles() {
                  hue += colorConfig.hueSpeed;
                  var h =
                    Math.sin(hue) * colorConfig.hueRange + colorConfig.baseHue;
                  ctx.strokeStyle =
                    "hsla(" +
                    h +
                    ", " +
                    colorConfig.colorSaturation +
                    "%, 50%, " +
                    colorConfig.particleOpacity +
                    ")";
                  particles.forEach(function(p) {
                    // Apply the force of each planet (repeller) to the current particle
                    planets.forEach(function(planet) {
                      var d = p.pos.sub(planet.pos);
                      var length = d.getLength();
                      var g = planet.g / length;
                      if (g > 40) {
                        g = 40;
                      }
                      // We keep the angle of the distance
                      d.setLength(g);
                      p.move(d);
                    });
                    p.draw();
                  });
                };

                updatePlanets = function updatePlanets() {
                  var len = planets.length;
                  for (var i = 1; i < len; i++) {
                    var angle = ((Math.PI * 2) / (len - 1)) * i;
                    var x = A * Math.sin((a * tick) / 100 + angle) + w / 2;
                    var y = B * Math.sin((b * tick) / 100 + angle) + h / 2;
                    var p = planets[i];
                    p.pos.x = x;
                    p.pos.y = y;
                    p.draw();
                  }
                };

                drawText = function drawText() {
                  ctx.save();
                  var fontSize = w * 0.1;
                  ctx.font =
                    "bold " + fontSize + "px Arial, Helvetica, sans-serif";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = "white";
                  ctx.strokeText(config.text, w / 2, h / 2);
                  ctx.restore();
                  var imageData = ctx.getImageData(0, 0, w, h);

                  particles = [];

                  for (var x = 0; x < w; x++) {
                    for (var y = 0; y < h; y++) {
                      var i = (x + w * y) * 4;
                      var average =
                        (imageData.data[i] +
                          imageData.data[i + 1] +
                          imageData.data[i + 2] +
                          imageData.data[i + 3]) /
                        4;
                      if (average > 200) {
                        var particle = new Particle(x, y);
                        particles.push(particle);
                      }
                    }
                  }
                  clear();
                };

                clear = function clear() {
                  ctx.clearRect(0, 0, w, h);
                };

                draw = function draw() {
                  clear();
                  requestAnimationFrame(draw);
                  if (!loadChecks.socialsLoad) {
                    return;
                  }
                  updateParticles();
                  updatePlanets();
                  tick++;
                };

                mousemove = function mousemove(event) {
                  var x = event.clientX;
                  var y = event.clientY;

                  planets[0].pos.y =
                    y -
                    $("#anti3d").get(0).offsetTop -
                    $(".landing-links-socials-bot").outerHeight(true);

                  if ($(window).width() < 800) {
                    planets[0].pos.x = x;
                  } else {
                    planets[0].pos.x = x - $(window).width() / 2;
                  }
                };

                reset = function reset() {
                  hue = colorConfig.baseHue;
                  w = canvas.width = Math.floor($(".socials-right").width());
                  h = canvas.height = Math.floor(
                    $(".socials-left-instafeed").height()
                  );
                  /*
              w = canvas.width = window.innerWidth;
              h = canvas.height = window.innerHeight;
              */
                  spikeLength = w * config.widthToSpikeLengthRatio;
                  A = w / 2.2;
                  B = h / 2.2;
                  a = Math.round(Math.random() + 2);
                  b = Math.round(Math.random() + 2);
                  drawText();

                  if ($(window).width() <= 800) {
                    if (planets.length < 6) {
                      planets.splice(0, planets.length);
                      var len = 6;
                      for (var i = 0; i < len; i++) {
                        var p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
                        planets.push(p);
                      }
                    }
                  } else {
                    if (planets.length != 1) {
                      planets.splice(0, planets.length);
                      var _p = new Planet(50 + 100, 340, 4000);
                      planets.push(_p);
                    }
                  }
                };

                setup = function setup() {
                  tick = 0;
                  planets = [];
                  var len = 1; //Math.round(Math.random()*3+3)
                  for (var i = 0; i < len; i++) {
                    var p = new Planet(50 + i * 100, 340, i ? 1000 : 4000);
                    planets.push(p);
                  }
                  canvas = document.querySelector("#anti3d");
                  ctx = canvas.getContext("2d");
                  window.addEventListener("resize", reset);
                  window.addEventListener("mousemove", mousemove);
                  reset();
                };

                config = {
                  text: "@  antiofficial",
                  widthToSpikeLengthRatio: 0.025
                };
                colorConfig = {
                  particleOpacity: 0.2,
                  baseHue: 28,
                  hueRange: 1,
                  hueSpeed: 0.01,
                  colorSaturation: 87
                };

                Planet = (function() {
                  function Planet(x, y, g) {
                    _classCallCheck(this, Planet);

                    this.pos = new Vector(x, y);
                    this.g = g;
                  }

                  _createClass(Planet, [
                    {
                      key: "draw",
                      value: function draw() {
                        ctx.fillStyle = "#f2f2f2";
                        ctx.beginPath();
                        ctx.arc(this.pos.x, this.pos.y, 4, 0, Math.PI * 2);
                        ctx.fill();
                      }
                    }
                  ]);

                  return Planet;
                })();

                // A line that is part of forming the text

                Particle = (function() {
                  function Particle(x, y) {
                    _classCallCheck(this, Particle);

                    this.pos = new Vector(x, y);
                    this.vel = new Vector(0, spikeLength);
                  }

                  _createClass(Particle, [
                    {
                      key: "move",
                      value: function move(force) {
                        if (force) {
                          this.vel.addTo(force);
                        }
                        if (this.vel.getLength() > spikeLength) {
                          this.vel.setLength(spikeLength);
                        }
                      }
                    },
                    {
                      key: "draw",
                      value: function draw() {
                        ctx.beginPath();
                        ctx.moveTo(this.pos.x, this.pos.y);
                        var p2 = this.pos.add(this.vel);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                      }
                    }
                  ]);

                  return Particle;
                })();

                canvas = void 0;
                ctx = void 0;
                (w = void 0), (h = void 0);
                hue = void 0;
                particles = void 0;
                spikeLength = void 0;
                planets = void 0;
                A = void 0;
                B = void 0;
                a = void 0;
                b = void 0;
                tick = void 0;

                setup();
                draw();

              case 26:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function initAnti3D() {
    return _ref.apply(this, arguments);
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

import Vector from "../common/Vector.js";
import { delay } from "../common/promises.js";
import loadChecks from "../pages/view/pageLoadChecks.js";

export default initAnti3D;
