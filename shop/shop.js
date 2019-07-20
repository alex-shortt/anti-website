import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Magnifier from "react-magnifier";

const Shop = () => {
  const [products, setProducts] = React.useState([]);
  const [productIndex, setProductIndex] = React.useState(0);
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [productVariants, setProductVariants] = React.useState([]);
  const [mounted, setMounted] = React.useState(false);
  const [displayProductDetails, setDisplayProductDetails] = React.useState(
    false
  );
  const [checkoutStatus, setCheckoutStatus] = React.useState(false);
  const [checkout, setCheckout] = React.useState({});
  const [selectedVariant, setSelectedVariant] = React.useState("");
  const [displayOutOfStock, setDisplayOutOfStock] = React.useState(false);
  const [
    productDescriptionDisplay,
    setProductDescriptionDisplay
  ] = React.useState(false);
  const indexOptions = {
    add: () => {
      productIndex !== products.length - 1
        ? setProductIndex(productIndex + 1)
        : setProductIndex(0);
    },
    sub: () => {
      productIndex > 0
        ? setProductIndex(productIndex - 1)
        : setProductIndex(products.length - 1);
    }
  };
  const client = ShopifyBuy.buildClient({
    domain: "antiofficial.myshopify.com",
    storefrontAccessToken: "122b2bd77196392552b87dab7ec18d58"
  });
  React.useEffect(() => {
    client.product.fetchAll().then(shopifyProducts => {
      for(let i = 0; i < shopifyProducts.length; i++){
        let product = shopifyProducts[i];
        let div = document.createElement("div")
        div.innerHTML = product.descriptionHtml
        var table1 = div.querySelector('table');
        // div.removeChild(table1)
        // product.descriptionHtml = div.toString()
        // product.sizes = table1.toString()
        // console.log(product)
      }
      setProducts(shopifyProducts);
      setCurrentProduct(shopifyProducts[0]);
      setMounted(true);
      console.log(shopifyProducts);
    });
    client.checkout.create().then(checkout => {
      setCheckout(checkout);
    });
  }, []);

  function selectProduct() {
    setCurrentProduct(products[productIndex]);
    setProductVariants(
      currentProduct.variants.map(v => (v = { ...v, selected: false }))
    );
    setDisplayProductDetails(true);
  }

  if (mounted) {
    let images = products.map(product => product.images[0].src);
    return (
      <div style={{ width: "100%", height: "100vh", overflowY: "auto" }}>
        <Nav
          productDescriptionDisplay={productDescriptionDisplay}
          setProductDescriptionDisplay={setProductDescriptionDisplay}
          setCheckoutStatus={setCheckoutStatus}
          setProductVariants={setProductVariants}
          setSelectedVariant={setSelectedVariant}
          displayProductDetails={displayProductDetails}
          setDisplayProductDetails={setDisplayProductDetails}
          currentProduct={currentProduct}
        />
        <div
          className={"shop-page__container shop-page__container-responsive"}
          style={{ justifyContent: "space-evenly", width: "100%" }}
        >
          <Checkout
            client={client}
            checkout={checkout}
            setCheckout={setCheckout}
            checkoutStatus={checkoutStatus}
            setCheckoutStatus={setCheckoutStatus}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            products={products}
            productIndex={productIndex}
          />
          {displayProductDetails ? (
            <ProductImages currentProduct={currentProduct} />
          ) : (
            <div className="shop-page__column-one column-image">
              <button
                className="shop-page__column-one__button button__sub"
                onClick={indexOptions.sub}
              >
                {"<"}
              </button>
              <div className="shop-page__column-one__image-container">
                <img
                  className="shop-page__column-one__image"
                  src="../../../assets/pictures/finaltube.png"
                  width="900px"
                  height="80%"
                />
              </div>
              {currentProduct.images.length > 1 ? (
                <div
                  className="product-container"
                  onClick={() => {
                    currentProduct.availableForSale
                      ? selectProduct()
                      : setDisplayOutOfStock(true);
                  }}
                >
                  <img
                    className="product"
                    src={images[productIndex]}
                    width="400px"
                    style={{ marginTop: "45px" }}
                    onClick={() => {
                      currentProduct.availableForSale
                        ? selectProduct()
                        : setDisplayOutOfStock(true);
                    }}
                  />
                </div>
              ) : (
                <img className="product" alt="" width="300px" />
              )}
              <button
                className="shop-page__column-one__button button__add"
                onClick={indexOptions.add}
              >
                {">"}
              </button>
              <div className="product-info__absolute">
                <h1
                  className={
                    displayOutOfStock
                      ? "product-info__status-available"
                      : "product-info__status-unavailable"
                  }
                >
                  Out of Stock
                </h1>
                <h2 className="product-info__title">
                  {products[productIndex].title}
                </h2>
                <h2 className="product-info__title">
                  ${products[productIndex].variants[0].price}
                </h2>
                <h2 className="item-number__identifier">
                  {productIndex + 1}/{products.length}
                </h2>
              </div>
            </div>
          )}
          <Product
            products={products}
            selectedVariant={selectedVariant}
            productDescriptionDisplay={productDescriptionDisplay}
            setProductDescriptionDisplay={setProductDescriptionDisplay}
            setSelectedVariant={setSelectedVariant}
            productVariants={productVariants}
            setProductVariants={setProductVariants}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            displayProductDetails={displayProductDetails}
            setDisplayProductDetails={setDisplayProductDetails}
            client={client}
            checkout={checkout}
            setCheckout={setCheckout}
            setCheckoutStatus={setCheckoutStatus}
          />
        </div>
      </div>
    );
  } else {
    return <h1 style={{ fontFamily: "VCR", color: "white" }}>Loading...</h1>;
  }
};

