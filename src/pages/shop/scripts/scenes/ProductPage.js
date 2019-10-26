import React, { useContext } from "react";
import ProductImages from "../components/ProductImages";
import Product from "../components/Product";
import { ShopifyContext } from "../services/shopify";
import styled from "styled-components";

const LoadingText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function ProductPage(props) {
  const {
    match: {
      params: { handle }
    }
  } = props;

  const shopify = useContext(ShopifyContext);

  if (!shopify.products) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const product = shopify.products.find(prod => prod.handle === handle);

  console.log(product);

  return (
    <div className="shop-page__container-responsive-product">
      <ProductImages product={product} />
      <Product product={product} {...shopify} />
    </div>
  );
}
