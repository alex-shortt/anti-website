import React, { useContext } from "react";
import { ShopifyContext } from "../services/shopify";

export default function TubeHologram(props) {
  const { products } = useContext(ShopifyContext);
  console.log("products!")
  console.log(products)

  return <></>
}
