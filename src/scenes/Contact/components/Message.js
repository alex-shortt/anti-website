import React from "react"
import styled from "styled-components/macro"

const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px 35px;
  border: 1px solid black;
`

const Dismiss = styled.button`
  color: black;
  font-weight: bold;
  padding: 4px 10px;
  border: none;
  background: white;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
`

export default function Message(props) {
  const { message, setMessage } = props

  if (!message) {
    return <></>
  }

  return (
    <MessageContainer>
      {message}
      <br />
      <Dismiss onClick={() => setMessage(null)}>OK</Dismiss>
    </MessageContainer>
  )
}
