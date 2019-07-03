
const Shop = () => {

  const [mounted, setMounted] = React.useState(false)
  const [products, setProducts] = React.useState([])
  const [productIndex, setProductIndex] = React.useState(0)

  React.useEffect(() => {
    const client = ShopifyBuy.buildClient({
      domain: 'antiofficial.myshopify.com',
      storefrontAccessToken: 'afa4e820570a727304c2c1fc6768443f'
    });
    client.product.fetchAll().then((shopifyProducts) => {
      setProducts(shopifyProducts)
      setMounted(true)
    })
  }, [])

  if (mounted) {
    return (
      <div className="shop-page__container">
        <a id="return" href="../../../index.html">return</a>
        <div className="shop-page__column-one">
          <img className="shop-page__column-one__image" src="../../../assets/pictures/finaltube.png" width="900px"
            height="95%" />
          <img id="product" src='' width="300px" />
        </div>
        <Product
          products={products}
          productIndex={productIndex}
        />
      </div>
    )
  } else {
    return <h1>Loading</h1>
  }
}

const Product = ({ products, productIndex }) => {
  let currentProduct = products[productIndex]
  console.log(currentProduct)
  return (
    <div className="shop-page__column-two">
      <div className="shop-page__column-two-section">
        <h1>{currentProduct.title}</h1>
      </div>
      <div className="shop-page__column-two-section">
        <h3>{currentProduct.variants[0].price}</h3>
        <span>{currentProduct.description}</span>
      </div>
    </div>
  )
}

const domContainer = document.querySelector('#shop-page')
ReactDOM.render(<Shop />, domContainer)