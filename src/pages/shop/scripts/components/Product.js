import React, { useState } from "react";

export default function Product(props) {
  const { product, checkout, setCheckout, client, setCheckoutOpen } = props;

  const [variant, setVariant] = useState(0);

  function addToCheckout() {
    let lineItemsToAdd = { variantId: variant, quantity: 1 };
    const checkoutId = checkout.id;
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
      setCheckout(checkout);
      setCheckoutOpen("true");
    });
  }

  function displayDimensions() {
    const dimensionsClass = document.getElementsByClassName(
      "dimensions-shopify"
    );
    dimensionsClass[0].style.display === "block"
      ? (dimensionsClass[0].style.display = "none")
      : (dimensionsClass[0].style.display = "block");
  }

  const { title, variants, descriptionHtml } = product;

  return (
    <div className="shop-page__column-two">
      <div className="shop-page__column-two-section">
        <h1>{title}</h1>
      </div>
      <div className="shop-page__column-two-section">
        <h2>${variants[0].price}</h2>
        <div className="variant-button__container">
          {variants.map((variant, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  console.log(variant);
                  variant.available ? setVariant(variant.id) : null;
                }}
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
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </div>
  );
}
