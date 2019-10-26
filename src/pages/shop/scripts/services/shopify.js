import React, { useEffect, useState } from "react";

export const ShopifyContext = React.createContext();

const client = ShopifyBuy.buildClient({
  domain: "antiofficial.myshopify.com",
  storefrontAccessToken: "122b2bd77196392552b87dab7ec18d58"
});

export function ShopifyProvider(props) {
  const { children } = props;

  const [products, setProducts] = useState();
  const [checkout, setCheckout] = useState();

  useEffect(() => {
    if (!products && !checkout) {
      client.product
        .fetchAll()
        .then(shopifyProducts => setProducts(shopifyProducts));
      client.checkout
        .create()
        .then(shopifyCheckout => setCheckout(shopifyCheckout));
    }
  }, [products, checkout]);

  const providerValue = { client, products, checkout, setCheckout };

  return (
    <ShopifyContext.Provider value={providerValue}>
      {children}
    </ShopifyContext.Provider>
  );
}

export function findGifs(products) {
  let tempArr = products.map(
    product => product.images[product.images.length - 1].src
  );
  tempArr.forEach(picture => {
    const img = new Image();
    img.src = picture;
  });
}
