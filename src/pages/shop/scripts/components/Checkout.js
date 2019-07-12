const Checkout = ({
  checkout,
  checkoutStatus,
  setCheckoutStatus,
  setSelectedVariant
}) => {
  return (
    <div className={checkoutStatus ? "checkout visible" : "checkout invisible"}>
      <div className="checkout-container">
        <div className="checkout-header">
          <button
            className="checkout-exit"
            onClick={() => {
              setCheckoutStatus(false)
              setSelectedVariant("")
            }}>
            x
          </button>
          <h1>checkout</h1>
        </div>
        <div className="checkout-content">
          <h1>{checkout.subtotalPrice}</h1>
        </div>
      </div>
    </div>
  )
}

export default Checkout