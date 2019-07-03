import _regeneratorRuntime from "babel-runtime/regenerator";

var getPostInfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(shortcode) {
    var response, data, info;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.get("https://instagram.com/p/" + shortcode + "/?__a=1");

          case 3:
            response = _context.sent;
            data = response.data.graphql.shortcode_media;
            info = {
              img: data.display_resources[0].src,
              caption: data.edge_media_to_caption.edges[0].node.text,
              url: "https://instagram.com/p/" + shortcode + "/"
            };
            return _context.abrupt("return", info);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);

            console.log("error ||", _context.t0);
            return _context.abrupt("return", null);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  return function getPostInfo(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import axios from "axios";

export default getPostInfo;