import React, { useContext, useEffect, useState } from "react"
import ShopifyBuy from "shopify-buy"

export const ShopifyContext = React.createContext()

const client = ShopifyBuy.buildClient({
  domain: "antiofficial.myshopify.com",
  storefrontAccessToken: "122b2bd77196392552b87dab7ec18d58"
})

export function ShopifyProvider(props) {
  const { children } = props

  const [products, setProducts] = useState()
  const [checkout, setCheckout] = useState()
  const [checkoutOpen, setCheckoutOpen] = useState("false")

  useEffect(() => {
    if (!products && !checkout) {
      client.product
        .fetchAll()
        .then(shopifyProducts => setProducts(shopifyProducts))
      client.checkout
        .create()
        .then(shopifyCheckout => setCheckout(shopifyCheckout))
    }
  }, [products, checkout])

  const providerValue = {
    client,
    products,
    checkout,
    setCheckout,
    checkoutOpen,
    setCheckoutOpen
  }

  return (
    <ShopifyContext.Provider value={providerValue}>
      {children}
    </ShopifyContext.Provider>
  )
}