// Checkout
const Checkout = ({
  products,
  productIndex,
  client,
  checkout,
  setCheckout,
  selectedVariant,
  checkoutStatus,
  setCheckoutStatus
}) => {
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
        </div>
        <div className="checkout-content">
          <div className="checkout-list">
            {checkout.lineItems.map(item => {
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
                  <h4 className="item-price">{item.variant.price}</h4>
                </div>
              );
            })}
          </div>
        </div>
        <div className="checkout-footer">
          <h4 className="subtotal">Subtotal: ${checkout.subtotalPrice}</h4>
          <a
            href={`https://antiofficial.myshopify.com/cart/${checkout.id}`}
            className="checkout-hyperlink"
          >
            CHECKOUT
          </a>
        </div>
      </div>
    </div>
  );
};

// Product

const Product = ({
  checkout,
  setCheckout,
  setCheckoutStatus,
  client,
  productDescriptionDisplay,
  setProductDescriptionDisplay,
  currentProduct,
  setCurrentProduct,
  displayProductDetails,
  selectedVariant,
  setSelectedVariant
}) => {
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

  return (
    <div
      className="shop-page__column-two"
      style={displayProductDetails ? { display: "flex" } : { display: "none" }}
    >
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
          onClick={() => {
            setProductDescriptionDisplay(!productDescriptionDisplay);
          }}
        >
          DIMENSIONS
        </button>
        <div
          className={
            productDescriptionDisplay
              ? "product-description"
              : "product-description-hidden"
          }
          dangerouslySetInnerHTML={{ __html: currentProduct.descriptionHtml }}
        />
      </div>
    </div>
  );
};

// Product Images
const ProductImages = ({ currentProduct }) => {
  const currentProductImages = currentProduct.images.slice(
    1,
    currentProduct.images.length
  );
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const imageIndexOptions = {
    add: () => {
      currentImageIndex !== currentProductImages.length - 1
        ? setCurrentImageIndex(currentImageIndex + 1)
        : setCurrentImageIndex(0);
    },
    sub: () => {
      currentImageIndex > 0
        ? setCurrentImageIndex(currentImageIndex - 1)
        : setCurrentImageIndex(currentProductImages.length - 1);
    }
  };

  return (
    <div
      className="shop-page__column-one"
      id="zoomedImg"
      style={{ flexDirection: "column" }}
    >
      <Magnifier
        src={currentProductImages[currentImageIndex].src}
        width={400}
        width="400px"
        mgShape={"square"}
        style={{
          objectFit: "cover",
          objectPosition: "center top",
          display: "block"
        }}
      />
      ;
      <div className="shop-other__images">
        <button
          onClick={imageIndexOptions.sub}
          className="image-button image-button__sub"
        >
          {"<"}
        </button>
        {currentProductImages.map((image, i) => {
          return (
            <img
              key={i}
              src={image.src}
              width="65px"
              height="65px"
              className={
                i === currentImageIndex ? "selected-image" : "unselected-image"
              }
              onClick={() => setCurrentImageIndex(i)}
            />
          );
        })}
        <button
          onClick={imageIndexOptions.add}
          className="image-button image-button__add"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

const Nav = ({
  productDescriptionDisplay,
  setProductDescriptionDisplay,
  setProductVariants,
  currentProduct,
  setSelectedVariant,
  displayProductDetails,
  setDisplayProductDetails,
  setCheckoutStatus
}) => {
  function returnToView() {
    setProductVariants(
      currentProduct.variants.map(v => (v = { ...v, selected: false }))
    );
    setSelectedVariant("");
    setDisplayProductDetails(false);
    setProductDescriptionDisplay(false);
  }
  return (
    <div className="nav">
      <a
        className={!displayProductDetails ? "return" : "return__invisible"}
        href="../../../index.html"
      >
        return
      </a>
      <button
        onClick={() => returnToView()}
        className={displayProductDetails ? "return" : "return__invisible"}
      >
        return
      </button>
      <img
        className="cart"
        onClick={() => setCheckoutStatus(true)}
        src={"../assets/pictures/svg/cart-white.svg"}
      />
    </div>
  );
};

const domContainer = document.querySelector("#shop-page");
ReactDOM.render(<Shop />, domContainer);
