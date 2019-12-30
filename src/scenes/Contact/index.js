import React from "react"
import styled from "styled-components/macro"

import SectionHeader from "components/SectionHeader"
import SectionContainerBase from "components/SectionContainer"

import InputGroup from "./components/InputGroup"

const SectionContainer = styled(SectionContainerBase)`
  position: relative;
`

const InputContainer = styled.div`
  padding: 5px 0;
  padding-left: 15px;
  border-left: 2px solid black;
  min-width: 380px;
  margin: 20px 50px;
`

const SendButton = styled.button`
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

const Title = styled.h3`
  margin-top: 0;
`

const ContainerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 100%;
  margin: 0 auto;
  align-items: flex-start;
  flex-wrap: wrap;
`

const MessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 10px 25px;
  border: 1px solid black;
`

export default function Contact(props) {
  return (
    <div id="contact">
      <SectionHeader title="Contact" />
      <SectionContainer>
        <ContainerContainer>
          <InputContainer>
            <Title>Send us a message</Title>
            <InputGroup title="Name" type="text" />
            <InputGroup title="Email" type="email" />
            <InputGroup multiline title="Message" />
            <SendButton>SEND</SendButton>
          </InputContainer>
          <InputContainer>
            <Title>Sign up for our newsletter</Title>
            <InputGroup title="Email" />
            <SendButton>SUBMIT</SendButton>
          </InputContainer>
        </ContainerContainer>
        <MessageContainer>this is a message</MessageContainer>
      </SectionContainer>
    </div>
  )
}
