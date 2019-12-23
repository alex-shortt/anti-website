import React, { useContext, useCallback, useState } from "react";
import { ShopifyContext } from "../services/shopify";

function Item(props) {
  const { item, removeFromCheckout } = props;

  return (
    <div className="item-line" key={item.id}>
      <button
        className="remove-item"
        onClick={() => removeFromCheckout(item.id)}
      >
        x
      </button>
      <img className="checkout-img" src={item.variant.image.src} />
      <h4 className="item-size">{item.variant.title}</h4>
      <h4 className="item-title">{item.title}</h4>
      <h4 className="item-quantity">{item.quantity}</h4>
      <h4 className="item-price">${item.variant.price}</h4>
    </div>
  );
}

export default function Checkout(props) {
  const {} = props;
  const { checkout, setCheckout, checkoutOpen, setCheckoutOpen, client } = useContext(ShopifyContext);

  const removeFromCheckout = useCallback(
    itemId => {
      const checkoutId = checkout.id;
      let lineItemsToRemove = itemId;
      client.checkout
        .removeLineItems(checkoutId, lineItemsToRemove)
        .then(newCheckout => {
          setCheckout(newCheckout);
        });
    },
    [checkout]
  );

  if (!checkout) {
    return <></>;
  }

  const { lineItems, subtotalPrice, webUrl } = checkout;

  return (
    <div className={`checkout ${checkoutOpen === "true" ? "visible" : "invisible"}`}>
      <div className="checkout-container">
        <div className="checkout-header">
          <button
            className="checkout-exit"
            onClick={() => {
              setCheckoutOpen("false");
            }}
          >
            x
          </button>
          <h1>Cart</h1>
          <div className="checkout-row">
            <p>ANTI</p>
            <p>IMAGE</p>
            <p>SIZE</p>
            <p>PRODUCT NAME</p>
            <p>QUANTITY</p>
            <p>PRICE</p>
          </div>
        </div>
        <div className="checkout-content">
          <div className="checkout-list">
            {lineItems && lineItems.length > 0 ? (
              lineItems.map(item => (
                <Item item={item} removeFromCheckout={removeFromCheckout} />
              ))
            ) : (
              <h4 className="checkout-empty"> YOUR CART IS EMPTY</h4>
            )}
          </div>
        </div>
        <div className="checkout-footer">
          <h4 className="subtotal">Subtotal: ${subtotalPrice}</h4>
          <a href={webUrl} className="checkout-hyperlink">
            CHECKOUT
          </a>
        </div>
      </div>
    </div>
  );
}
