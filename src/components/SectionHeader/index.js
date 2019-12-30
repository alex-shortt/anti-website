import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  width: 100%;
  padding: 0 3rem;
  padding-top: 80px;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    padding: 0 1rem;
  }
`

const Title = styled.h1`
  margin: 0;
`

export default function SectionHeader(props) {
  const { title } = props
  return (
    <Container>
      <Title>{title}</Title>
      <hr />
    </Container>
  )
}
