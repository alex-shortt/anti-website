import styled from "styled-components/macro"

export const InputContainer = styled.div`
  padding: 5px 0;
  padding-left: 15px;
  border-left: 2px solid black;
  min-width: 380px;
  margin: 20px 50px;
`

export const SendButton = styled.button`
  background: black;
  color: white;
  padding: 5px 25px;
  transition: 0.15s;
  cursor: pointer;
  margin-top: 20px;
  border: 1px solid black;
  font-size: 1.3rem;

  &:hover {
    background: white;
    color: black;
  }
`

export const Title = styled.h3`
  margin-top: 0;
`
