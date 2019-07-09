const Shop = () => {
  const [products, setProducts] = React.useState([])
  const [productIndex, setProductIndex] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)
  const [displayProductDetails, setDisplayProductDetails] = React.useState(false)
  const [checkoutStatus, setCheckoutStatus] = React.useState(false)
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
  React.useEffect(() => {
    const client = ShopifyBuy.buildClient({
      domain: 'antiofficial.myshopify.com',
      storefrontAccessToken: '122b2bd77196392552b87dab7ec18d58'
    })
    client.product.fetchAll().then(shopifyProducts => {
      setProducts(shopifyProducts)
      setMounted(true)
    })
    client.checkout.create().then(checkout => console.log(checkout))
  }, [])

  if (mounted) {
    let currentProduct = products[productIndex]
    let images = products.map(product => product.images[0].src)
    return (
      <div className="shop-page__container" style={{ justifyContent: "center" }}>
        <Checkout
          checkoutStatus={checkoutStatus}
          setCheckoutStatus={setCheckoutStatus} />
        <a id="return" href="../../../index.html">return</a>
        <button className="cart" onClick={() => setCheckoutStatus(true)} >cart</button>
        {
          displayProductDetails ?
            <ProductImages
              currentProduct={currentProduct}
            />
            : <div className="shop-page__column-one">
              <button className="shop-page__column-one__button button__sub"
                onClick={indexOptions.sub}>{"<"}</button>
              <img className="shop-page__column-one__image" src="../../../assets/pictures/finaltube.png"
                width="1000px" height="95%" />
              {
                currentProduct.images.length > 1 ?
                  <img id="product" src={images[productIndex]} width="375px" style={{ marginTop: "45px" }}
                    onClick={() => setDisplayProductDetails(true)} />
                  : <img id="product" alt="" width="300px" />
              }
              <button className="shop-page__column-one__button button__add"
                onClick={indexOptions.add}>{">"}</button>
              <h3 className="item-number__identifier">{productIndex + 1}/{products.length}</h3>
            </div>
        }
        <Product
          products={products}
          currentProduct={currentProduct}
          displayProductDetails={displayProductDetails}
          setDisplayProductDetails={setDisplayProductDetails}
        />
      </div >
    )
  }
  else {
    return (
      <h1>Loading...</h1>
    )
  }
}

const Product = ({ currentProduct, displayProductDetails, setDisplayProductDetails }) => {
  const productVariants = currentProduct.variants
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
            productVariants.map((variant, i) => <button
              key={i}
              className="variant">{variant.title}</button>)
          }
        </div>
        <h3 id="buy-button">ADD TO CART</h3>
        <span>{currentProduct.description}</span>
      </div>
    </div >
  )
}

const ProductImages = ({ currentProduct }) => {
  const currentProductImages = currentProduct.images.slice(1, currentProduct.images.length)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  return (
    <div className="shop-page__column-one" style={{ flexDirection: "column" }}>
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

const Checkout = ({ checkoutStatus, setCheckoutStatus }) => {
  return (
    <div className={checkoutStatus ? "checkout visible" : "checkout invisible"}>
      <div className="checkout-container">
        <div className="checkout-header">
          <button
            className="checkout-exit"
            onClick={() => setCheckoutStatus(false)}>
            x
          </button>
          <h1>checkout</h1>
        </div>
        <div className="checkout-content">

        </div>
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#shop-page')
ReactDOM.render(<Shop />, domContainer)