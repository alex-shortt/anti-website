import React, { useState, useCallback } from "react"
import axios from "axios"

import { InputContainer, Title, SendButton } from "./styledComponents"
import InputGroup from "./InputGroup"

export default function SendMessage(props) {
  const { setMessage } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [massage, setMassage] = useState("")
  const onSubmit = useCallback(async () => {
    if (email === "" || name === "" || massage === "") {
      return
    }

    const endpoint = "https://formspree.io/xbjdwerv"

    axios.post(endpoint, {
      email,
      name,
      message: massage
    })

    setMessage("Thank you for your message")
    setName("")
    setEmail("")
    setMassage("")
  }, [email, massage, name, setMessage])

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
