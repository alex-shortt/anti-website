import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  margin: 30px auto;
  width: 100%;
`

export default function SectionContainer(props) {
  const { children, ...restProps } = props
  return <Container {...restProps}>{children}</Container>
}
