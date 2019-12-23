import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Landing(props) {
  return (
    <Container>
      <h1>ANTI</h1>
    </Container>
  )
}
