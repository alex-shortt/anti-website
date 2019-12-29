import React, { useContext } from "react"
import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

import { ShopifyContext } from "services/shopify"

const Container = styled.div`
  display: none;
  width: 100%;
  padding: 10px 0;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    display: flex;
  }
`

const LinkStyle = css`
  color: white;
  text-decoration: none;
  transition: 0.15s;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  padding: 6px 0;
  user-select: none;

  &:hover {
    color: orange;
  }
`

const LinkTo = styled(Link)`
  ${LinkStyle}
`

const NavLink = styled.a`
  ${LinkStyle}
`

export default function NavOptions(props) {
  const { main, product, open } = props

  const { setCheckoutOpen } = useContext(ShopifyContext)

  if (open === "false") {
    return <></>
  }

  if (product) {
    return (
      <Container {...props}>
        <LinkTo to="/#shop">BACK</LinkTo>
        <NavLink href="#" onClick={() => setCheckoutOpen("true")}>
          CART
        </NavLink>
      </Container>
    )
  }

  return (
    <Container {...props}>
      <NavLink href="#shop">SHOP</NavLink>
      <NavLink href="#contact">CONTACT</NavLink>
      <NavLink href="#socials">SOCIALS</NavLink>
      <NavLink href="#" onClick={() => setCheckoutOpen("true")}>
        CART
      </NavLink>
    </Container>
  )
}
