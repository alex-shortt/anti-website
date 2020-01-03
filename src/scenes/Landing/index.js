import React from "react"
import styled, { keyframes } from "styled-components/macro"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  position: relative;
  margin-bottom: 100px;
`

const LogoGif = styled.img`
  width: 90%;
  max-width: 500px;
`

const bounceAnim = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(45deg);
  }
  40% {
    transform: translateY(-30px) rotate(45deg);
  }
  60% {
    transform: translateY(-15px) rotate(45deg);
  }
`

const AngleDown = styled.div`
  position: absolute;
  opacity: 0.5;
  bottom: 15vh;
  width: 25px;
  height: 25px;
  border: 5px solid #f78320;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  cursor: pointer;
  animation: ${bounceAnim} 3.5s infinite;

  & > a {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
  }
`

export default function Landing(props) {
  const gifURL = "https://d369ls1rsdbvlu.cloudfront.net/gifs/anti-logo.gif"

  return (
    <Container>
      <LogoGif src={gifURL} />
      <AngleDown>
        <a href="#shop" />
      </AngleDown>
    </Container>
  )
}
