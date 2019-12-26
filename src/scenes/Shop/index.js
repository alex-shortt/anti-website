import React, { useContext } from "react"
import styled from "styled-components/macro"

import ProductListing from "components/ProductListing"
import { ShopifyContext } from "services/shopify"
import SectionHeader from "components/SectionHeader"
import Helmet from "components/Helmet"

const Container = styled.div`
  margin: 20px auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const LoadingText = styled.h1`
  width: 100%;
  height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Shop(props) {
  const { products } = useContext(ShopifyContext)
  console.log(products)

  if (!products) {
    return <LoadingText>Loading...</LoadingText>
  }

  return (
    <>
      <Helmet title="Shop" />
      <SectionHeader title="Shop" />
      <Container>
        {products.map(product => (
          <ProductListing product={product} />
        ))}
      </Container>
    </>
  )
}
