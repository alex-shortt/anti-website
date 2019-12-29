import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

const LinkTo = styled(Link)`
  color: white;
  text-decoration: none;
  transition: 0.15s;

  &:hover {
    color: #f78320;
  }
`

const LinkContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  transition: 0.15s;

  &:hover {
    color: #f78320;
  }
`

export default function NavOptions(props) {
  const { main, product } = props

  if (product) {
    return (
      <LinkContainer>
        <LinkTo to="/#shop">BACK</LinkTo>
      </LinkContainer>
    )
  }

  return (
    <LinkContainer>
      <NavLink href="#shop">SHOP</NavLink>
      <NavLink href="#contact">CONTACT</NavLink>
      <NavLink href="#socials">SOCIALS</NavLink>
    </LinkContainer>
  )
}
