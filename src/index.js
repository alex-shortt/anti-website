import "./styles/main.scss"
import Sphere from "./components/sphere.js"
import Skybox from "./components/skybox.js"
import clickToEnter from "./pages/landing/landing.js"
import "./pages/socials/socials.js"
import "./pages/lookbook/lookbook.js"
import "./pages/contact/contacts.js"
import "./pages/popup/popup.js"
import loadChecks from "./pages/view/pageLoadChecks.js"
import { terms, privacy, taxes } from "./components/legal.js"

async function init(xcells, ycells) {
  $(".landing-links").hide()

  $("#terms-content").html(terms)
  $("#privacy-content").html(privacy)
  $("#taxes-content").html(taxes)

  await clickToEnter()
  var skybox = new Skybox()
  var sphere = new Sphere(xcells, ycells, skybox)
  sphere.loadContainers()
  sphere.resizeSphere()
  sphere.initialOrient()

  loadButtonNav(sphere)
}

async function loadButtonNav(sphere) {
  var x = sphere.currX
  var y = sphere.currY

  //HOME
  var buttons = $(".landing-links").children()
  buttons.click(function() {
    var text = $(this)
      .text()
      .toLowerCase()
    switch (text) {
      case "socials":
        sphere.zoomOut()
        sphere.currX = 0
        sphere.currY = 1
        loadChecks.socialsLoad = true
        sphere.moveTo(sphere.currX, sphere.currY)
        break
      case "popup":
        sphere.zoomOut()
        sphere.currX = -1
        sphere.currY = 0
        loadChecks.popupLoad = true
        sphere.moveTo(sphere.currX, sphere.currY)
        break
      case "contact":
        sphere.zoomOut()
        sphere.currX = 0
        sphere.currY = -1
        loadChecks.contactLoad = true
        sphere.moveTo(sphere.currX, sphere.currY)
        break
      case "lookbook":
        sphere.zoomOut()
        sphere.currX = 1
        sphere.currY = 0
        loadChecks.lookbookLoad = true
        sphere.moveTo(sphere.currX, sphere.currY)
        break
    }
  })

  //SOCIALS
  buttons = $(".landing-links-socials-bot").children()
  buttons.click(function() {
    var text = $(this)
      .text()
      .toLowerCase()
    text = text.replace(/\W/g, "")
    switch (text) {
      case "return":
        sphere.zoomOut()
        sphere.currX = 0
        sphere.currY = 0
        sphere.moveTo(sphere.currX, sphere.currY)
        break
    }
  })

  //LOOKBOOK
  buttons = $(".landing-links-lookbook-left").children()
  buttons.click(function() {
    var text = $(this)
      .text()
      .toLowerCase()
    text = text.replace(/\W/g, "")
    switch (text) {
      case "return":
        sphere.zoomOut()
        sphere.currX = 0
        sphere.currY = 0
        sphere.moveTo(sphere.currX, sphere.currY)
        break
    }
  })

  //POPUP
  buttons = $(".landing-links-popup-right").children()
  buttons.click(function() {
    var text = $(this)
      .text()
      .toLowerCase()
    text = text.replace(/\W/g, "")
    switch (text) {
      case "return":
        sphere.zoomOut()
        sphere.currX = 0
        sphere.currY = 0
        sphere.moveTo(sphere.currX, sphere.currY)
        break
    }
  })

  //CONTACT
  buttons = $(".landing-links-contact-top").children()
  buttons.click(function() {
    var text = $(this)
      .text()
      .toLowerCase()
    text = text.replace(/\W/g, "")
    switch (text) {
      case "return":
        sphere.zoomOut()
        sphere.currX = 0
        sphere.currY = 0
        sphere.moveTo(sphere.currX, sphere.currY)
        break
    }
  })
}

init(9, 9)
