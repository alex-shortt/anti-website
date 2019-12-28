import React from "react"
import styled from "styled-components/macro"

import Helmet from "components/Helmet"
import Landing from "scenes/Landing"
import Shop from "scenes/Shop"
import Contact from "scenes/Contact"
import Lookbook from "scenes/Lookbook"
import Socials from "scenes/Socials"

const Container = styled.div`
  width: 100%;
`

export default function View(props) {
  return (
    <Container>
      <Helmet title="View" />
      <Landing />
      <Shop />
      <Contact />
      <Lookbook />
      <Socials />
    </Container>
  )
}
