import React from "react";

export default function Checkout(props) {
  const {
    checkoutGifs,
    client,
    checkout,
    setCheckout,
    checkoutStatus,
    setCheckoutStatus
  } = props;

  function removeFromCheckout(itemId) {
    const checkoutId = checkout.id;
    let lineItemsToRemove = itemId;
    client.checkout
      .removeLineItems(checkoutId, lineItemsToRemove)
      .then(checkout => {
        setCheckout(checkout);
      });
  }

  return (
    <div className={checkoutStatus ? "checkout visible" : "checkout invisible"}>
      <div className="checkout-container">
        <div className="checkout-header">
          <button
            className="checkout-exit"
            onClick={() => {
              setCheckoutStatus(false);
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
            {checkout.lineItems && checkout.lineItems.length > 0 ? (
              checkout.lineItems.map((item, i) => {
                return (
                  <div className="item-line" key={item.id}>
                    <button
                      className="remove-item"
                      onClick={() => removeFromCheckout(item.id)}
                    >
                      x
                    </button>
                    <img
                      className="checkout-img"
                      src={item.variant.image.src}
                    />
                    <h4 className="item-size">{item.variant.title}</h4>
                    <h4 className="item-title">{item.title}</h4>
                    <h4 className="item-quantity">{item.quantity}</h4>
                    <h4 className="item-price">${item.variant.price}</h4>
                  </div>
                );
              })
            ) : (
              <h4 className="checkout-empty"> YOUR CART IS EMPTY</h4>
            )}
          </div>
        </div>
        <div className="checkout-footer">
          <h4 className="subtotal">Subtotal: ${checkout.subtotalPrice}</h4>
          <a href={checkout.webUrl} className="checkout-hyperlink">
            CHECKOUT
          </a>
        </div>
      </div>
    </div>
  );
}
