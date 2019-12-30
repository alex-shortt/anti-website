import React, { useState } from "react"
import styled from "styled-components/macro"

import SectionHeader from "components/SectionHeader"
import SectionContainerBase from "components/SectionContainer"

import Newsletter from "./components/Newsletter"
import Message from "./components/Message"
import SendMessage from "./components/SendMessage"

const SectionContainer = styled(SectionContainerBase)`
  position: relative;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 100%;
  margin: 0 auto;
  align-items: flex-start;
  flex-wrap: wrap;
  transition: 0.15s linear;
  ${props => props.hidden && "filter: blur(1px); pointer-events: none;"};
`

export default function Contact(props) {
  const [message, setMessage] = useState(null)

  return (
    <div id="contact">
      <SectionHeader title="Contact" />
      <SectionContainer>
        <Container hidden={message}>
          <SendMessage setMessage={setMessage} />
          <Newsletter setMessage={setMessage} />
        </Container>
        <Message message={message} setMessage={setMessage} />
      </SectionContainer>
    </div>
  )
}
