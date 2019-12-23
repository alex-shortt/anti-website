import { createGlobalStyle } from "styled-components/macro"
import "typeface-roboto"
import "normalize.css"

import "./fontawesome"
import LOVES from "assets/fonts/LOVES.ttf"

export default createGlobalStyle`
  @font-face {
      font-family: "LOVES";
      src: url(${LOVES});
  }

  html, body, #root {
    width: 100%;
  }

  body {
    font-family: "LOVES", Avenir, Lato, Roboto, sans-serif;
    letter-spacing: 2px;
    overflow: auto;
    overflow-x: hidden;
  }
`
