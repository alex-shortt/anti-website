import React, { useContext } from "react";
import { ShopifyContext } from "../services/shopify";

export default function ProductsPage(props) {
  const { products } = useContext(ShopifyContext);
  console.log("products!");
  console.log(products);

  if (!products) {
    return <h1 style={{ fontFamily: "VCR", color: "white" }}>Loading...</h1>;
  }

  return <h1 style={{ fontFamily: "VCR", color: "white" }}>Loaded</h1>;
}
