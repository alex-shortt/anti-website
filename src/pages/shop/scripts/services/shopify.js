import React, { useEffect, useState } from "react";

export const ShopifyContext = React.createContext();

export function ShopifyProvider(props) {
  const { children } = props;

  const [client, setClient] = useState(
    ShopifyBuy.buildClient({
      domain: "antiofficial.myshopify.com",
      storefrontAccessToken: "122b2bd77196392552b87dab7ec18d58"
    })
  );

  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState();

  useEffect(() => {
    async function fetchShopify() {
      const shopifyProducts = client.product.fetchAll();
      const shopifyCheckout = client.checkout.create();

      setProducts(shopifyProducts);
      setCheckout(shopifyCheckout);
    }

    if (!products && !checkout) {
      fetchShopify();
    }
  }, [products, checkout]);

  const providerValue = { client, products, checkout };

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
