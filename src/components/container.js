function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function Container(element, x, y) {
  _classCallCheck(this, Container);

  this.elem = element;
  this.x = x;
  this.y = y;
};

export default Container;