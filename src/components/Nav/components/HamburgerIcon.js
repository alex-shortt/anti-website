import React from "react"
import styled from "styled-components"

const Hamburger = styled.a`
  display: none;
  position: relative;
  width: 32px;
  height: 32px;
  background: ${props => (props.open === "true" ? "transparent" : "black")};
  transition: all 0.2s ease;
  cursor: pointer;
  z-index: 100;
  margin: 0;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: -1px;
    width: calc(100% + 2px);
    height: 20%;
    border: none;
    background-color: ${props => (props.open === "true" ? "#f78320" : "white")};
    transition: all 0.2s ease;
    transform: ${props =>
      props.open === "true" ? "rotate(45deg)" : "translateZ(0)"};
    border-radius: 4px;
  }

  &:before {
    top: ${props => (props.open === "true" ? "40%" : "20%")};
  }

  &:after {
    top: ${props => (props.open === "true" ? "40%" : "60%")};
    transform: ${props => (props.open === "true" ? "rotate(-45deg)" : "")};
  }

  @media screen and (max-width: 600px) {
    display: block;
  }
`

export default function HamburgerIcon(props) {
  return <Hamburger {...props} />
}
