var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Shop = function Shop() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      mounted = _React$useState2[0],
      setMounted = _React$useState2[1];

  var _React$useState3 = React.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      products = _React$useState4[0],
      setProducts = _React$useState4[1];

  var _React$useState5 = React.useState(0),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      productIndex = _React$useState6[0],
      setProductIndex = _React$useState6[1];

  React.useEffect(function () {
    var client = ShopifyBuy.buildClient({
      domain: 'antiofficial.myshopify.com',
      storefrontAccessToken: 'afa4e820570a727304c2c1fc6768443f'
    });
    client.product.fetchAll().then(function (shopifyProducts) {
      setProducts(shopifyProducts);
      setMounted(true);
    });
  }, []);

  if (mounted) {
    return React.createElement(
      'div',
      { className: 'shop-page__container' },
      React.createElement(
        'a',
        { id: 'return', href: '../../../index.html' },
        'return'
      ),
      React.createElement(
        'div',
        { className: 'shop-page__column-one' },
        React.createElement('img', { className: 'shop-page__column-one__image', src: '../../../assets/pictures/finaltube.png', width: '900px',
          height: '95%' }),
        React.createElement('img', { id: 'product', src: '', width: '300px' })
      ),
      React.createElement(Product, {
        products: products,
        productIndex: productIndex
      })
    );
  } else {
    return React.createElement(
      'h1',
      null,
      'Loading'
    );
  }
};

var Product = function Product(_ref) {
  var products = _ref.products,
      productIndex = _ref.productIndex;

  var currentProduct = products[productIndex];
  console.log(currentProduct);
  return React.createElement(
    'div',
    { className: 'shop-page__column-two' },
    React.createElement(
      'div',
      { className: 'shop-page__column-two-section' },
      React.createElement(
        'h1',
        null,
        currentProduct.title
      )
    ),
    React.createElement(
      'div',
      { className: 'shop-page__column-two-section' },
      React.createElement(
        'h3',
        null,
        currentProduct.variants[0].price
      ),
      React.createElement(
        'span',
        null,
        currentProduct.description
      )
    )
  );
};

var domContainer = document.querySelector('#shop-page');
ReactDOM.render(React.createElement(Shop, null), domContainer);