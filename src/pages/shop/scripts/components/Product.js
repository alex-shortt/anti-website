const Product = ({
  checkout,
  setCheckout,
  checkoutStatus,
  setCheckoutStatus,
  client,
  currentProduct,
  displayProductDetails,
  setDisplayProductDetails,
  selectedVariant,
  setSelectedVariant
}) => {
  const [productVariants, setProductVariants] = React.useState(currentProduct.variants.map(v => v = { ...v, selected: false }))

  function checkSelected(id) {
    setSelectedVariant(id)
    if (id === selectedVariant) {
      setProductVariants(
        productVariants.map(v => v.id === id ? v = { ...v, selected: true }
          : v = { ...v, selected: false })
      )
    }
  }

  function addToCheckout() {
    console.log(selectedVariant)
    let lineItems = { variantId: selectedVariant, quantity: 1 }
    const checkoutId = checkout.id
    client.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
      setCheckout(checkout)
      console.log(checkout)
    })
    setCheckoutStatus(true)
  }

  return (
    <div className="shop-page__column-two" style={displayProductDetails ?
      { display: "flex" }
      : { display: "none" }}>
      <div className="shop-page__column-two-section">
        <button className="remove-details__button"
          onClick={() => setDisplayProductDetails(false)}
          style={{ fontFamily: "VCR" }}
        >x</button>
        <h1>{currentProduct.title}</h1>
      </div>
      <div className="shop-page__column-two-section">
        <h2>${currentProduct.variants[0].price}</h2>
        <div className="variant-button__container">
          {
            productVariants.map((variant, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    checkSelected(variant.id)
                    console.log(variant.id)
                  }}
                  className={
                    variant.selected
                      ? "selected-variant"
                      : "variant"
                  }
                >{variant.title}
                </button>
              )
            })
          }
        </div>
        <button
          id="buy-button"
          onClick={() => addToCheckout()}
        >
          ADD TO CART
          </button>
        <span>{currentProduct.description}</span>
      </div>
    </div >
  )
}

export default Product