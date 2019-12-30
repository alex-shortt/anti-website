import React, { useState, useCallback } from "react"

import { InputContainer, Title, SendButton } from "./styledComponents"
import InputGroup from "./InputGroup"

export default function SendMessage(props) {
  const { setMessage } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [massage, setMassage] = useState("")
  const onSubmit = useCallback(async () => {
    console.log(email)
    setMessage(email)
  }, [email, setMessage])

  return (
    <InputContainer>
      <Title>Send us a message</Title>
      <InputGroup title="Name" type="text" value={name} setValue={setName} />
      <InputGroup
        title="Email"
        type="email"
        value={email}
        setValue={setEmail}
      />
      <InputGroup
        multiline
        title="Message"
        value={massage}
        setValue={setMassage}
      />
      <SendButton onClick={onSubmit}>SEND</SendButton>
    </InputContainer>
  )
}
