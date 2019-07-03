import _regeneratorRuntime from "babel-runtime/regenerator";

var init = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(xcells, ycells) {
    var skybox, sphere;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $(".landing-links").hide();

            $("#terms-content").html(terms);
            $("#privacy-content").html(privacy);
            $("#taxes-content").html(taxes);

            _context.next = 6;
            return clickToEnter();

          case 6:
            skybox = new Skybox();
            sphere = new Sphere(xcells, ycells, skybox);

            sphere.loadContainers();
            sphere.resizeSphere();
            sphere.initialOrient();

            loadButtonNav(sphere);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var loadButtonNav = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(sphere) {
    var x, y, buttons;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            x = sphere.currX;
            y = sphere.currY;

            //HOME

            buttons = $(".landing-links").children();

            buttons.click(function () {
              var text = $(this).text().toLowerCase();
              switch (text) {
                case "socials":
                  sphere.zoomOut();
                  sphere.currX = 0;
                  sphere.currY = 1;
                  loadChecks.socialsLoad = true;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
                case "popup":
                  sphere.zoomOut();
                  sphere.currX = -1;
                  sphere.currY = 0;
                  loadChecks.popupLoad = true;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
                case "contact":
                  sphere.zoomOut();
                  sphere.currX = 0;
                  sphere.currY = -1;
                  loadChecks.contactLoad = true;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
                case "lookbook":
                  sphere.zoomOut();
                  sphere.currX = 1;
                  sphere.currY = 0;
                  loadChecks.lookbookLoad = true;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
              }
            });

            //SOCIALS
            buttons = $(".landing-links-socials-bot").children();
            buttons.click(function () {
              var text = $(this).text().toLowerCase();
              text = text.replace(/\W/g, "");
              switch (text) {
                case "return":
                  sphere.zoomOut();
                  sphere.currX = 0;
                  sphere.currY = 0;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
              }
            });

            //LOOKBOOK
            buttons = $(".landing-links-lookbook-left").children();
            buttons.click(function () {
              var text = $(this).text().toLowerCase();
              text = text.replace(/\W/g, "");
              switch (text) {
                case "return":
                  sphere.zoomOut();
                  sphere.currX = 0;
                  sphere.currY = 0;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
              }
            });

            //POPUP
            buttons = $(".landing-links-popup-right").children();
            buttons.click(function () {
              var text = $(this).text().toLowerCase();
              text = text.replace(/\W/g, "");
              switch (text) {
                case "return":
                  sphere.zoomOut();
                  sphere.currX = 0;
                  sphere.currY = 0;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
              }
            });

            //CONTACT
            buttons = $(".landing-links-contact-top").children();
            buttons.click(function () {
              var text = $(this).text().toLowerCase();
              text = text.replace(/\W/g, "");
              switch (text) {
                case "return":
                  sphere.zoomOut();
                  sphere.currX = 0;
                  sphere.currY = 0;
                  sphere.moveTo(sphere.currX, sphere.currY);
                  break;
              }
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loadButtonNav(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import "./styles/main.scss";
import Sphere from "./components/sphere.js";
import Skybox from "./components/skybox.js";
import clickToEnter from "./pages/landing/landing.js";
import "./pages/socials/socials.js";
import "./pages/lookbook/lookbook.js";
import "./pages/contact/contacts.js";
import "./pages/popup/popup.js";
import loadChecks from "./pages/view/pageLoadChecks.js";
import { terms, privacy, taxes } from "./components/legal.js";

init(9, 9);

$(document).ready(function () {
  $('body').css('display', 'none');
  $('body').fadeIn(1000);

  $('#welcome-logo__hyperlink').click(function () {
    event.preventDefault();
    var newLocation = $('#welcome-logo__hyperlink').attr('href');
    $('body').fadeOut(1000, function () {
      return pageRedirect(newLocation);
    });
    function pageRedirect(newLocation) {
      window.location = newLocation;
    }
  });
});