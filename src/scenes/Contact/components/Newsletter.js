import React, { useState, useCallback } from "react"

import InputGroup from "./InputGroup"
import { InputContainer, SendButton, Title } from "./styledComponents"

export default function Newsletter(props) {
  const { setMessage } = props

  const [email, setEmail] = useState("")
  const onSubmit = useCallback(
    async e => {
      e.preventDefault()
      const emailURL = `https://anti-eshop.us20.list-manage.com/subscribe/post?u=0c1f5fdadb2563cbd266a05f2&id=5ee2aeb065&EMAIL=${encodeURIComponent(
        email
      )}`

      window.open(emailURL)
      setMessage("Thank you for signing up")
      setEmail("")
    },
    [email, setMessage]
  )

  return (
    <InputContainer>
      <Title>Join the Anti Mailing List</Title>
      <InputGroup title="Email" value={email} setValue={setEmail} />
      <SendButton onClick={onSubmit}>SUBMIT</SendButton>
    </InputContainer>
  )
}
