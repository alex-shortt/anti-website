import React, { useState } from "react"
import styled from "styled-components/macro"

import Variant from "./components/Variant"

const Container = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 125px;
  height: 80%;
  width: 33%;
  text-transform: uppercase;
`

const VariantContainer = styled.div`
  display: flex;
  width: 80%;
  margin-top: 20px;
`

const BuyButton = styled.button`
  outline: none;
  background-color: black;
  color: white;
  margin: 20px 0px 5px 0px;
  width: 100%;
  border: white solid 2px;
  padding: 15px 20px 15px 20px;
  transition: 0.5s;
  text-align: center;
  font-size: 20px;

  &:hover {
    background-color: white;
    transition: 0.5s;
    color: black;
    cursor: pointer;
  }
`

const DimensionsButton = styled(BuyButton)`
  margin-bottom: 20px;
`

export default function Product(props) {
  const { product, checkout, setCheckout, client, setCheckoutOpen } = props

  const [curVariantId, setCurVariantId] = useState(0)

  function addToCheckout() {
    const lineItemsToAdd = { variantId: curVariantId, quantity: 1 }
    const checkoutId = checkout.id
    client.checkout
      .addLineItems(checkoutId, lineItemsToAdd)
      .then(newCheckout => {
        setCheckout(newCheckout)
        setCheckoutOpen("true")
      })
  }

  function displayDimensions() {
    const dimensionsClass = document.getElementsByClassName(
      "dimensions-shopify"
    )
    dimensionsClass[0].style.display === "block"
      ? (dimensionsClass[0].style.display = "none")
      : (dimensionsClass[0].style.display = "block")
  }

  const { title, variants, descriptionHtml } = product

  return (
    <Container>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <VariantContainer>
          {variants.map(variant => (
            <Variant
              variant={variant}
              curVariantId={curVariantId}
              setCurVariantId={setCurVariantId}
            />
          ))}
        </VariantContainer>
        <BuyButton onClick={() => addToCheckout()}>ADD TO CART</BuyButton>
        <DimensionsButton onClick={() => displayDimensions()}>
          DIMENSIONS
        </DimensionsButton>
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </Container>
  )
}
