import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  background: black;
  border-top: 2px solid orange;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  height: 250px;
  margin-top: 150px;
`

const Name = styled.h1`
  color: white;
  text-align: center;
  margin-top: 0;
`

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Link = styled.a`
  color: white;
  margin: 0 10px;
  font-size: 10pt;
`

export default function Footer(props) {
  return (
    <Container>
      <Name>ANTI</Name>
      <LinkContainer>
        <Link href="#">Terms</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Tax</Link>
      </LinkContainer>
    </Container>
  )
}
