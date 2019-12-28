import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  margin: 30px auto;
  width: 100%;
`

export default function SectionContainer(props) {
  const { children } = props
  return <Container>{children}</Container>
}
