var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Shop = function Shop() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      products = _React$useState2[0],
      setProducts = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      productIndex = _React$useState4[0],
      setProductIndex = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      mounted = _React$useState6[0],
      setMounted = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      displayProductDetails = _React$useState8[0],
      setDisplayProductDetails = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      checkoutStatus = _React$useState10[0],
      setCheckoutStatus = _React$useState10[1];

  var indexOptions = {
    add: function add() {
      productIndex !== products.length - 1 ? setProductIndex(productIndex + 1) : setProductIndex(0);
    },
    sub: function sub() {
      productIndex > 0 ? setProductIndex(productIndex - 1) : setProductIndex(products.length - 1);
    }
  };
  React.useEffect(function () {
    var client = ShopifyBuy.buildClient({
      domain: 'antiofficial.myshopify.com',
      storefrontAccessToken: '122b2bd77196392552b87dab7ec18d58'
    });
    client.product.fetchAll().then(function (shopifyProducts) {
      setProducts(shopifyProducts);
      setMounted(true);
    });
    client.checkout.create().then(function (checkout) {
      return console.log(checkout);
    });
  }, []);

  if (mounted) {
    var currentProduct = products[productIndex];
    var images = products.map(function (product) {
      return product.images[0].src;
    });
    return React.createElement(
      'div',
      { className: 'shop-page__container', style: { justifyContent: "center" } },
      React.createElement(Checkout, {
        checkoutStatus: checkoutStatus,
        setCheckoutStatus: setCheckoutStatus }),
      React.createElement(
        'a',
        { id: 'return', href: '../../../index.html' },
        'return'
      ),
      React.createElement(
        'button',
        { className: 'cart', onClick: function onClick() {
            return setCheckoutStatus(true);
          } },
        'cart'
      ),
      displayProductDetails ? React.createElement(ProductImages, {
        currentProduct: currentProduct
      }) : React.createElement(
        'div',
        { className: 'shop-page__column-one' },
        React.createElement(
          'button',
          { className: 'shop-page__column-one__button button__sub',
            onClick: indexOptions.sub },
          "<"
        ),
        React.createElement('img', { className: 'shop-page__column-one__image', src: '../../../assets/pictures/finaltube.png',
          width: '1000px', height: '95%' }),
        currentProduct.images.length > 1 ? React.createElement('img', { id: 'product', src: images[productIndex], width: '375px', style: { marginTop: "45px" },
          onClick: function onClick() {
            return setDisplayProductDetails(true);
          } }) : React.createElement('img', { id: 'product', alt: '', width: '300px' }),
        React.createElement(
          'button',
          { className: 'shop-page__column-one__button button__add',
            onClick: indexOptions.add },
          ">"
        ),
        React.createElement(
          'h3',
          { className: 'item-number__identifier' },
          productIndex + 1,
          '/',
          products.length
        )
      ),
      React.createElement(Product, {
        products: products,
        currentProduct: currentProduct,
        displayProductDetails: displayProductDetails,
        setDisplayProductDetails: setDisplayProductDetails
      })
    );
  } else {
    return React.createElement(
      'h1',
      null,
      'Loading...'
    );
  }
};

var Product = function Product(_ref) {
  var currentProduct = _ref.currentProduct,
      displayProductDetails = _ref.displayProductDetails,
      setDisplayProductDetails = _ref.setDisplayProductDetails;

  var productVariants = currentProduct.variants;
  return React.createElement(
    'div',
    { className: 'shop-page__column-two', style: displayProductDetails ? { display: "flex" } : { display: "none" } },
    React.createElement(
      'div',
      { className: 'shop-page__column-two-section' },
      React.createElement(
        'button',
        { className: 'remove-details__button',
          onClick: function onClick() {
            return setDisplayProductDetails(false);
          },
          style: { fontFamily: "VCR" }
        },
        'x'
      ),
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
        'h2',
        null,
        '$',
        currentProduct.variants[0].price
      ),
      React.createElement(
        'div',
        { className: 'variant-button__container' },
        productVariants.map(function (variant, i) {
          return React.createElement(
            'button',
            {
              key: i,
              className: 'variant' },
            variant.title
          );
        })
      ),
      React.createElement(
        'h3',
        { id: 'buy-button' },
        'ADD TO CART'
      ),
      React.createElement(
        'span',
        null,
        currentProduct.description
      )
    )
  );
};

var ProductImages = function ProductImages(_ref2) {
  var currentProduct = _ref2.currentProduct;

  var currentProductImages = currentProduct.images.slice(1, currentProduct.images.length);

  var _React$useState11 = React.useState(0),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      currentImageIndex = _React$useState12[0],
      setCurrentImageIndex = _React$useState12[1];

  return React.createElement(
    'div',
    { className: 'shop-page__column-one', style: { flexDirection: "column" } },
    React.createElement('img', { src: currentProductImages[currentImageIndex].src, width: '400px' }),
    React.createElement(
      'div',
      { className: 'shop-other__images', style: {
          display: "flex",
          justifyContent: "space-evenly"
        } },
      currentProductImages.map(function (image, i) {
        return React.createElement('img', { key: i,
          onClick: function onClick() {
            setCurrentImageIndex(i);
          },
          src: image.src,
          width: '75px',
          height: '75px',
          style: {},
          className: i === currentImageIndex ? 'selected-image' : 'unselected-image'
        });
      })
    )
  );
};

var Checkout = function Checkout(_ref3) {
  var checkoutStatus = _ref3.checkoutStatus,
      setCheckoutStatus = _ref3.setCheckoutStatus;

  return React.createElement(
    'div',
    { className: checkoutStatus ? "checkout visible" : "checkout invisible" },
    React.createElement(
      'div',
      { className: 'checkout-container' },
      React.createElement(
        'div',
        { className: 'checkout-header' },
        React.createElement(
          'button',
          {
            className: 'checkout-exit',
            onClick: function onClick() {
              return setCheckoutStatus(false);
            } },
          'x'
        ),
        React.createElement(
          'h1',
          null,
          'checkout'
        )
      ),
      React.createElement('div', { className: 'checkout-content' })
    )
  );
};

var domContainer = document.querySelector('#shop-page');
ReactDOM.render(React.createElement(Shop, null), domContainer);
