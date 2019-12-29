import React from "react"
import styled from "styled-components/macro"
import ReactHtmlParser from "react-html-parser"
import { Link } from "react-router-dom"

import { privacy } from "assets/copy/legal"
import Helmet from "components/Helmet"

const Container = styled.div`
  padding: 25px;
`

const ReturnButton = styled(Link)`
  background: black;
  color: white;
  padding: 5px 10px;
  margin: 20px auto;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  border: 1px solid black;
  transition: 0.15s linear;

  &:hover {
    background: white;
    color: black;
  }
`

export default function Privacy(props) {
  return (
    <Container>
      <Helmet title="Privacy | ANTI" />
      <ReturnButton to="/">Return</ReturnButton>
      <br />
      {ReactHtmlParser(privacy)}
    </Container>
  )
}
