import React, { useState, useEffect, useCallback, useContext } from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import cartSVG from "assets/svg/cart.svg"
import { ShopifyContext } from "services/shopify"
import Cart from "components/Cart"

const Container = styled.div.attrs(props => ({
  style: {
    opacity: props.opacity
  }
}))`
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 2px solid orange;
  box-sizing: border-box;
  display: flex;
  background: black;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
`

const LogoVideo = styled.video`
  height: 70%;
  margin-right: 40px;
`

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  transition: 0.15s;

  &:hover {
    color: orange;
  }
`

const LinkTo = styled(Link)`
  color: white;
  text-decoration: none;
  transition: 0.15s;

  &:hover {
    color: orange;
  }
`

const LinkContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
`

const CartIcon = styled.img.attrs({ src: cartSVG })`
  height: 40%;
  width: auto;
  margin: 0 40px;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.15s;

  &:hover {
    opacity: 1;
  }
`

export default function Nav(props) {
  const { main, product } = props

  const { setCheckoutOpen } = useContext(ShopifyContext)

  const [setEvent, setSetEvent] = useState("false")
  const [opacity, setOpacity] = useState(0)

  const updateOpacity = useCallback(() => {
    const dist = document.getElementById("html").scrollTop
    const startDist = (window.innerHeight - 64) / 2
    const maxDist = window.innerHeight - 64
    const perc = (dist - startDist) / (maxDist - startDist)

    if (perc < 0) {
      setOpacity(0)
    } else if (perc > 1) {
      setOpacity(1)
    } else {
      setOpacity(perc)
    }
  })

  useEffect(() => {
    if (setEvent === "false") {
      window.addEventListener("scroll", updateOpacity)
      setSetEvent("true")
    }
  }, [setEvent, updateOpacity])

  if (product) {
    return (
      <>
        <Container>
          <LogoVideo autoPlay playsinline muted loop>
            <source
              type="video/mp4"
              src="https://d369ls1rsdbvlu.cloudfront.net/video/anti-logo-rotate.mp4"
            />
          </LogoVideo>
          <LinkContainer>
            <LinkTo to="/#shop">BACK</LinkTo>
          </LinkContainer>
          <CartIcon onClick={() => setCheckoutOpen("true")} />
        </Container>
        <Cart />
      </>
    )
  }

  // main
  return (
    <>
      <Container opacity={opacity}>
        <LogoVideo autoPlay playsinline muted loop>
          <source
            type="video/mp4"
            src="https://d369ls1rsdbvlu.cloudfront.net/video/anti-logo-rotate.mp4"
          />
        </LogoVideo>
        <LinkContainer>
          <NavLink href="#shop">SHOP</NavLink>
          <NavLink href="#contact">CONTACT</NavLink>
          <NavLink href="#socials">SOCIALS</NavLink>
        </LinkContainer>
        <CartIcon onClick={() => setCheckoutOpen("true")} />
      </Container>
      <Cart />
    </>
  )
}
