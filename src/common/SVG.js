"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SVG = function SVG(opt) {
	var target = null;
	var offset = 0;
	var px = -1;
	var py = -1;
	var iter = 0;
	var font = null;
	var cpuTime = 7;
	var polyline = [];
	var init = function init() {};
	var polylines = [];
	var matrixTransform = false;
	var autorun = function autorun() {
		if (typeof setup === "function") init = setup;
		init();
		if (typeof draw === "function") render();
	};
	///////////////////////////////////////////////////////////////////////
	var initSVG = function initSVG(opt) {
		console.log("test");
		if (opt.centerOrigin !== undefined && opt.centerOrigin === true) offset = 95;
		if (opt.cpuTime !== undefined) cpuTime = opt.cpuTime;
		var svgElem = $(opt.selector || 'svg').get(0);
		svgElem.setAttribute("viewBox", opt.viewBox || "60 50 90 80");
		svgElem.setAttribute("width", "100%");
		svgElem.setAttribute("height", "100%");
		svgElem.setAttribute("style", "background-color:none"); //${opt.background || "#fff"}
		svgElem.setAttribute("viewport-fill", opt.background || "#fff");
		var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.setAttribute("style", "fill:none ;stroke:none"); //${opt.background || "#fff"}
		rect.setAttribute("fill", "none"); //opt.background || "#fff"
		rect.setAttribute("stroke", "none");
		rect.setAttribute("x", 5);
		rect.setAttribute("y", 5);
		rect.setAttribute("width", 190);
		rect.setAttribute("height", 190);
		svgElem.appendChild(rect);
		var inside = document.createElementNS("http://www.w3.org/2000/svg", "g");
		inside.setAttribute("stroke-linejoin", "round");
		inside.setAttribute("style", "fill:none;stroke:" + (opt.stroke || "#000") + ";stroke-width:" + (opt.strokeWidth || 0.2) + ";opacity:" + (opt.opacity || 1));
		svgElem.appendChild(inside);
		target = inside;
		var outside = document.createElementNS("http://www.w3.org/2000/svg", "g");
		outside.setAttribute("style", "fill:none;stroke:" + (opt.stroke || "#000") + ";stroke-width:0.3;");
		svgElem.appendChild(outside);
		var save = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		save.setAttribute("x", 5);
		save.setAttribute("y", 194);
		save.setAttribute("width", 28);
		save.setAttribute("height", 6);
		save.setAttribute("style", "fill:" + (opt.background || "#fff") + ";stroke:none;opacity: 0");
		svgElem.appendChild(save);
		var saveText = document.createElementNS("http://www.w3.org/2000/svg", "g");
		saveText.setAttribute("style", "fill:none;stroke:" + (opt.stroke || "#000") + ";stroke-width:0.3;opacity:1");
		svgElem.appendChild(saveText);
		["click", "touchdown"].forEach(function (event) {
			svgElem.addEventListener(event, function (e) {
				px = -1;
				py = -1;
				if (iter === 0 && init !== null) start();
			}, false);
		});
		["click", "touchdown"].forEach(function (event) {
			save.addEventListener(event, function (e) {
				if (saveText.innerHTML === "") return;
				e.stopPropagation();
				saveSVG();
			}, false);
		});
		requestAnimationFrame(autorun);
		return [svgElem, inside, outside, saveText];
	};

	var _initSVG = initSVG(opt),
	    _initSVG2 = _slicedToArray(_initSVG, 4),
	    svgElem = _initSVG2[0],
	    inside = _initSVG2[1],
	    outside = _initSVG2[2],
	    saveText = _initSVG2[3];
	///////////////////////////////////////////////////////////////////////////


	var start = function start() {
		matrixTransform = false;
		matrix.data = [1, 0, 0, 1, 0, 0];
		matrix.stack.length = 0;
		polyline = [];
		polylines.length = 0;
		inside.innerHTML = "";
		outside.innerHTML = "";
		saveText.innerHTML = "";
		init();
		if (typeof draw === "function") render();
	};
	var moveTo = function moveTo(x0, y0) {
		var x = void 0,
		    y = void 0;
		if (Array.isArray(x0)) {
			y = x0[1];
			x = x0[0];
		} else {
			x = x0;
			y = y0;
		}
		if (matrixTransform === true) {
			matrix.transform(x, y);
		} else {
			px = x;
			py = y;
		}
		if (polyline.length > 0) polylineSVG(true);
		polyline.push(px, py);
	};
	var lineTo = function lineTo(x0, y0) {
		var x = void 0,
		    y = void 0;
		if (Array.isArray(x0)) {
			y = x0[1];
			x = x0[0];
		} else {
			x = x0;
			y = y0;
		}
		if (matrixTransform === true) {
			matrix.transform(x, y);
		} else {
			px = x;
			py = y;
		}
		if (py === polyline[polyline.length - 1] && py === polyline[polyline.length - 3]) polyline[polyline.length - 2] = px;else if (px === polyline[polyline.length - 2] && px === polyline[polyline.length - 4]) polyline[polyline.length - 1] = py;else polyline.push(px, py);
	};
	var _line = function _line(x0, y0, x1, y1) {
		if (x0 !== px || y0 !== py) moveTo(x0, y0);
		lineTo(x1, y1);
	};
	var _rect = function _rect(x0, y0, w0, h0) {
		moveTo(x0, y0);
		lineTo(x0 + w0, y0);
		lineTo(x0 + w0, y0 + h0);
		lineTo(x0, y0 + h0);
		lineTo(x0, y0);
	};
	var _fillRect = function _fillRect(x0, y0, w0, h0) {
		var s = opt.strokeWidth || 0.2;
		for (var x = x0; x <= x0 + w0; x += s) {
			moveTo(x, y0);
			lineTo(x, y0 + h0);
		}
	};
	var quadraticCurveTo = function quadraticCurveTo(cx, cy, x1, y1) {
		var steps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;

		var s = 1 / steps;
		var x0 = px;
		var y0 = py;
		for (var t = 0; t < 1; t += s) {
			lineTo((1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1);
		}
		lineTo(x1, y1);
	};
	var ellipse = function ellipse(x, y, w) {
		var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : w;
		var start = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
		var end = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2 * Math.PI;

		var steps = Math.PI / 36;
		moveTo(x + Math.cos(start) * w * 0.5, y);
		for (var a = start + steps; a <= end; a += steps) {
			lineTo(x + Math.cos(a) * w * 0.5, y - Math.sin(a) * h * 0.5);
		}
	};
	var canvas = function canvas(w, h) {
		var canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		return canvas;
	};
	////////////////////////////////////////////////////////////////
	// https://turtletoy.net/turtle/25b7bc4d43
	// Reinder's occlusion code parts from "Cubic space division #2"
	////////////////////////////////////////////////////////////////
	var Polygons = function () {
		function Polygons() {
			_classCallCheck(this, Polygons);

			this.list = [];
		}

		_createClass(Polygons, [{
			key: "draw",
			value: function draw(p) {
				var vis = true;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var p1 = _step.value;

						// AABB overlapping test - still O(N2) but very fast
						if (Math.abs(p1.aabb[0] - p.aabb[0]) - (p.aabb[2] + p1.aabb[2]) < 0 && Math.abs(p1.aabb[1] - p.aabb[1]) - (p.aabb[3] + p1.aabb[3]) < 0) {
							if (p.boolean(p1) === false) {
								vis = false;
								break;
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				if (vis === true) {
					p.draw();
					this.list.push(p);
				}
			}
		}, {
			key: "create",
			value: function create() {
				return new Polygon();
			}
		}, {
			key: "clear",
			value: function clear() {
				this.list.length = 0;
			}
		}]);

		return Polygons;
	}();
	var Polygon = function () {
		function Polygon() {
			_classCallCheck(this, Polygon);

			this.cp = [];
			this.dp = [];
			this.aabb = [];
		}

		_createClass(Polygon, [{
			key: "addPoints",
			value: function addPoints() {
				for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
					points[_key] = arguments[_key];
				}

				for (var i = 0; i < points.length; i++) {
					this.cp.push(points[i]);
				}this.aabb = this.AABB();
			}
		}, {
			key: "addOutline",
			value: function addOutline() {
				var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
				var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.cp.length;

				var len = this.cp.length;
				for (var i = s; i < e; i++) {
					this.dp.push(this.cp[i], this.cp[(i + 1) % len]);
				}
			}
		}, {
			key: "draw",
			value: function draw() {
				if (this.dp.length === 0) return;
				for (var i = 0, l = this.dp.length; i < l; i += 2) {
					var d0 = this.dp[i];
					var d1 = this.dp[i + 1];
					moveTo(d0[0], d0[1]);
					lineTo(d1[0], d1[1]);
				}
			}
		}, {
			key: "AABB",
			value: function AABB() {
				var xmin = 2000;
				var xmax = -2000;
				var ymin = 2000;
				var ymax = -2000;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.cp[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var cp = _step2.value;

						var x = cp[0];
						var y = cp[1];
						if (x < xmin) xmin = x;
						if (x > xmax) xmax = x;
						if (y < ymin) ymin = y;
						if (y > ymax) ymax = y;
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				return [(xmin + xmax) * 0.5, (ymin + ymax) * 0.5, (xmax - xmin) * 0.5, (ymax - ymin) * 0.5];
			}
		}, {
			key: "addHatching",
			value: function addHatching(a, d) {
				var tp = new Polygon();
				var x = this.aabb[0],
				    y = this.aabb[1];
				var w = this.aabb[2],
				    h = this.aabb[3];
				var l = Math.sqrt(Math.pow(w * 2, 2) + Math.pow(h * 2, 2)) * 0.5;
				tp.cp.push([x - w, y - h], [x + w, y - h], [x + w, y + h], [x - w, y + h]);
				var cx = Math.sin(a) * l,
				    cy = Math.cos(a) * l;
				var px = x - Math.cos(a) * l;
				var py = y - Math.sin(a) * l;
				for (var i = 0; i < l * 2; i += d) {
					tp.dp.push([px + cx, py - cy], [px - cx, py + cy]);
					px += Math.cos(a) * d;
					py += Math.sin(a) * d;
				}
				tp.boolean(this, 1);
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = tp.dp[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var dp = _step3.value;
						this.dp.push(dp);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}, {
			key: "inside",
			value: function inside(p) {
				var int = 0;
				var px = p[0];
				var py = p[1];
				for (var i = 0, l = this.cp.length; i < l; i++) {
					if (Math.pow(px - this.cp[i][0], 2) + Math.pow(py - this.cp[i][1], 2) <= 0.01) return 0;
					if (Polygon.intersect([], p, [0.1, -1000], this.cp[i], this.cp[(i + 1) % l]) === true) int++;
				}
				return int & 1;
			}
		}, {
			key: "boolean",
			value: function boolean(p) {
				var diff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				var ndp = [],
				    pint = [0, 0];
				for (var i = 0, l = this.dp.length; i < l; i += 2) {
					var ls0 = this.dp[i];
					var ls1 = this.dp[i + 1];
					var int = [];
					for (var j = 0, cl = p.cp.length; j < cl; j++) {
						if (Polygon.intersect(pint, ls0, ls1, p.cp[j], p.cp[(j + 1) % cl]) === true) int.push([pint[0], pint[1]]);
					}
					if (int.length === 0) {
						if (diff === p.inside(ls0)) ndp.push(ls0, ls1);
					} else {
						int.push(ls0, ls1);
						var cx = ls1[0] - ls0[0];
						var cy = ls1[1] - ls0[1];
						for (var _i = 0, len = int.length; _i < len; _i++) {
							var _j = _i;
							var item = int[_j];
							for (var db = (item[0] - ls0[0]) * cx + (item[1] - ls0[1]) * cy; _j > 0 && (int[_j - 1][0] - ls0[0]) * cx + (int[_j - 1][1] - ls0[1]) * cy < db; _j--) {
								int[_j] = int[_j - 1];
							}int[_j] = item;
						}
						for (var _j2 = 0; _j2 < int.length - 1; _j2++) {
							if (Math.pow(int[_j2][0] - int[_j2 + 1][0], 2) + Math.pow(int[_j2][1] - int[_j2 + 1][1], 2) >= 0.01) {
								if (diff === p.inside([(int[_j2][0] + int[_j2 + 1][0]) / 2, (int[_j2][1] + int[_j2 + 1][1]) / 2])) ndp.push(int[_j2], int[_j2 + 1]);
							}
						}
					}
				}
				this.dp = ndp;
				return this.dp.length > 0;
			}
			// port of http://paulbourke.net/geometry/pointlineplane/Helpers.cs

		}], [{
			key: "intersect",
			value: function intersect(pint, a, b, c, d) {
				var e = (d[1] - c[1]) * (b[0] - a[0]) - (d[0] - c[0]) * (b[1] - a[1]);
				if (e === 0) return false;
				var ua = ((d[0] - c[0]) * (a[1] - c[1]) - (d[1] - c[1]) * (a[0] - c[0])) / e;
				var ub = ((b[0] - a[0]) * (a[1] - c[1]) - (b[1] - a[1]) * (a[0] - c[0])) / e;
				if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
					pint[0] = a[0] + ua * (b[0] - a[0]);
					pint[1] = a[1] + ua * (b[1] - a[1]);
					return true;
				}
				return false;
			}
		}]);

		return Polygon;
	}();
	/////////////////////////////////////////////////////////////////////////////
	// adapted from https://turtletoy.net/js/turtlesvg.js
	var clip = function clip(polyline, left, size) {
		var pint = [0, 0];
		var clip = [left, left, left, size, size, size, size, left, left, left];
		var nps = [];
		var np = [];
		var pcx = polyline[0];
		var pcy = polyline[1];
		var inside = pcx > left && pcx < size && pcy > left && pcy < size;
		if (inside === true) np.push(pcx, pcy);
		for (var j = 0; j < polyline.length; j += 2) {
			var cx = polyline[j];
			var cy = polyline[j + 1];
			if (cx === pcx && cy === pcy && j < polyline.length - 2) continue;
			if (cx > left && cx < size && cy > left && cy < size) {
				if (inside) np.push(cx, cy);else {
					for (var i = 0; i < 8; i += 2) {
						if (Polygon.intersect(pint, [pcx, pcy], [cx, cy], [clip[i], clip[i + 1]], [clip[i + 2], clip[i + 3]]) === true) break;
					}
					np.push(pint[0], pint[1], cx, cy);
				}
				inside = true;
			} else {
				if (inside) {
					for (var _i2 = 0; _i2 < 8; _i2 += 2) {
						if (Polygon.intersect(pint, [pcx, pcy], [cx, cy], [clip[_i2], clip[_i2 + 1]], [clip[_i2 + 2], clip[_i2 + 3]]) === true) break;
					}
					np.push(pint[0], pint[1]);
					nps.push(np);
					np = [];
				} else {
					var ips = [];
					for (var _i3 = 0; _i3 < 8; _i3 += 2) {
						if (Polygon.intersect(pint, [pcx, pcy], [cx, cy], [clip[_i3], clip[_i3 + 1]], [clip[_i3 + 2], clip[_i3 + 3]]) === true) ips.push(pint[0], pint[1]);
					}
					if (ips.length === 4) nps.push(ips);
				}
				inside = false;
			}
			pcx = cx;
			pcy = cy;
		}
		if (np.length > 0) nps.push(np);
		return nps;
	};
	var polylineSVG = function polylineSVG() {
		var reduce = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		if (polyline.length <= 2) {
			polyline = [];
			return;
		}
		var points = reduce ? polyline.map(function (n) {
			return n * 0.95 + offset + 5;
		}) : polyline;
		var clippedPaths = target === inside ? clip(points, 5, 195) : [points];
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = clippedPaths[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var _points = _step4.value;

				var poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
				var svgPoints = _points.map(function (n) {
					return +n.toFixed(2);
				});
				poly.setAttribute("points", svgPoints.toString());
				target.appendChild(poly);
				if (target === inside) polylines.push(_points);
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}

		polyline = [];
	};
	var render = function render() {
		var start = performance.now();
		var run = void 0;
		do {
			run = draw(iter++);
		} while (run === true && performance.now() - start < cpuTime);
		if (run === true) requestAnimationFrame(render);else {
			moveTo(px, py);
			iter = 0;
			matrixTransform = false;
			target = outside;
			target.innerHTML = "";
			polyline = [];
			var d = new Date();
			var ds = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + ". " + (opt.author || "");
			var t = (opt.name || "CodePen") + ". " + ds;
			var w = textSize(t, 0.75);
			text(t, 199 - w, 204.4, 0.75);
			target = saveText;
			text("<Save SVG>", 0, 204.4, 0.75);
			target = inside;
		}
	};
	////////////////////////////////////////////////////////////////////////////
	// based on https://github.com/Evelios/optimize-path
	var optimizePath = function optimizePath(lines, penWidth) {
		if (lines.length === 0) return [];
		var pws = Math.pow(penWidth, 2);
		var frontier = lines.slice(0);
		var cNode = frontier.pop();
		var explored = [cNode];
		while (frontier.length !== 0) {
			var reversed = false;
			var pathIndex = -1;
			var closestDist = Infinity;
			var dist = Infinity;
			var cEndX = cNode[cNode.length - 2];
			var cEndY = cNode[cNode.length - 1];
			// Get the path that is closest to the current node
			for (var index = 0; index < frontier.length; index++) {
				var path = frontier[index];
				// Regular Orientation
				dist = Math.pow(cEndX - path[0], 2) + Math.pow(cEndY - path[1], 2);
				if (dist < closestDist) {
					reversed = false;
					pathIndex = index;
					closestDist = dist;
				}
				// Reversed Orientation
				dist = Math.pow(cEndX - path[path.length - 2], 2) + Math.pow(cEndY - path[path.length - 1], 2);
				if (dist < closestDist) {
					reversed = true;
					pathIndex = index;
					closestDist = dist;
				}
			}
			// Add the closest path to the explored list and remove it from the frontier
			cNode = frontier[pathIndex];
			frontier.splice(pathIndex, 1);
			if (reversed) {
				var new_node = [];
				for (var i = cNode.length - 2; i >= 0; i -= 2) {
					new_node.push(cNode[i]);
					new_node.push(cNode[i + 1]);
				}
				cNode = new_node;
			}
			// If the paths are closer than the pen width, them combine them
			if (closestDist < pws) {
				explored[explored.length - 1] = explored[explored.length - 1].concat(cNode);
			} else {
				explored.push(cNode);
			}
		}
		return explored;
	};
	var saveSVG = function saveSVG() {
		var newlines = optimizePath(polylines, opt.strokeWidth || 0.2);
		polyline = [];
		polylines.length = 0;
		inside.innerHTML = "";
		saveText.innerHTML = "";
		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = newlines[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var newLine = _step5.value;

				polyline = newLine;
				polylineSVG();
			}
		} catch (err) {
			_didIteratorError5 = true;
			_iteratorError5 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion5 && _iterator5.return) {
					_iterator5.return();
				}
			} finally {
				if (_didIteratorError5) {
					throw _iteratorError5;
				}
			}
		}

		saveFile(svgElem, (opt.name || "codepen") + ".svg");
	};
	var saveFile = function saveFile(svgEl, name) {
		svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		var svgData = svgEl.outerHTML;
		var preface = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\r\n';
		var svgBlob = new Blob([preface, svgData], {
			type: "image/svg+xml;charset=utf-8"
		});
		var svgUrl = URL.createObjectURL(svgBlob);
		var downloadLink = document.createElement("a");
		downloadLink.href = svgUrl;
		downloadLink.download = name;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};
	//////////////////////////////////////////////////////
	var ContextFree = function () {
		function ContextFree() {
			var _this = this;

			_classCallCheck(this, ContextFree);

			this.minSize = 0.02;
			this.polygons = null;
			this.polygon = {};
			this.polygon.rect = function (m) {
				var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
				return _this.polyRect(m, a, s);
			};
			this.init();
		}

		_createClass(ContextFree, [{
			key: "init",
			value: function init() {
				this.shapes = [];
				this.zoom = 1;
				this.ox = 0;
				this.oy = 0;
				this.box = [0, 0, 0, 0];
				if (this.polygons !== null) this.polygons.clear();
			}
		}, {
			key: "matrix",
			value: function matrix() {
				return new Mat2D([1, 0, 0, -1, 0, 0]);
			}
		}, {
			key: "boundingBox",
			value: function boundingBox(m) {
				var p0 = this.transform(0, 0, m.m);
				var p1 = this.transform(0.5, 0, m.m);
				var p2 = this.transform(0.5, 0.5, m.m);
				var p3 = this.transform(0, 0.5, m.m);
				var minx = Math.min(p0[0], p1[0], p2[0], p3[0]);
				var maxx = Math.max(p0[0], p1[0], p2[0], p3[0]);
				var miny = Math.min(p0[1], p1[1], p2[1], p3[1]);
				var maxy = Math.max(p0[1], p1[1], p2[1], p3[1]);
				if (minx < this.box[0]) this.box[0] = minx;else if (maxx > this.box[2]) this.box[2] = maxx;
				if (miny < this.box[1]) this.box[1] = miny;else if (maxy > this.box[3]) this.box[3] = maxy;
			}
		}, {
			key: "fillCircle",
			value: function fillCircle(m) {
				this.boundingBox(m);
				m.type = 0;
				this.shapes.push(m);
			}
		}, {
			key: "circle",
			value: function circle(m) {
				this.boundingBox(m);
				m.type = 4;
				this.shapes.push(m);
			}
		}, {
			key: "fillRect",
			value: function fillRect(m) {
				this.boundingBox(m);
				m.type = 2;
				this.shapes.push(m);
			}
		}, {
			key: "rect",
			value: function rect(m) {
				this.boundingBox(m);
				m.type = 1;
				this.shapes.push(m);
			}
		}, {
			key: "line",
			value: function line(m) {
				this.boundingBox(m);
				m.type = 3;
				this.shapes.push(m);
			}
		}, {
			key: "polyRect",
			value: function polyRect(m) {
				var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

				this.boundingBox(m);
				m.type = 11;
				m.a = a;
				m.s = s;
				this.shapes.push(m);
			}
		}, {
			key: "draw",
			value: function draw(shape) {
				var d = void 0,
				    s = void 0;
				switch (shape.type) {
					case 0:
						// fillCircle
						s = 0.2 / shape.size();
						moveTo(this.transform(0.5, 0, shape.m));
						d = 1;
						for (var a = 0; a < Math.PI; a += s) {
							lineTo(this.transform(0.5 * Math.cos(a) * d, 0.5 * Math.sin(a) * d, shape.m));
							lineTo(this.transform(-0.5 * Math.cos(a) * d, -0.5 * Math.sin(a) * d, shape.m));
							d = -d;
						}
						break;
					case 1:
						// strokeRect
						moveTo(this.transform(-0.5, -0.5, shape.m));
						lineTo(this.transform(0.5, -0.5, shape.m));
						lineTo(this.transform(0.5, 0.5, shape.m));
						lineTo(this.transform(-0.5, 0.5, shape.m));
						lineTo(this.transform(-0.5, -0.5, shape.m));
						break;
					case 2:
						// fillRect
						moveTo(this.transform(-0.5, -0.5, shape.m));
						d = 1;
						s = 0.08 / shape.size();
						for (var y = -0.5; y <= 0.5; y += s) {
							lineTo(this.transform(-0.5 * d, y, shape.m));
							lineTo(this.transform(0.5 * d, y, shape.m));
							d = -d;
						}
						break;
					case 3:
						// line
						moveTo(this.transform(-0.5, 0, shape.m));
						lineTo(this.transform(0.5, 0, shape.m));
						break;
					case 4:
						// circle
						s = 0.1 / shape.size();
						moveTo(this.transform(0.5, 0, shape.m));
						for (var _a = 0; _a < 2 * Math.PI + s; _a += s) {
							lineTo(this.transform(0.5 * Math.cos(_a), 0.5 * Math.sin(_a), shape.m));
						}
						break;
					case 11:
						// polygon rectangle
						if (this.polygons === null) this.polygons = new Polygons();
						var p = this.polygons.create();
						var p0 = this.transform(-0.5, -0.5, shape.m);
						var p1 = this.transform(0.5, -0.5, shape.m);
						var p2 = this.transform(0.5, 0.5, shape.m);
						var p3 = this.transform(-0.5, 0.5, shape.m);
						p.addPoints(p0, p1, p2, p3);
						p.addOutline(0);
						if (shape.s !== 0) {
							if (shape.a === -1) {
								shape.a = Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
							}
							p.addHatching(shape.a, shape.s);
						}
						this.polygons.draw(p);
						break;
				}
			}
		}, {
			key: "scale",
			value: function scale() {
				var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.95;

				this.zoom = Math.min(margin * 200 / (this.box[2] - this.box[0]), margin * 200 / (this.box[3] - this.box[1]));
				this.ox = (this.box[0] + this.box[2]) * 0.5 * this.zoom;
				this.oy = (this.box[3] + this.box[1]) * 0.5 * this.zoom;
			}
		}, {
			key: "transform",
			value: function transform(x, y, m) {
				var m0 = m[0] * this.zoom;
				var m1 = m[1] * this.zoom;
				var m2 = m[2] * this.zoom;
				var m3 = m[3] * this.zoom;
				var m4 = m[4] * this.zoom - this.ox;
				var m5 = m[5] * this.zoom - this.oy;
				return [m0 * x + m2 * y + m4, m1 * x + m3 * y + m5];
			}
		}]);

		return ContextFree;
	}();
	var Mat2D = function () {
		function Mat2D(m) {
			_classCallCheck(this, Mat2D);

			this.m = m;
			this.type = 0;
			this.a = 0;
			this.s = 0;
		}

		_createClass(Mat2D, [{
			key: "rotate",
			value: function rotate(v) {
				var rad = Math.PI * v / 180;
				var cos = Math.cos(rad);
				var sin = Math.sin(rad);
				return new Mat2D([cos * this.m[0] + sin * this.m[2], cos * this.m[1] + sin * this.m[3], cos * this.m[2] - sin * this.m[0], cos * this.m[3] - sin * this.m[1], this.m[4], this.m[5]]);
			}
		}, {
			key: "translate",
			value: function translate(x) {
				var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

				return new Mat2D([this.m[0], this.m[1], this.m[2], this.m[3], this.m[4] + x * this.m[0] + y * this.m[2], this.m[5] + x * this.m[1] + y * this.m[3]]);
			}
		}, {
			key: "scale",
			value: function scale() {
				var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
				var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

				return new Mat2D([this.m[0] * x, this.m[1] * x, this.m[2] * y, this.m[3] * y, this.m[4], this.m[5]]);
			}
		}, {
			key: "flip",
			value: function flip(v) {
				var rad = Math.PI * v / 180;
				var x = Math.cos(rad);
				var y = Math.sin(rad);
				var n = 1 / (x * x + y * y);
				var b00 = (x * x - y * y) / n;
				var b01 = 2 * x * y / n;
				var b10 = 2 * x * y / n;
				var b11 = (y * y - x * x) / n;
				return new Mat2D([b00 * this.m[0] + b01 * this.m[2], b00 * this.m[1] + b01 * this.m[3], b10 * this.m[0] + b11 * this.m[2], b10 * this.m[1] + b11 * this.m[3], this.m[4], this.m[5]]);
			}
		}, {
			key: "size",
			value: function size() {
				var x = this.m[0] * this.m[0] + this.m[1] * this.m[1];
				var y = this.m[2] * this.m[2] + this.m[3] * this.m[3];
				return Math.sqrt(Math.max(x, y));
			}
		}]);

		return Mat2D;
	}();
	///////////////////////////////////////////////////////////////////////////
	var matrix = {
		data: [1, 0, 0, 1, 0, 0],
		stack: [],
		transform: function transform(x, y) {
			var m = this.data;
			px = m[0] * x + m[2] * y + m[4];
			py = m[1] * x + m[3] * y + m[5];
		},
		rotate: function rotate(v) {
			var m = this.data;
			matrixTransform = true;
			var cos = Math.cos(v);
			var sin = Math.sin(v);
			var r00 = cos * m[0] + sin * m[2];
			var r01 = cos * m[1] + sin * m[3];
			m[2] = cos * m[2] - sin * m[0];
			m[3] = cos * m[3] - sin * m[1];
			m[0] = r00;
			m[1] = r01;
			return this;
		},
		translate: function translate(x) {
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var m = this.data;
			matrixTransform = true;
			m[4] += x * m[0] + y * m[2];
			m[5] += x * m[1] + y * m[3];
			return this;
		},
		scale: function scale() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

			var m = this.data;
			matrixTransform = true;
			m[0] *= x;
			m[1] *= x;
			m[2] *= y;
			m[3] *= y;
			return this;
		},
		push: function push() {
			var m = this.data;
			this.stack.push([m[0], m[1], m[2], m[3], m[4], m[5]]);
			return this;
		},
		pop: function pop() {
			this.data = this.stack.pop();
			return this;
		}
	};
	//////////////////////////////////////////////////////
	// http://mrl.nyu.edu/~perlin/noise/
	var Perlin = function () {
		function Perlin(setup) {
			_classCallCheck(this, Perlin);

			this.p = new Uint8Array(512);
			this.octaves = setup.octaves || 1;
			this.init();
		}

		_createClass(Perlin, [{
			key: "init",
			value: function init() {
				var p = new Uint8Array(256);
				for (var i = 0; i < 256; i++) {
					p[i] = i;
				}for (var _i4 = 255; _i4 > 0; _i4--) {
					var n = Math.floor((_i4 + 1) * Math.random());
					var q = p[_i4];
					p[_i4] = p[n];
					p[n] = q;
				}
				for (var _i5 = 0; _i5 < 512; _i5++) {
					this.p[_i5] = p[_i5 & 255];
				}
			}
		}, {
			key: "lerp",
			value: function lerp(t, a, b) {
				return a + t * (b - a);
			}
		}, {
			key: "grad2d",
			value: function grad2d(i, x, y) {
				var v = (i & 1) === 0 ? x : y;
				return (i & 2) === 0 ? -v : v;
			}
		}, {
			key: "noise2d",
			value: function noise2d(x2d, y2d) {
				var X = Math.floor(x2d) & 255;
				var Y = Math.floor(y2d) & 255;
				var x = x2d - Math.floor(x2d);
				var y = y2d - Math.floor(y2d);
				var fx = (3 - 2 * x) * x * x;
				var fy = (3 - 2 * y) * y * y;
				var p0 = this.p[X] + Y;
				var p1 = this.p[X + 1] + Y;
				return this.lerp(fy, this.lerp(fx, this.grad2d(this.p[p0], x, y), this.grad2d(this.p[p1], x - 1, y)), this.lerp(fx, this.grad2d(this.p[p0 + 1], x, y - 1), this.grad2d(this.p[p1 + 1], x - 1, y - 1)));
			}
		}, {
			key: "noise",
			value: function noise(x, y) {
				var e = 1,
				    k = 1,
				    s = 0;
				for (var i = 0; i < this.octaves; ++i) {
					e *= 0.5;
					s += e * (1 + this.noise2d(k * x, k * y)) / 2;
					k *= 2;
				}
				return s;
			}
		}]);

		return Perlin;
	}();
	// https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.js
	var Simplex = function () {
		function Simplex(setup) {
			_classCallCheck(this, Simplex);

			this.octaves = setup.octaves || 1;
			this.F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
			this.G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
			this.p = new Uint8Array(256);
			this.grad3 = new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]);
			this.init();
		}

		_createClass(Simplex, [{
			key: "init",
			value: function init() {
				for (var i = 0; i < 256; i++) {
					this.p[i] = i;
				}for (var _i6 = 0; _i6 < 255; _i6++) {
					var r = _i6 + ~~(Math.random() * (256 - _i6));
					var aux = this.p[_i6];
					this.p[_i6] = this.p[r];
					this.p[r] = aux;
				}
				this.perm = new Uint8Array(512);
				this.permMod12 = new Uint8Array(512);
				for (var _i7 = 0; _i7 < 512; _i7++) {
					this.perm[_i7] = this.p[_i7 & 255];
					this.permMod12[_i7] = this.perm[_i7] % 12;
				}
			}
		}, {
			key: "noise2D",
			value: function noise2D(xin, yin) {
				var n0 = 0,
				    n1 = 0,
				    n2 = 0;
				var s = (xin + yin) * this.F2;
				var i = Math.floor(xin + s);
				var j = Math.floor(yin + s);
				var t = (i + j) * this.G2;
				var X0 = i - t;
				var Y0 = j - t;
				var x0 = xin - X0;
				var y0 = yin - Y0;
				var i1 = x0 > y0 ? 1 : 0;
				var j1 = x0 > y0 ? 0 : 1;
				var x1 = x0 - i1 + this.G2;
				var y1 = y0 - j1 + this.G2;
				var x2 = x0 - 1.0 + 2.0 * this.G2;
				var y2 = y0 - 1.0 + 2.0 * this.G2;
				var ii = i & 255;
				var jj = j & 255;
				var t0 = 0.5 - x0 * x0 - y0 * y0;
				if (t0 >= 0) {
					var gi0 = this.permMod12[ii + this.perm[jj]] * 3;
					t0 *= t0;
					n0 = t0 * t0 * (this.grad3[gi0] * x0 + this.grad3[gi0 + 1] * y0);
				}
				var t1 = 0.5 - x1 * x1 - y1 * y1;
				if (t1 >= 0) {
					var gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]] * 3;
					t1 *= t1;
					n1 = t1 * t1 * (this.grad3[gi1] * x1 + this.grad3[gi1 + 1] * y1);
				}
				var t2 = 0.5 - x2 * x2 - y2 * y2;
				if (t2 >= 0) {
					var gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]] * 3;
					t2 *= t2;
					n2 = t2 * t2 * (this.grad3[gi2] * x2 + this.grad3[gi2 + 1] * y2);
				}
				return 70.0 * (n0 + n1 + n2);
			}
		}, {
			key: "noise",
			value: function noise(x, y) {
				var e = 1,
				    k = 1,
				    s = 0;
				for (var i = 0; i < this.octaves; ++i) {
					e *= 0.5;
					s += e * (1 + this.noise2D(k * x, k * y)) / 2;
					k *= 2;
				}
				return s;
			}
		}]);

		return Simplex;
	}();
	//////////////////////////////////////////////////////
	// http://paulbourke.net/dataformats/hershey/
	var initFont = function initFont() {
		return [[16], [10, 5, 21, 5, 7, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2], [16, 4, 21, 4, 14, -1, -1, 12, 21, 12, 14], [21, 11, 25, 4, -7, -1, -1, 17, 25, 10, -7, -1, -1, 4, 12, 18, 12, -1, -1, 3, 6, 17, 6], [20, 8, 25, 8, -4, -1, -1, 12, 25, 12, -4, -1, -1, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3], [24, 21, 21, 3, 0, -1, -1, 8, 21, 10, 19, 10, 17, 9, 15, 7, 14, 5, 14, 3, 16, 3, 18, 4, 20, 6, 21, 8, 21, 10, 20, 13, 19, 16, 19, 19, 20, 21, 21, -1, -1, 17, 7, 15, 6, 14, 4, 14, 2, 16, 0, 18, 0, 20, 1, 21, 3, 21, 5, 19, 7, 17, 7], [26, 23, 12, 23, 13, 22, 14, 21, 14, 20, 13, 19, 11, 17, 6, 15, 3, 13, 1, 11, 0, 7, 0, 5, 1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9, 12, 13, 13, 14, 14, 16, 14, 18, 13, 20, 11, 21, 9, 20, 8, 18, 8, 16, 9, 13, 11, 10, 16, 3, 18, 1, 20, 0, 22, 0, 23, 1, 23, 2], [10, 5, 19, 4, 20, 5, 21, 6, 20, 6, 18, 5, 16, 4, 15], [14, 11, 25, 9, 23, 7, 20, 5, 16, 4, 11, 4, 7, 5, 2, 7, -2, 9, -5, 11, -7], [14, 3, 25, 5, 23, 7, 20, 9, 16, 10, 11, 10, 7, 9, 2, 7, -2, 5, -5, 3, -7], [16, 8, 21, 8, 9, -1, -1, 3, 18, 13, 12, -1, -1, 13, 18, 3, 12], [26, 13, 18, 13, 0, -1, -1, 4, 9, 22, 9], [10, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4], [26, 4, 9, 22, 9], [10, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2], [22, 20, 25, 2, -7], [20, 9, 21, 6, 20, 4, 17, 3, 12, 3, 9, 4, 4, 6, 1, 9, 0, 11, 0, 14, 1, 16, 4, 17, 9, 17, 12, 16, 17, 14, 20, 11, 21, 9, 21], [20, 6, 17, 8, 18, 11, 21, 11, 0], [20, 4, 16, 4, 17, 5, 19, 6, 20, 8, 21, 12, 21, 14, 20, 15, 19, 16, 17, 16, 15, 15, 13, 13, 10, 3, 0, 17, 0], [20, 5, 21, 16, 21, 10, 13, 13, 13, 15, 12, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4], [20, 13, 21, 3, 7, 18, 7, -1, -1, 13, 21, 13, 0], [20, 15, 21, 5, 21, 4, 12, 5, 13, 8, 14, 11, 14, 14, 13, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4], [20, 16, 18, 15, 20, 12, 21, 10, 21, 7, 20, 5, 17, 4, 12, 4, 7, 5, 3, 7, 1, 10, 0, 11, 0, 14, 1, 16, 3, 17, 6, 17, 7, 16, 10, 14, 12, 11, 13, 10, 13, 7, 12, 5, 10, 4, 7], [20, 17, 21, 7, 0, -1, -1, 3, 21, 17, 21], [20, 8, 21, 5, 20, 4, 18, 4, 16, 5, 14, 7, 13, 11, 12, 14, 11, 16, 9, 17, 7, 17, 4, 16, 2, 15, 1, 12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6, 11, 9, 12, 13, 13, 15, 14, 16, 16, 16, 18, 15, 20, 12, 21, 8, 21], [20, 16, 14, 15, 11, 13, 9, 10, 8, 9, 8, 6, 9, 4, 11, 3, 14, 3, 15, 4, 18, 6, 20, 9, 21, 10, 21, 13, 20, 15, 18, 16, 14, 16, 9, 15, 4, 13, 1, 10, 0, 8, 0, 5, 1, 4, 3], [10, 5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2], [10, 5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4], [24, 20, 18, 4, 9, 20, 0], [26, 4, 12, 22, 12, -1, -1, 4, 6, 22, 6], [24, 4, 18, 20, 9, 4, 0], [18, 3, 16, 3, 17, 4, 19, 5, 20, 7, 21, 11, 21, 13, 20, 14, 19, 15, 17, 15, 15, 14, 13, 13, 12, 9, 10, 9, 7, -1, -1, 9, 2, 8, 1, 9, 0, 10, 1, 9, 2], [27, 18, 13, 17, 15, 15, 16, 12, 16, 10, 15, 9, 14, 8, 11, 8, 8, 9, 6, 11, 5, 14, 5, 16, 6, 17, 8, -1, -1, 12, 16, 10, 14, 9, 11, 9, 8, 10, 6, 11, 5, -1, -1, 18, 16, 17, 8, 17, 6, 19, 5, 21, 5, 23, 7, 24, 10, 24, 12, 23, 15, 22, 17, 20, 19, 18, 20, 15, 21, 12, 21, 9, 20, 7, 19, 5, 17, 4, 15, 3, 12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1, 12, 0, 15, 0, 18, 1, 20, 2, 21, 3, -1, -1, 19, 16, 18, 8, 18, 6, 19, 5], [18, 9, 21, 1, 0, -1, -1, 9, 21, 17, 0, -1, -1, 4, 7, 14, 7], [21, 4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, -1, -1, 4, 11, 13, 11, 16, 10, 17, 9, 18, 7, 18, 4, 17, 2, 16, 1, 13, 0, 4, 0], [21, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5], [21, 4, 21, 4, 0, -1, -1, 4, 21, 11, 21, 14, 20, 16, 18, 17, 16, 18, 13, 18, 8, 17, 5, 16, 3, 14, 1, 11, 0, 4, 0], [19, 4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11, -1, -1, 4, 0, 17, 0], // E
		[18, 4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11], [21, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 18, 8, -1, -1, 13, 8, 18, 8], [22, 4, 21, 4, 0, -1, -1, 18, 21, 18, 0, -1, -1, 4, 11, 18, 11], [8, 4, 21, 4, 0], [16, 12, 21, 12, 5, 11, 2, 10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7], [21, 4, 21, 4, 0, -1, -1, 18, 21, 4, 7, -1, -1, 9, 12, 18, 0], [17, 4, 21, 4, 0, -1, -1, 4, 0, 16, 0], [24, 4, 21, 4, 0, -1, -1, 4, 21, 12, 0, -1, -1, 20, 21, 12, 0, -1, -1, 20, 21, 20, 0], [22, 4, 21, 4, 0, -1, -1, 4, 21, 18, 0, -1, -1, 18, 21, 18, 0], [22, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21], [21, 4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 14, 17, 12, 16, 11, 13, 10, 4, 10], [22, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, -1, -1, 12, 4, 18, -2], [21, 4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, 4, 11, -1, -1, 11, 11, 18, 0], [20, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3], [16, 8, 21, 8, 0, -1, -1, 1, 21, 15, 21], [22, 4, 21, 4, 6, 5, 3, 7, 1, 10, 0, 12, 0, 15, 1, 17, 3, 18, 6, 18, 21], [18, 1, 21, 9, 0, -1, -1, 17, 21, 9, 0], [24, 2, 21, 7, 0, -1, -1, 12, 21, 7, 0, -1, -1, 12, 21, 17, 0, -1, -1, 22, 21, 17, 0], [20, 3, 21, 17, 0, -1, -1, 17, 21, 3, 0], [18, 1, 21, 9, 11, 9, 0, -1, -1, 17, 21, 9, 11], [20, 17, 21, 3, 0, -1, -1, 3, 21, 17, 21, -1, -1, 3, 0, 17, 0], [14, 4, 25, 4, -7, -1, -1, 5, 25, 5, -7, -1, -1, 4, 25, 11, 25, -1, -1, 4, -7, 11, -7], [14, 0, 21, 14, -3], [14, 9, 25, 9, -7, -1, -1, 10, 25, 10, -7, -1, -1, 3, 25, 10, 25, -1, -1, 3, -7, 10, -7], [16, 6, 15, 8, 18, 10, 15, -1, -1, 3, 12, 8, 17, 13, 12, -1, -1, 8, 17, 8, 0], [16, 0, -2, 16, -2], [10, 6, 21, 5, 20, 4, 18, 4, 16, 5, 15, 6, 16, 5, 17], [19, 15, 14, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3], [19, 4, 21, 4, 0, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3], [18, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3], [19, 15, 21, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3], [18, 3, 8, 15, 8, 15, 10, 14, 12, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3], [12, 10, 21, 8, 21, 6, 20, 5, 17, 5, 0, -1, -1, 2, 14, 9, 14], [19, 15, 14, 15, -2, 14, -5, 13, -6, 11, -7, 8, -7, 6, -6, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3], [19, 4, 21, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0], [8, 3, 21, 4, 20, 5, 21, 4, 22, 3, 21, -1, -1, 4, 14, 4, 0], [10, 5, 21, 6, 20, 7, 21, 6, 22, 5, 21, -1, -1, 6, 14, 6, -3, 5, -6, 3, -7, 1, -7], [17, 4, 21, 4, 0, -1, -1, 14, 14, 4, 4, -1, -1, 8, 8, 15, 0], [8, 4, 21, 4, 0], [30, 4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0, -1, -1, 15, 10, 18, 13, 20, 14, 23, 14, 25, 13, 26, 10, 26, 0], [19, 4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0], [19, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3, 16, 6, 16, 8, 15, 11, 13, 13, 11, 14, 8, 14], [19, 4, 14, 4, -7, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3], [19, 15, 14, 15, -7, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3], [13, 4, 14, 4, 0, -1, -1, 4, 8, 5, 11, 7, 13, 9, 14, 12, 14], [17, 14, 11, 13, 13, 10, 14, 7, 14, 4, 13, 3, 11, 4, 9, 6, 8, 11, 7, 13, 6, 14, 4, 14, 3, 13, 1, 10, 0, 7, 0, 4, 1, 3, 3], [12, 5, 21, 5, 4, 6, 1, 8, 0, 10, 0, -1, -1, 2, 14, 9, 14], [19, 4, 14, 4, 4, 5, 1, 7, 0, 10, 0, 12, 1, 15, 4, -1, -1, 15, 14, 15, 0], [16, 2, 14, 8, 0, -1, -1, 14, 14, 8, 0], [22, 3, 14, 7, 0, -1, -1, 11, 14, 7, 0, -1, -1, 11, 14, 15, 0, -1, -1, 19, 14, 15, 0], [17, 3, 14, 14, 0, -1, -1, 14, 14, 3, 0], [16, 2, 14, 8, 0, -1, -1, 14, 14, 8, 0, 6, -4, 4, -6, 2, -7, 1, -7], [17, 14, 14, 3, 0, -1, -1, 3, 14, 14, 14, -1, -1, 3, 0, 14, 0], [14, 9, 25, 7, 24, 6, 23, 5, 21, 5, 19, 6, 17, 7, 16, 8, 14, 8, 12, 6, 10, -1, -1, 7, 24, 6, 22, 6, 20, 7, 18, 8, 17, 9, 15, 9, 13, 8, 11, 4, 9, 8, 7, 9, 5, 9, 3, 8, 1, 7, 0, 6, -2, 6, -4, 7, -6, -1, -1, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5, -1, 5, -3, 6, -5, 7, -6, 9, -7], [8, 4, 25, 4, -7], [14, 5, 25, 7, 24, 8, 23, 9, 21, 9, 19, 8, 17, 7, 16, 6, 14, 6, 12, 8, 10, -1, -1, 7, 24, 8, 22, 8, 20, 7, 18, 6, 17, 5, 15, 5, 13, 6, 11, 10, 9, 6, 7, 5, 5, 5, 3, 6, 1, 7, 0, 8, -2, 8, -4, 7, -6, -1, -1, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9, -1, 9, -3, 8, -5, 7, -6, 5, -7], [24, 3, 6, 3, 8, 4, 11, 6, 12, 8, 12, 10, 11, 14, 8, 16, 7, 18, 7, 20, 8, 21, 10, -1, -1, 3, 8, 4, 10, 6, 11, 8, 11, 10, 10, 14, 7, 16, 6, 18, 6, 20, 7, 21, 10, 21, 12]];
	};
	var text = function text() {
		var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
		var x0 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var y0 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

		moveTo(x0, y0);
		var ox = offset * 1.055;
		if (font === null) font = initFont();
		var pen = false;
		for (var c = 0; c < text.length; c++) {
			var i = text.charCodeAt(c) - 32;
			var data = font[i];
			var spacing = data[0] * scale * 0.2;
			if (data.length > 1) {
				pen = false;
				for (var k = 1; k < data.length - 1; k += 2) {
					if (data[k] === -1) {
						pen = false;
						continue;
					}
					var xc = data[k] * scale * 0.2;
					var yc = data[k + 1] * scale * 0.2;
					if (pen === true) lineTo(x0 + xc - ox, y0 - yc - ox);else {
						moveTo(x0 + xc - ox, y0 - yc - ox);
						pen = true;
					}
				}
			}
			x0 += spacing;
			moveTo(x0 - ox, y0 - ox);
		}
	};
	var textSize = function textSize() {
		var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
		var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		var size = 0;
		if (font === null) font = initFont();
		for (var c = 0; c < text.length; c++) {
			var i = text.charCodeAt(c) - 32;
			var data = font[i];
			size += data[0] * scale * 0.2;
		}
		return size;
	};
	//////////////////////////////////////////////////////
	var imageData = function imageData(img) {
		var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

		if (typeof img === "string") img = document.getElementById(img);
		var canvas = document.createElement("canvas");
		var w = canvas.width = width || img.width;
		var h = canvas.height = height || img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, w, h);
		return ctx.getImageData(0, 0, w, h);
	};
	/////////////////////////////////////////////////
	return {
		simplex: function simplex(opt) {
			return new Simplex(opt || {});
		},
		perlin: function perlin(opt) {
			return new Perlin(opt || {});
		},
		getX: function getX() {
			return px;
		},
		getY: function getY() {
			return py;
		},

		moveTo: moveTo,
		lineTo: lineTo,
		quadraticCurveTo: quadraticCurveTo,
		ellipse: ellipse,
		circle: function circle(x, y, w) {
			ellipse(x, y, w, w, 0, 2 * Math.PI);
		},
		arc: function arc(x, y, w, s, e) {
			ellipse(x, y, w, w, s, e);
		},
		fillRect: function fillRect(x0, y0, w0) {
			var h0 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : w0;

			_fillRect(x0, y0, w0, h0);
		},
		rect: function rect(x0, y0, w0) {
			var h0 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : w0;

			_rect(x0, y0, w0, h0);
		},
		line: function line(x0, y0, x1, y1) {
			if (Array.isArray(x0)) {
				if (Array.isArray(y0)) _line(x0[0], x0[1], y0[0], y0[1]);else _line(x0[0], x0[1], y0, x1);
			} else _line(x0, y0, x1, y1);
		},
		polygons: function polygons() {
			return new Polygons();
		},

		start: start,
		run: start,
		matrix: matrix,
		imageData: imageData,
		canvas: canvas,
		text: text,
		contextFree: function contextFree() {
			return new ContextFree();
		}
	};
};

export default SVG;