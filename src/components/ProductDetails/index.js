import React, { useState, useCallback } from "react"
import styled from "styled-components/macro"
import ReactHtmlParser from "react-html-parser"

import Variant from "./components/Variant"

const Container = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 40%;
  max-width: 420px;
  padding: 100px 2px;
  height: 100%;
  text-transform: uppercase;
  box-sizing: border-box;
  overflow-y: auto;

  & > * {
    td {
      border: 1px solid black;
      padding: 5px;
    }

    table {
      font-size: 10px;
    }
  }

  @media screen and (max-width: 875px) {
    height: auto;
    padding: 0 1px;
    margin: 0 auto;
    width: 100%;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 500px) {
    padding: 0 20px;
  }
`

const VariantContainer = styled.div`
  display: flex;
  margin-top: 20px;
`

const BuyButton = styled.button`
  outline: none;
  background-color: black;
  color: white;
  margin: 20px 0px 5px 0px;
  width: 100%;
  padding: 15px 20px 15px 20px;
  transition: 0.5s;
  text-align: center;
  font-size: 20px;
  border: 1px solid black;

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

export default function ProductDetails(props) {
  const { product, checkout, setCheckout, client, setCheckoutOpen } = props

  const [curVariantId, setCurVariantId] = useState(0)
  const [dimsOpen, setDimsOpen] = useState("false")

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

  const toggleDims = useCallback(() => {
    setDimsOpen(dimsOpen === "true" ? "false" : "true")
  }, [dimsOpen])

  const { title, variants, descriptionHtml } = product

  return (
    <Container>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <h2>${variants[0].price}</h2>
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
        <DimensionsButton onClick={() => toggleDims()}>
          DIMENSIONS
        </DimensionsButton>
        {dimsOpen === "true" && ReactHtmlParser(descriptionHtml)[1]}
        {ReactHtmlParser(descriptionHtml)[2]}
      </div>
    </Container>
  )
}
