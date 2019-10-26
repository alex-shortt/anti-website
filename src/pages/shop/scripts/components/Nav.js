import React from "react";
const { Link } = ReactRouterDOM;


export default function Nav(props) {
  const {
    onProductPage,
    setOnProductPage,
    setProductDescriptionDisplay,
    setProductVariants,
    currentProduct,
    setSelectedVariant,
    displayProductDetails,
    setDisplayProductDetails,
    setCheckoutStatus
  } = props;

  function returnToView() {
    setProductVariants(
      currentProduct.variants.map(v => (v = { ...v, selected: false }))
    );
    setOnProductPage(!onProductPage);
    setSelectedVariant("");
    setDisplayProductDetails(false);
    setProductDescriptionDisplay(false);
    document.getElementsByClassName("dimensions-shopify")[0].style.display =
      "none";
  }
  return (
    <div className="nav">
      {onProductPage ? (
        <Link to="/" className="return">
          <button onClick={() => returnToView()} className="return">
            return
          </button>
        </Link>
      ) : (
        <a href="/index.html" className="return">
          return
        </a>
      )}
      <img
        className="cart"
        onClick={() => setCheckoutStatus(true)}
        src={"../assets/pictures/svg/cart-white.svg"}
      />
    </div>
  );
}
