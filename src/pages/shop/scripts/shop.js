const Shop = () => {
  const [products, setProducts] = React.useState([])
  const [productIndex, setProductIndex] = React.useState(0)
  const [currentProduct, setCurrentProduct] = React.useState({})
  const [productVariants, setProductVariants] = React.useState([])
  const [mounted, setMounted] = React.useState(false)
  const [displayProductDetails, setDisplayProductDetails] = React.useState(false)
  const [checkoutStatus, setCheckoutStatus] = React.useState(false)
  const [checkout, setCheckout] = React.useState({})
  const [selectedVariant, setSelectedVariant] = React.useState("")
  const [displayOutOfStock, setDisplayOutOfStock] = React.useState(false)
  const [productDescriptionDisplay, setProductDescriptionDisplay] = React.useState(false)
  const [prodDescription, setProdDescription] = React.useState('')
  const [gifs, setGifs] = React.useState([])
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
      findGifs(shopifyProducts)
      console.log(shopifyProducts)
    })
    client.checkout.create().then(checkout => {
      setCheckout(checkout)
    })
  }, [])

  function findGifs(products) {
    const tempProducts = products
    let tempArr = []
    tempProducts.map((product) => {
      tempArr.push(product.images[product.images.length - 1].src)
    })
    setGifs(tempArr)
  }

  function selectProduct() {
    setDisplayProductDetails(true)
    setCurrentProduct(products[productIndex])
    justProductDescription()
    setProductVariants(
      currentProduct.variants.map(v => v = { ...v, selected: false }))
  }

  function justProductDescription() {
    const productDesc = products[productIndex].description.split(' ')
    const cutOffNum = productDesc.indexOf('Dimensions')
    const returnProductDesc = productDesc.splice(0, cutOffNum).join(' ')
    setProdDescription(returnProductDesc)
  }


  if (mounted) {
    let images = gifs

    return (
      <div style={{ width: "100%", height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
        <Player />
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
        <div className={
          window.innerWidth < 651 ?
            !displayProductDetails
              ? "shop-page__container"
              : "shop-page__container-responsive"
            : "shop-page__container"}>
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
          {
            displayProductDetails ?
              <ProductImages
                currentProduct={currentProduct}
              />
              : <div className="shop-page__column-one column-image">
                <button className="shop-page__column-one__button button__sub"
                  onClick={indexOptions.sub}>{"<"}</button>
                <div className="shop-page__column-one__image-container">
                  <img className="shop-page__column-one__image" src="../../../assets/pictures/finaltube.png" />
                </div>
                {
                  currentProduct.images.length > 1 ?
                    <div className="product-container"
                      onClick={() => {
                        currentProduct.availableForSale ?
                          selectProduct()
                          : setDisplayOutOfStock(true)
                      }}>
                      <img className="product" src={images[productIndex]}
                        onClick={() => {
                          currentProduct.availableForSale ?
                            selectProduct()
                            : setDisplayOutOfStock(true)
                        }} />
                    </div>
                    : <img className="product" alt="" width="300px" />
                }
                <button className="shop-page__column-one__button button__add"
                  onClick={indexOptions.add}>{">"}</button>
                <div className="product-info__absolute">
                  <h1 className={displayOutOfStock
                    ? "product-info__status-available"
                    : "product-info__status-unavailable"}>
                    Out of Stock
                </h1>
                  <h2 className="product-info__title">
                    {products[productIndex].title}
                  </h2>
                  <h2 className="product-info__title">
                    {products[productIndex].variants[0].price}
                  </h2>
                  <h2 className="item-number__identifier">{productIndex + 1}/{products.length}</h2>
                </div>
              </div>
          }
          <Product
            prodDescription={prodDescription}
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
    )
  }
  else {
    return (
      <h1 style={{ fontFamily: "VCR", color: "white" }}>Loading...</h1>
    )
  }
}

const useAudio = () => {
  const [audio] = React.useState(new Audio('../../../assets/music/speeding+looped.mp3'));
  const [playing, setPlaying] = React.useState(true);

  const toggle = () => setPlaying(!playing);

  React.useEffect(
    () => {
      playing ? audio.play() : audio.pause()
    },
    [playing]
  )

  return [playing, toggle];
}

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <button className="player-toggle" onClick={toggle}>{playing ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}</button>
  )
}

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
      currentProduct.variants.map(v => v = { ...v, selected: false })
    )
    setSelectedVariant("")
    setDisplayProductDetails(false)
    setProductDescriptionDisplay(false)
  }
  return (
    <div className="nav">
      <a className={
        !displayProductDetails
          ? "return"
          : "return__invisible"
      }
        href="../../../index.html">return</a>
      <button
        onClick={() => returnToView()}
        className={
          displayProductDetails
            ? "return"
            : "return__invisible"
        }
      >return</button>
      <img
        className="cart"
        onClick={() => setCheckoutStatus(true)}
        src={'../assets/pictures/svg/cart-white.svg'}
      />
    </div >
  )
}

