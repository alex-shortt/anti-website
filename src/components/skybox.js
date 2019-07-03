var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Skybox = function () {
  function Skybox() {
    _classCallCheck(this, Skybox);

    this.box = $(".skybox");
    this.maxOffset = 50;
    this.box.addClass("active");
  }

  _createClass(Skybox, [{
    key: "rotate",
    value: function rotate(xAngle, yAngle) {
      var transform = "translate(-50%, -50%)";
      var xOffset = "translateX(" + xAngle / 90 * -1 * this.maxOffset + "vw)";
      var yOffset = "translateY(" + yAngle / 90 * this.maxOffset + "vh)";

      transform = transform + " " + xOffset + " " + yOffset;

      this.box.css("transform", transform);
    }
  }]);

  return Skybox;
}();

export default Skybox;