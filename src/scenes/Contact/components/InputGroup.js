import React from "react"
import styled, { css } from "styled-components/macro"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`
const Title = styled.label`
  margin-bottom: 5px;
`

const inputStyle = css`
  font-size: 1.2rem;
  padding: 5px 10px;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 1px;
  outline: none;

  &:focus,
  &:active {
    border-bottom: 2px solid black;
    margin-bottom: 0px;
  }
`
const Text = styled.input`
  ${inputStyle};
`
const TextBox = styled.textarea`
  ${inputStyle};

  box-sizing: border-box;
  max-width: 100%;
  min-width: 100%;
`

export default function InputGroup(props) {
  const { multiline, title, ...restProps } = props

  return (
    <Container>
      <Title>{title}</Title>
      {multiline ? <TextBox {...restProps} /> : <Text {...restProps} />}
    </Container>
  )
}
