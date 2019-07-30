const Router = ReactRouterDOM.HashRouter
const Route = ReactRouterDOM.Route
const Link = ReactRouterDOM.Link
const Switch = ReactRouterDOM.Switch
const history = History.createBrowserHistory()

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
  const [onProductPage, setOnProductPage] = React.useState(false)
  // const [checkoutGifs, setCheckoutGifs] = React.useState([])
  const [gifs, setGifs] = React.useState([])
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
      // _setCheckoutGifs(shopifyProducts)
    })
    client.checkout.create().then(checkout => {
      setCheckout(checkout)
    })
  }, [])

  // function _setCheckoutGifs(products) {
  //   let tempArr = []
  //   products.map(product => {
  //     tempArr.push({
  //       gifSrc: product.images[product.images.length - 1].src,
  //       title: product.title
  //     })
  //   })
  //   setCheckoutGifs(tempArr)
  // }

  function findGifs(products) {
    let tempArr = products.map(product => product.images[product.images.length - 1].src)
    tempArr.forEach(picture => {
      const img = new Image()
      img.src = picture
    })
    setGifs(tempArr)
  }

  function justProductDescription() {
    const productDesc = products[productIndex].description.split(' ')
    const cutOffNum = productDesc.indexOf('Dimensions')
    const returnProductDesc = productDesc.splice(0, cutOffNum).join(' ')
    setProdDescription(returnProductDesc)
  }

  // console.log(checkoutGifs)

  if (mounted) {
    return (
      <Router history={history}>
        <div style={{ width: "100%", height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
          <Player />
          <Nav
            onProductPage={onProductPage}
            setOnProductPage={setOnProductPage}
            productDescriptionDisplay={productDescriptionDisplay}
            setProductDescriptionDisplay={setProductDescriptionDisplay}
            setCheckoutStatus={setCheckoutStatus}
            setProductVariants={setProductVariants}
            setSelectedVariant={setSelectedVariant}
            displayProductDetails={displayProductDetails}
            setDisplayProductDetails={setDisplayProductDetails}
            currentProduct={currentProduct}
          />
          <Checkout
            gifs={gifs}
            // checkoutGifs={checkoutGifs}
            currentProduct={currentProduct}
            client={client}
            checkout={checkout}
            setCheckout={setCheckout}
            checkoutStatus={checkoutStatus}
            setCheckoutStatus={setCheckoutStatus}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
            currentProduct={currentProduct}
          />
          <div className={
            !onProductPage
              ? "shop-page__container"
              : "shop-page__container-responsive"}>
            <Switch>
              <Route exact path="/" render={(props) =>
                <TubeHologram
                  {...props}
                  products={products}
                  productIndex={productIndex}
                  displayOutOfStock={displayOutOfStock}
                  currentProduct={currentProduct}
                  setCurrentProduct={setCurrentProduct}
                  gifs={gifs}
                  setProductIndex={setProductIndex}
                  setDisplayProductDetails={setDisplayProductDetails}
                  justProductDescription={justProductDescription}
                  setProductVariants={setProductVariants}
                />
              }>
              </Route>
              <Route path="/:id" render={(props) =>
                <ProductPage
                  {...props}
                  onProductPage={onProductPage}
                  setOnProductPage={setOnProductPage}
                  products={products}
                  productVariants={productVariants}
                  prodDescription={prodDescription}
                  checkout={checkout}
                  setCheckout={setCheckout}
                  setCheckoutStatus={setCheckoutStatus}
                  client={client}
                  productDescriptionDisplay={productDescriptionDisplay}
                  setProductVariants={setProductVariants}
                  setProductDescriptionDisplay={setProductDescriptionDisplay}
                  currentProduct={currentProduct}
                  setCurrentProduct={setCurrentProduct}
                  displayProductDetails={displayProductDetails}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  setDisplayProductDetails={setDisplayProductDetails}
                />
              } />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
  else {
    return (
      <h1 style={{ fontFamily: "VCR", color: "white" }}>Loading...</h1>
    )
  }
}

const Nav = ({
  onProductPage,
  setOnProductPage,
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
    setOnProductPage(!onProductPage)
    setSelectedVariant("")
    setDisplayProductDetails(false)
    setProductDescriptionDisplay(false)
    document.getElementsByClassName("dimensions-shopify")[0].style.display = "none"
  }
  return (
    <div className="nav">
      {
        onProductPage ?
          <Link to="/" className="return">
            <button
              onClick={() => returnToView()}
              className="return">
              return</button>
          </Link>
          :
          <a href="../index.html"
            className="return">
            return
          </a>
      }
      <img
        className="cart"
        onClick={() => setCheckoutStatus(true)}
        src={'../assets/pictures/svg/cart-white.svg'}
      />
    </div >
  )
}

const TubeHologram = ({
  products,
  productIndex,
  displayOutOfStock,
  currentProduct,
  setCurrentProduct,
  gifs,
  setProductIndex,
  setDisplayProductDetails,
  justProductDescription,
  setProductVariants,
  match
}) => {

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

  function selectProduct() {
    setDisplayProductDetails(true)
    setCurrentProduct(products[productIndex])
    justProductDescription()
    setProductVariants(
      currentProduct.variants.map(v => v = { ...v, selected: false }))
  }
  let images = gifs
  return (
    <div className="shop-page__column-one column-image">
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
            <Link to={`/${products[productIndex].id}`}>
              <img className="product" src={images[productIndex]}
                onClick={() => {
                  currentProduct.availableForSale ?
                    selectProduct()
                    : setDisplayOutOfStock(true)
                }} />
            </Link>
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
          {`$${products[productIndex].variants[0].price}`}
        </h2>
        <h2 className="item-number__identifier">{productIndex + 1}/{products.length}</h2>
      </div>
    </div>
  )
}

const ProductPage = ({
  setOnProductPage,
  products,
  checkout,
  setCheckout,
  setCheckoutStatus,
  client,
  currentProduct,
  setCurrentProduct,
  selectedVariant,
  setProductVariants,
  setSelectedVariant,
  match
}) => {
  React.useEffect(() => {
    setOnProductPage(true)
    products.map((p, i) => {
      if (p.id === match.params.id) {
        setCurrentProduct(p)
      }
    })
  }, [])
  return (
    <div className="shop-page__container-responsive-product">
      <ProductImages
        currentProduct={currentProduct}
      />
      <Product
        checkout={checkout}
        setCheckout={setCheckout}
        setCheckoutStatus={setCheckoutStatus}
        client={client}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />
    </div>
  )
}

const Product = ({
  checkout,
  setCheckout,
  setCheckoutStatus,
  client,
  currentProduct,
  setCurrentProduct,
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

  function displayDimensions() {
    const dimensionsClass = document.getElementsByClassName("dimensions-shopify")
    dimensionsClass[0].style.display === "block" ?
      dimensionsClass[0].style.display = "none"
      : dimensionsClass[0].style.display = "block"
  }

  return (
    <div className="shop-page__column-two">
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
          onClick={() => displayDimensions()}>
          DIMENSIONS
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: currentProduct.descriptionHtml }}>
        </div>
      </div>
    </div >
  )
}

const ProductImages = ({ currentProduct }) => {
  const currentProductImages = currentProduct.images.slice(0, currentProduct.images.length - 1)
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
    <div className="shop-page__product-column zoom" id="zoomedImg" style={{ flexDirection: "column" }}>
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
  checkoutGifs,
  client,
  checkout,
  setCheckout,
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
              checkout.lineItems.length > 0 ?
                checkout.lineItems.map((item, i) => {
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
                : <h4 className="checkout-empty"> YOUR CART IS EMPTY</h4>
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
const domContainer = document.querySelector('#shop-page')
ReactDOM.render(<Shop />, domContainer)