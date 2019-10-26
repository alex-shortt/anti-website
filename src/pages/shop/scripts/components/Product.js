import React from "react";

export default function Product(props) {
  const {
    checkout,
    setCheckout,
    setCheckoutStatus,
    client,
    currentProduct,
    setCurrentProduct,
    selectedVariant,
    setSelectedVariant
  } = props;

  function checkSelected(id) {
    setSelectedVariant(id);
    setCurrentProduct({
      ...currentProduct,
      variants: currentProduct.variants.map(v =>
        v.id === id
          ? (v = { ...v, selected: true })
          : (v = { ...v, selected: false })
      )
    });
  }

  function addToCheckout() {
    let lineItemsToAdd = { variantId: selectedVariant, quantity: 1 };
    const checkoutId = checkout.id;
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
      setCheckout(checkout);
    });
    selectedVariant !== "" ? setCheckoutStatus(true) : setCheckoutStatus(false);
  }

  function displayDimensions() {
    const dimensionsClass = document.getElementsByClassName(
      "dimensions-shopify"
    );
    dimensionsClass[0].style.display === "block"
      ? (dimensionsClass[0].style.display = "none")
      : (dimensionsClass[0].style.display = "block");
  }

  return (
    <div className="shop-page__column-two">
      <div className="shop-page__column-two-section">
        <h1>{currentProduct.title}</h1>
      </div>
      <div className="shop-page__column-two-section">
        <h2>${currentProduct.variants[0].price}</h2>
        <div className="variant-button__container">
          {currentProduct.variants.map((variant, i) => {
            return (
              <button
                key={i}
                onClick={() =>
                  variant.available ? checkSelected(variant.id) : null
                }
                className={
                  variant.available
                    ? variant.selected
                      ? "selected-variant"
                      : "variant"
                    : "out-of-stock__variant"
                }
              >
                {variant.title}
              </button>
            );
          })}
        </div>
        <button className="buy-button" onClick={() => addToCheckout()}>
          ADD TO CART
        </button>
        <button
          className="buy-button dimensions"
          onClick={() => displayDimensions()}
        >
          DIMENSIONS
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: currentProduct.descriptionHtml }}
        />
      </div>
    </div>
  );
}
