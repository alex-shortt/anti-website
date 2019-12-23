import React, { useContext } from "react";
import { ShopifyContext } from "../services/shopify";
import styled from "styled-components";
import ProductListing from "../components/ProductListing";
import Nav from "../components/Nav";

const Container = styled.div`
  margin: 20px auto;
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const LoadingText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;

  @media screen and (max-width: 700px) {
    margin-top: 7rem;
  }
`;

export default function ProductsPage(props) {
  const { products } = useContext(ShopifyContext);
  console.log(products);

  if (!products) {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <>
      <Nav toHome />
      <Title>Anti E-Shop</Title>
      <Container>
        {products.map(product => (
          <ProductListing product={product} />
        ))}
      </Container>
    </>
  );
}
