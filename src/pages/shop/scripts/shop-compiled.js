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

  var _React$useState5 = React.useState({}),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      currentProduct = _React$useState6[0],
      setCurrentProduct = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      mounted = _React$useState8[0],
      setMounted = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      displayProductDetails = _React$useState10[0],
      setDisplayProductDetails = _React$useState10[1];

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      checkoutStatus = _React$useState12[0],
      setCheckoutStatus = _React$useState12[1];

  var _React$useState13 = React.useState({}),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      checkout = _React$useState14[0],
      setCheckout = _React$useState14[1];

  var _React$useState15 = React.useState(""),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      selectedVariant = _React$useState16[0],
      setSelectedVariant = _React$useState16[1];

  var indexOptions = {
    add: function add() {
      productIndex !== products.length - 1 ? setProductIndex(productIndex + 1) : setProductIndex(0);
    },
    sub: function sub() {
      productIndex > 0 ? setProductIndex(productIndex - 1) : setProductIndex(products.length - 1);
    }
  };
  var client = ShopifyBuy.buildClient({
    domain: 'antiofficial.myshopify.com',
    storefrontAccessToken: '122b2bd77196392552b87dab7ec18d58'
  });
  React.useEffect(function () {
    client.product.fetchAll().then(function (shopifyProducts) {
      setProducts(shopifyProducts);
      setCurrentProduct(shopifyProducts[0]);
      setMounted(true);
    });
    client.checkout.create().then(function (checkout) {
      setCheckout(checkout);
      console.log(checkout);
      console.log(checkout.id);
    });
  }, []);

  if (mounted) {
    var images = products.map(function (product) {
      return product.images[0].src;
    });
    return React.createElement(
      'div',
      { className: 'shop-page__container', style: { justifyContent: "center", width: "100%" } },
      React.createElement(Checkout, {
        client: client,
        checkout: checkout,
        setCheckout: setCheckout,
        checkoutStatus: checkoutStatus,
        setCheckoutStatus: setCheckoutStatus,
        selectedVariant: selectedVariant,
        setSelectedVariant: setSelectedVariant
      }),
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
        { className: 'shop-page__column-one', style: { width: "1000px" } },
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
            setCurrentProduct(products[productIndex]);
            setDisplayProductDetails(true);
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
        selectedVariant: selectedVariant,
        setSelectedVariant: setSelectedVariant,
        currentProduct: currentProduct,
        displayProductDetails: displayProductDetails,
        setDisplayProductDetails: setDisplayProductDetails,
        client: client,
        checkout: checkout,
        setCheckout: setCheckout,
        setCheckoutStatus: setCheckoutStatus
      })
    );
  } else {
    return React.createElement(
      'h1',
      { style: { fontFamily: "VCR", color: "white" } },
      'Loading...'
    );
  }
};

// Checkout
var Checkout = function Checkout(_ref) {
  var client = _ref.client,
      checkout = _ref.checkout,
      setCheckout = _ref.setCheckout,
      selectedVariant = _ref.selectedVariant,
      checkoutStatus = _ref.checkoutStatus,
      setCheckoutStatus = _ref.setCheckoutStatus;


  function removeFromCheckout(itemId) {
    var checkoutId = checkout.id;
    var lineItemsToRemove = itemId;
    client.checkout.removeLineItems(checkoutId, lineItemsToRemove).then(function (checkout) {
      setCheckout(checkout);
    });
  }

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
              setCheckoutStatus(false);
            } },
          'x'
        ),
        React.createElement(
          'h1',
          null,
          'Cart'
        )
      ),
      React.createElement(
        'div',
        { className: 'checkout-content' },
        React.createElement(
          'div',
          { className: 'checkout-list' },
          checkout.lineItems.map(function (item) {
            return React.createElement(
              'div',
              { className: 'item-line', key: item.id },
              React.createElement(
                'button',
                { className: 'remove-item',
                  onClick: function onClick() {
                    return removeFromCheckout(item.id);
                  }
                },
                'x'
              ),
              React.createElement(
                'h4',
                { className: 'item-size' },
                item.variant.title
              ),
              React.createElement(
                'h4',
                { className: 'item-title' },
                item.title
              ),
              React.createElement(
                'h4',
                { className: 'item-quantity' },
                item.quantity
              ),
              React.createElement(
                'h4',
                { className: 'item-price' },
                item.variant.price
              )
            );
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'checkout-footer' },
        React.createElement(
          'h4',
          { className: 'subtotal' },
          'Subtotal: $',
          checkout.subtotalPrice
        ),
        React.createElement(
          'a',
          { href: 'https://antiofficial.myshopify.com/cart/' + checkout.id,
            className: 'checkout-hyperlink' },
          'CHECKOUT'
        )
      )
    )
  );
};

// Product

var Product = function Product(_ref2) {
  var checkout = _ref2.checkout,
      setCheckout = _ref2.setCheckout,
      checkoutStatus = _ref2.checkoutStatus,
      setCheckoutStatus = _ref2.setCheckoutStatus,
      client = _ref2.client,
      currentProduct = _ref2.currentProduct,
      displayProductDetails = _ref2.displayProductDetails,
      setDisplayProductDetails = _ref2.setDisplayProductDetails,
      selectedVariant = _ref2.selectedVariant,
      setSelectedVariant = _ref2.setSelectedVariant;

  var _React$useState17 = React.useState([]),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      productVariants = _React$useState18[0],
      setProductVariants = _React$useState18[1];

  React.useEffect(function () {
    setProductVariants(currentProduct.variants.map(function (v) {
      return v = Object.assign({}, v, { selected: false });
    }));
  }, []);

  function checkSelected(id) {
    setSelectedVariant(id);
    setProductVariants(currentProduct.variants.map(function (v) {
      return v.id === id ? v = Object.assign({}, v, { selected: true }) : v = Object.assign({}, v, { selected: false });
    }));
  }

  function returnToView() {
    setProductVariants(currentProduct.variants.map(function (v) {
      return v = Object.assign({}, v, { selected: false });
    }));
    setSelectedVariant("");
    setDisplayProductDetails(false);
  }

  function addToCheckout() {
    var lineItemsToAdd = { variantId: selectedVariant, quantity: 1 };
    var checkoutId = checkout.id;
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(function (checkout) {
      setCheckout(checkout);
      console.log(checkout);
    });
    setCheckoutStatus(true);
  }

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
            return returnToView();
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
              onClick: function onClick() {
                return checkSelected(variant.id);
              },
              className: variant.selected ? "selected-variant" : "variant" },
            variant.title
          );
        })
      ),
      React.createElement(
        'button',
        {
          id: 'buy-button',
          onClick: function onClick() {
            return addToCheckout();
          } },
        'ADD TO CART'
      ),
      console.log(currentProduct.description)
    )
  );
};

// Product Images
var ProductImages = function ProductImages(_ref3) {
  var currentProduct = _ref3.currentProduct;

  var currentProductImages = currentProduct.images.slice(1, currentProduct.images.length);

  var _React$useState19 = React.useState(0),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      currentImageIndex = _React$useState20[0],
      setCurrentImageIndex = _React$useState20[1];

  return React.createElement(
    'div',
    { className: 'shop-page__column-one', style: { flexDirection: "column", width: "33%" } },
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

var domContainer = document.querySelector('#shop-page');
ReactDOM.render(React.createElement(Shop, null), domContainer);
