import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  margin-bottom: 100px;
`

const LogoVideo = styled.video`
  width: 90%;
  max-width: 500px;
`

export default function Landing(props) {
  return (
    <Container>
      <LogoVideo autoPlay playsinline muted loop>
        <source
          type="video/mp4"
          src="https://d369ls1rsdbvlu.cloudfront.net/video/ANTI_RotatingText-compressed.mp4"
        />
      </LogoVideo>
    </Container>
  )
}
