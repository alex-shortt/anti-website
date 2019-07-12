const Shop = () => {
  const [products, setProducts] = React.useState([])
  const [productIndex, setProductIndex] = React.useState(0)
  const [currentProduct, setCurrentProduct] = React.useState({})
  const [mounted, setMounted] = React.useState(false)
  const [displayProductDetails, setDisplayProductDetails] = React.useState(false)
  const [checkoutStatus, setCheckoutStatus] = React.useState(false)
  const [checkout, setCheckout] = React.useState({})
  const [selectedVariant, setSelectedVariant] = React.useState("")
  const indexOptions = {
    add: () => {
      productIndex !== products.length - 1 ?
        setProductIndex(productIndex + 1)
        : setProductIndex(0)
    },
    sub: () => {
      productIndex > 0 ?
        setProductIndex(productIndex - 1)
        : setProductIndex(products.length - 1)
    }
  }
  const client = ShopifyBuy.buildClient({
    domain: 'antiofficial.myshopify.com',
    storefrontAccessToken: '122b2bd77196392552b87dab7ec18d58'
  })
  React.useEffect(() => {
    client.product.fetchAll().then(shopifyProducts => {
      setProducts(shopifyProducts)
      setCurrentProduct(shopifyProducts[0])
      setMounted(true)
    })
    client.checkout.create().then(checkout => {
      setCheckout(checkout)
      console.log(checkout)
      console.log(checkout.id)
    })
  }, [])

  if (mounted) {
    let images = products.map(product => product.images[0].src)
    return (
      <div className="shop-page__container" style={{ justifyContent: "center", width: "100%" }}>
        <Checkout
          client={client}
          checkout={checkout}
          setCheckout={setCheckout}
          checkoutStatus={checkoutStatus}
          setCheckoutStatus={setCheckoutStatus}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        <a id="return" href="../../../index.html">return</a>
        <button className="cart" onClick={() => setCheckoutStatus(true)}>cart</button>
        {
          displayProductDetails ?
            <ProductImages
              currentProduct={currentProduct}
            />
            : <div className="shop-page__column-one" style={{ width: "1000px" }}>
              <button className="shop-page__column-one__button button__sub"
                onClick={indexOptions.sub}>{"<"}</button>
              <img className="shop-page__column-one__image" src="../../../assets/pictures/finaltube.png"
                width="1000px" height="95%" />
              {
                currentProduct.images.length > 1 ?
                  <img id="product" src={images[productIndex]} width="375px" style={{ marginTop: "45px" }}
                    onClick={() => {
                      setCurrentProduct(products[productIndex])
                      setDisplayProductDetails(true)
                    }} />
                  : <img id="product" alt="" width="300px" />
              }
              <button className="shop-page__column-one__button button__add"
                onClick={indexOptions.add}>{">"}</button>
              <h3 className="item-number__identifier">{productIndex + 1}/{products.length}</h3>
            </div>
        }
        <Product
          products={products}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          currentProduct={currentProduct}
          displayProductDetails={displayProductDetails}
          setDisplayProductDetails={setDisplayProductDetails}
          client={client}
          checkout={checkout}
          setCheckout={setCheckout}
          setCheckoutStatus={setCheckoutStatus}
        />
      </div >
    )
  }
  else {
    return (
      <h1 style={{ fontFamily: "VCR", color: "white" }}>Loading...</h1>
    )
  }
}

// Checkout
const Checkout = ({
  client,
  checkout,
  setCheckout,
  selectedVariant,
  checkoutStatus,
  setCheckoutStatus
}) => {

  function removeFromCheckout(itemId) {
    const checkoutId = checkout.id
    let lineItemsToRemove = itemId
    client.checkout.removeLineItems(checkoutId, lineItemsToRemove).then((checkout) => {
      setCheckout(checkout)
    })
  }

  return (
    <div className={checkoutStatus ? "checkout visible" : "checkout invisible"}>
      <div className="checkout-container">
        <div className="checkout-header">
          <button
            className="checkout-exit"
            onClick={() => {
              setCheckoutStatus(false)
            }}>
            x
          </button>
          <h1>Cart</h1>
        </div>
        <div className="checkout-content">
          <div className="checkout-list">
            {
              checkout.lineItems.map(item => {
                return (
                  <div className="item-line" key={item.id}>
                    <button className="remove-item"
                      onClick={() => removeFromCheckout(item.id)}
                    >x</button>
                    <h4 className="item-size">{item.variant.title}</h4>
                    <h4 className="item-title">{item.title}</h4>
                    <h4 className="item-quantity">{item.quantity}</h4>
                    <h4 className="item-price">{item.variant.price}</h4>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="checkout-footer">
          <h4 className="subtotal">Subtotal: ${checkout.subtotalPrice}</h4>
          <a href={`https://antiofficial.myshopify.com/cart/${checkout.id}`}
            className="checkout-hyperlink">
            CHECKOUT
            </a>
        </div>
      </div>
    </div>
  )
}

// Product

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
  const [productVariants, setProductVariants] = React.useState([])

  React.useEffect(() => {
    setProductVariants(
      currentProduct.variants.map(v => v = { ...v, selected: false }))
  }, [])

  function checkSelected(id) {
    setSelectedVariant(id)
    setProductVariants(
      currentProduct.variants.map(v => v.id === id ? v = { ...v, selected: true }
        : v = { ...v, selected: false })
    )
  }

  function returnToView() {
    setProductVariants(
      currentProduct.variants.map(v => v = { ...v, selected: false })
    )
    setSelectedVariant("")
    setDisplayProductDetails(false)
  }

  function addToCheckout() {
    let lineItemsToAdd = { variantId: selectedVariant, quantity: 1 }
    const checkoutId = checkout.id
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
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
          onClick={() => returnToView()}
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
                  onClick={() => checkSelected(variant.id)}
                  className={
                    variant.selected
                      ? "selected-variant"
                      : "variant"
                  }>
                  {variant.title}
                </button>
              )
            })
          }
        </div>
        <button
          id="buy-button"
          onClick={() => addToCheckout()}>
          ADD TO CART
          </button>
        {console.log(currentProduct.description)}
      </div>
    </div >
  )
}

// Product Images
const ProductImages = ({ currentProduct }) => {
  const currentProductImages = currentProduct.images.slice(1, currentProduct.images.length)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  return (
    <div className="shop-page__column-one" style={{ flexDirection: "column", width: "33%" }}>
      <img src={currentProductImages[currentImageIndex].src} width="400px" />
      <div className="shop-other__images" style={{
        display: "flex",
        justifyContent: "space-evenly"
      }}>
        {
          currentProductImages.map((image, i) => {
            return <img key={i}
              onClick={() => {
                setCurrentImageIndex(i)
              }}
              src={image.src}
              width="75px"
              height="75px"
              style={{}}
              className={i === currentImageIndex ? 'selected-image' : 'unselected-image'}
            />
          })
        }
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#shop-page')
ReactDOM.render(<Shop />, domContainer)