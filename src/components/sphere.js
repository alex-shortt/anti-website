import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Container from "./container.js";
import { delay } from "../common/promises.js";
import loadChecks from "../pages/view/pageLoadChecks.js";

var Sphere = function () {
  function Sphere(xcells, ycells, skybox) {
    var _this = this;

    _classCallCheck(this, Sphere);

    this.sphere = $(".sphere");
    this.xcells = xcells;
    this.ycells = ycells;
    this.cells = new Array();
    this.skybox = skybox;
    this.currX = 0;
    this.currY = 0;
    this.spacing = "";
    $(window).on("resize", function () {
      return _this.resizeSphere();
    });
  }

  _createClass(Sphere, [{
    key: "zoomOut",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var sphere, x, y, x_angle, y_angle;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sphere = this.sphere;
                x = this.currX;
                y = this.currY;
                x_angle = x * (360 / this.xcells);
                y_angle = y * (360 / this.ycells);

                sphere.css("transition", "transform 0.5s");
                sphere.css("transform", "translate(-50%, -50%) translateZ(0) rotateY(" + x_angle + "deg) rotateX(" + y_angle + "deg)");

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function zoomOut() {
        return _ref.apply(this, arguments);
      }

      return zoomOut;
    }()
  }, {
    key: "zoomIn",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        var sphere, x, y, x_angle, y_angle;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sphere = this.sphere;
                x = this.currX;
                y = this.currY;
                x_angle = x * (360 / this.xcells);
                y_angle = y * (360 / this.ycells);

                sphere.css("transition", "transform 0.5s");
                sphere.css("transform", "translate(-50%, -50%) translateZ(" + this.spacing + ") rotateY(" + x_angle + "deg) rotateX(" + y_angle + "deg)");

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function zoomIn() {
        return _ref2.apply(this, arguments);
      }

      return zoomIn;
    }()
  }, {
    key: "loadContainers",
    value: function loadContainers() {
      var containers = $(".container");

      for (var i = 0; i < containers.length; i++) {
        var coord = $(containers[i]).attr("name");
        var x = coord.substring(0, 1);
        if (x == "-") {
          x = coord.substring(0, 2);
        }
        var y = coord.substring(x.length + 1);

        this.cells[i] = new Container($(containers[i]), x, y);
      }
    }
  }, {
    key: "initialOrient",
    value: function initialOrient() {
      var cells = this.cells;

      for (var i = 0; i < cells.length; i++) {
        var container = cells[i].elem;
        var x = cells[i].x;
        var y = cells[i].y;

        var x_angle = x * (360 / this.xcells);
        var y_angle = y * (360 / this.ycells);
        container.css("position", "absolute");
        container.css("transform", "rotateY(" + x_angle + "deg) rotateX(" + y_angle + "deg) translateZ(-" + this.spacing + ")");
      }

      this.sphere.css("transform", "translate(-50%, -50%) translateZ(" + this.spacing + ") rotateY(0) rotateX(0)");

      this.resizeSphere();
    }
  }, {
    key: "resizeSphere",
    value: function resizeSphere() {
      var vw = $(window).width();
      var vh = $(window).height();

      var spacing = 100;
      if (vw > 1000) spacing *= 2;else if (vw > 800) spacing *= 3.5;else if (vw > 650) spacing *= 4;else if (vw > 500) spacing *= 5;else spacing *= 6;

      this.spacing = spacing + "vw";

      var cells = this.cells;

      for (var i = 0; i < cells.length; i++) {
        var container = cells[i].elem;
        var x = cells[i].x;
        var y = cells[i].y;

        var x_angle = x * (360 / this.xcells);
        var y_angle = y * (360 / this.ycells);
        container.css("position", "absolute");
        container.css("transform", "rotateY(" + x_angle + "deg) rotateX(" + y_angle + "deg) translateZ(-" + this.spacing + ")");
      }

      var sphere = this.sphere;
      var x = this.currX;
      var y = this.currY;
      var x_angle = x * (360 / this.xcells);
      var y_angle = y * (360 / this.ycells);

      this.sphere.css("transform", "translate(-50%, -50%) translateZ(" + this.spacing + ") rotateY(" + x_angle + "deg) rotateX(" + y_angle + "deg)");
    }
  }, {
    key: "moveTo",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(x, y) {
        var sphere, skybox, x_angle, y_angle;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                sphere = this.sphere;
                skybox = this.skybox;
                x_angle = x * (360 / this.xcells);
                y_angle = y * (360 / this.ycells);
                _context3.next = 6;
                return delay(500);

              case 6:
                sphere.css("transition", "transform 1s");
                sphere.css("transform", "translate(-50%, -50%) translateZ(0) rotateY(" + x_angle + "deg) rotateX(" + y_angle + "deg)");
                skybox.rotate(x_angle, y_angle);
                sphere.currX = x;
                sphere.currY = y;
                _context3.next = 13;
                return delay(1000);

              case 13:
                _context3.next = 15;
                return this.zoomIn();

              case 15:
                if (this.currX == 0 && this.currY == 0) {
                  loadChecks.socialsLoad = false;
                  loadChecks.popupLoad = false;
                  loadChecks.contactLoad = false;
                  loadChecks.lookbookLoad = false;
                }

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function moveTo(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return moveTo;
    }()
  }]);

  return Sphere;
}();

export default Sphere;