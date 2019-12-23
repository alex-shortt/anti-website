import React, { useContext } from "react";
import ProductImages from "../components/ProductImages";
import Product from "../components/Product";
import { ShopifyContext } from "../services/shopify";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

const LoadingText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function ProductPage(props) {
  const shopify = useContext(ShopifyContext);
  const handle = window.location.hash.replace("#", "");

  if (!shopify.products) {
    return <LoadingText>Loading...</LoadingText>;
  }

  const product = shopify.products.find(prod => prod.handle === handle);

  if (!product) {
    return (
      <LoadingText>
        We couldn't find the product you're looking for...
        <br />
        <br />
        <Link to="/shop/">Return to Shop</Link>
      </LoadingText>
    );
  }

  return (
    <div className="shop-page__container-responsive-product">
      <Nav toShop />
      <ProductImages product={product} />
      <Product product={product} {...shopify} />
    </div>
  );
}
