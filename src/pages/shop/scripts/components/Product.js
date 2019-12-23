import React, { useState } from "react";

function Variant(props) {
  const { variant, curVariantId, setCurVariantId } = props;
  const { available, id, title } = variant;

  let className = available ? null : "out-of-stock__variant";
  if (!className) {
    className = curVariantId === id ? "selected-variant" : "variant";
  }

  const onClick = () => (available ? setCurVariantId(id) : null);

  return (
    <button key={id} onClick={onClick} className={className}>
      {title}
    </button>
  );
}

export default function Product(props) {
  const { product, checkout, setCheckout, client, setCheckoutOpen } = props;

  const [curVariantId, setCurVariantId] = useState(0);

  function addToCheckout() {
    let lineItemsToAdd = { variantId: curVariantId, quantity: 1 };
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
          {variants.map(variant => (
            <Variant
              variant={variant}
              curVariantId={curVariantId}
              setCurVariantId={setCurVariantId}
            />
          ))}
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
