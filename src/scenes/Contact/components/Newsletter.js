import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"

import InputGroup from "./InputGroup"
import { InputContainer, SendButton, Title } from "./styledComponents"

export default function Newsletter(props) {
  const { setMessage } = props

  const [email, setEmail] = useState("")
  const onSubmit = useCallback(async () => {
    console.log(email)
    setMessage(email)
  }, [email, setMessage])

  return (
    <InputContainer>
      <Title>Sign up for our newsletter</Title>
      <InputGroup title="Email" value={email} setValue={setEmail} />
      <SendButton onClick={onSubmit}>SUBMIT</SendButton>
    </InputContainer>
  )
}
