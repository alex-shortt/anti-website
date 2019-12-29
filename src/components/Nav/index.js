import React, { useState, useEffect, useCallback, useContext } from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import cartSVG from "assets/svg/cart.svg"
import { ShopifyContext } from "services/shopify"
import Cart from "components/Cart"

import HamburgerIcon from "./components/HamburgerIcon"
import NavOptions from "./components/NavOptions"
import MobileMenu from "./components/MobileMenu"

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
  flex-direction: column;

  @media screen and (max-width: 600px) {
    height: auto;
  }
`

const PrimaryMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`

const LogoVideo = styled.video`
  height: 70%;
  margin-right: 40px;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    height: 45px;
    margin-top: 9px;
    margin-bottom: 9px;
  }
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

  @media screen and (max-width: 600px) {
    display: none;
  }
`

const VideoLink = styled(Link)``

export default function Nav(props) {
  const { main, product } = props

  const { setCheckoutOpen } = useContext(ShopifyContext)

  const [setEvent, setSetEvent] = useState("false")
  const [opacity, setOpacity] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState("false")

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

  return (
    <>
      <Container opacity={main ? opacity : 1}>
        <PrimaryMenu>
          <VideoLink to="/">
            <LogoVideo autoPlay playsinline muted loop>
              <source
                type="video/mp4"
                src="https://d369ls1rsdbvlu.cloudfront.net/video/anti-logo-rotate.mp4"
              />
            </LogoVideo>
          </VideoLink>
          VideoLink>
          <NavOptions {...props} />
          <HamburgerIcon
            open={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen(mobileMenuOpen === "true" ? "false" : "true")
            }
          />
          <CartIcon onClick={() => setCheckoutOpen("true")} />
        </PrimaryMenu>
        <MobileMenu
          open={mobileMenuOpen}
          onClick={() => setMobileMenuOpen("false")}
          {...props}
        />
      </Container>
      <Cart />
    </>
  )
}