const Product = ({
  prodDescription,
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
    setSelectedVariant(id)
    setCurrentProduct({
      ...currentProduct,
      variants: currentProduct.variants.map(v => v.id === id ? v = { ...v, selected: true }
        : v = { ...v, selected: false })
    })
  }

  function addToCheckout() {
    let lineItemsToAdd = { variantId: selectedVariant, quantity: 1 }
    const checkoutId = checkout.id
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
      setCheckout(checkout)
    })
    selectedVariant !== "" ?
      setCheckoutStatus(true) :
      setCheckoutStatus(false)
  }

  return (
    <div className="shop-page__column-two" style={displayProductDetails ?
      { display: "flex" }
      : { display: "none" }}>
      <div className="shop-page__column-two-section">
        <h1>{currentProduct.title}</h1>
      </div>
      <div className="shop-page__column-two-section">
        <h2>${currentProduct.variants[0].price}</h2>
        <div className="variant-button__container">
          {
            currentProduct.variants.map((variant, i) => {
              return (
                <button
                  key={i}
                  onClick={
                    () => variant.available
                      ? checkSelected(variant.id)
                      : null
                  }
                  className={
                    variant.available ?
                      variant.selected
                        ? "selected-variant"
                        : "variant"
                      : "out-of-stock__variant"
                  }>
                  {variant.title}
                </button>
              )
            })
          }
        </div>
        <button
          className="buy-button"
          onClick={() => addToCheckout()}>
          ADD TO CART
          </button>
        <button
          className="buy-button dimensions"
          onClick={() => {
            setProductDescriptionDisplay(!productDescriptionDisplay)
          }}>
          DIMENSIONS
        </button>
        <p>{prodDescription}</p>
        <div
          className={productDescriptionDisplay ? "product-description" : "product-description-hidden"}
          dangerouslySetInnerHTML={{ __html: currentProduct.descriptionHtml }}
        />
      </div>
    </div >
  )
}

const ProductImages = ({ currentProduct }) => {
  const currentProductImages = currentProduct.images.slice(1, currentProduct.images.length)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const imageIndexOptions = {
    add: () => {
      currentImageIndex !== currentProductImages.length - 1 ?
        setCurrentImageIndex(currentImageIndex + 1)
        : setCurrentImageIndex(0)
    },
    sub: () => {
      currentImageIndex > 0 ?
        setCurrentImageIndex(currentImageIndex - 1)
        : setCurrentImageIndex(currentProductImages.length - 1)
    }
  }

  return (
    <div className="shop-page__column-one zoom" id="zoomedImg" style={{ flexDirection: "column" }}>
      <img
        className="product-image"
        src={currentProductImages[currentImageIndex].src}
      // style={{ objectFit: "cover", "objectPosition": "center top" }}
      />
      <div className="shop-other__images">
        <button
          onClick={imageIndexOptions.sub}
          className="image-button image-button__sub"
        >{"<"}</button>
        {
          currentProductImages.map((image, i) => {
            return <img key={i}
              src={image.src}
              className={i === currentImageIndex ? 'selected-image' : 'unselected-image'}
              onClick={() =>
                setCurrentImageIndex(i)}
            />
          })
        }
        <button
          onClick={imageIndexOptions.add}
          className="image-button image-button__add"
        >{">"}</button>
      </div>
    </div>
  )
}

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
            {
              checkout.lineItems.map(item => {
                return (
                  <div className="item-line" key={item.id}>
                    <button className="remove-item"
                      onClick={() => removeFromCheckout(item.id)}
                    >x</button>
                    <img className="checkout-img" src={item.variant.image.src} />
                    <h4 className="item-size">{item.variant.title}</h4>
                    <h4 className="item-title">{item.title}</h4>
                    <h4 className="item-quantity">{item.quantity}</h4>
                    <h4 className="item-price">${item.variant.price}</h4>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="checkout-footer">
          <h4 className="subtotal">Subtotal: ${checkout.subtotalPrice}</h4>
          <a href={checkout.webUrl}
            className="checkout-hyperlink">
            CHECKOUT
            </a>
        </div>
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#shop-page')
ReactDOM.render(
  // <Router history={browserHistory}>
  //   <Route path="/shop" component={Shop}/>
  // </Router>
  <Shop />, domContainer)