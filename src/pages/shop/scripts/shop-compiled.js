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

  var _React$useState7 = React.useState([]),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      productVariants = _React$useState8[0],
      setProductVariants = _React$useState8[1];

  var _React$useState9 = React.useState(false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      mounted = _React$useState10[0],
      setMounted = _React$useState10[1];

  var _React$useState11 = React.useState(false),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      displayProductDetails = _React$useState12[0],
      setDisplayProductDetails = _React$useState12[1];

  var _React$useState13 = React.useState(false),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      checkoutStatus = _React$useState14[0],
      setCheckoutStatus = _React$useState14[1];

  var _React$useState15 = React.useState({}),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      checkout = _React$useState16[0],
      setCheckout = _React$useState16[1];

  var _React$useState17 = React.useState(""),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      selectedVariant = _React$useState18[0],
      setSelectedVariant = _React$useState18[1];

  var _React$useState19 = React.useState(false),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      displayOutOfStock = _React$useState20[0],
      setDisplayOutOfStock = _React$useState20[1];

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
      console.log(shopifyProducts);
    });
    client.checkout.create().then(function (checkout) {
      setCheckout(checkout);
    });
  }, []);

  function selectProduct() {
    setCurrentProduct(products[productIndex]);
    setProductVariants(currentProduct.variants.map(function (v) {
      return v = Object.assign({}, v, { selected: false });
    }));
    setDisplayProductDetails(true);
  }

  if (mounted) {
    var images = products.map(function (product) {
      return product.images[0].src;
    });
    return React.createElement(
      'div',
      { style: { width: "100%", height: "100vh", overflowY: "auto" } },
      React.createElement(Nav, {
        setCheckoutStatus: setCheckoutStatus,
        setProductVariants: setProductVariants,
        setSelectedVariant: setSelectedVariant,
        displayProductDetails: displayProductDetails,
        setDisplayProductDetails: setDisplayProductDetails,
        currentProduct: currentProduct
      }),
      React.createElement(
        'div',
        { className: "shop-page__container shop-page__container-responsive", style: { justifyContent: "space-evenly", width: "100%" } },
        React.createElement(Checkout, {
          client: client,
          checkout: checkout,
          setCheckout: setCheckout,
          checkoutStatus: checkoutStatus,
          setCheckoutStatus: setCheckoutStatus,
          selectedVariant: selectedVariant,
          setSelectedVariant: setSelectedVariant,
          products: products,
          productIndex: productIndex
        }),
        displayProductDetails ? React.createElement(ProductImages, {
          currentProduct: currentProduct
        }) : React.createElement(
          'div',
          { className: 'shop-page__column-one column-image' },
          React.createElement(
            'button',
            { className: 'shop-page__column-one__button button__sub',
              onClick: indexOptions.sub },
            "<"
          ),
          React.createElement(
            'div',
            { className: 'shop-page__column-one__image-container' },
            React.createElement('img', { className: 'shop-page__column-one__image', src: '../../../assets/pictures/finaltube.png',
              width: '900px', height: '80%' })
          ),
          currentProduct.images.length > 1 ? React.createElement(
            'div',
            { className: 'product-container',
              onClick: function onClick() {
                currentProduct.availableForSale ? selectProduct() : setDisplayOutOfStock(true);
              }
            },
            React.createElement('img', { className: 'product', src: images[productIndex], width: '400px', style: { marginTop: "45px" },
              onClick: function onClick() {
                currentProduct.availableForSale ? selectProduct() : setDisplayOutOfStock(true);
              } })
          ) : React.createElement('img', { className: 'product', alt: '', width: '300px' }),
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
          ),
          React.createElement(
            'div',
            { className: 'product-info__absolute' },
            React.createElement(
              'h1',
              { className: displayOutOfStock ? "product-info__status-available" : "product-info__status-unavailable" },
              'Out of Stock'
            ),
            React.createElement(
              'h2',
              { className: 'product-info__title' },
              products[productIndex].title
            ),
            React.createElement(
              'h3',
              { className: 'product-info__title' },
              products[productIndex].variants[0].price
            )
          )
        ),
        React.createElement(Product, {
          products: products,
          selectedVariant: selectedVariant,
          setSelectedVariant: setSelectedVariant,
          productVariants: productVariants,
          setProductVariants: setProductVariants,
          currentProduct: currentProduct,
          setCurrentProduct: setCurrentProduct,
          displayProductDetails: displayProductDetails,
          setDisplayProductDetails: setDisplayProductDetails,
          client: client,
          checkout: checkout,
          setCheckout: setCheckout,
          setCheckoutStatus: setCheckoutStatus
        })
      )
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
  var products = _ref.products,
      productIndex = _ref.productIndex,
      client = _ref.client,
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
              React.createElement('img', { className: 'checkout-img', src: item.variant.image.src }),
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
      productVariants = _ref2.productVariants,
      setProductVariants = _ref2.setProductVariants,
      checkoutStatus = _ref2.checkoutStatus,
      setCheckoutStatus = _ref2.setCheckoutStatus,
      client = _ref2.client,
      currentProduct = _ref2.currentProduct,
      setCurrentProduct = _ref2.setCurrentProduct,
      displayProductDetails = _ref2.displayProductDetails,
      setDisplayProductDetails = _ref2.setDisplayProductDetails,
      selectedVariant = _ref2.selectedVariant,
      setSelectedVariant = _ref2.setSelectedVariant;

  var _React$useState21 = React.useState(false),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      productDescriptionDisplay = _React$useState22[0],
      setProductDescriptionDisplay = _React$useState22[1];

  function checkSelected(id) {
    setSelectedVariant(id);
    setCurrentProduct(Object.assign({}, currentProduct, {
      variants: currentProduct.variants.map(function (v) {
        return v.id === id ? v = Object.assign({}, v, { selected: true }) : v = Object.assign({}, v, { selected: false });
      })
    }));
  }

  function addToCheckout() {
    var lineItemsToAdd = { variantId: selectedVariant, quantity: 1 };
    var checkoutId = checkout.id;
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(function (checkout) {
      setCheckout(checkout);
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
        currentProduct.variants.map(function (variant, i) {
          return React.createElement(
            'button',
            {
              key: i,
              onClick: function onClick() {
                return variant.available ? checkSelected(variant.id) : null;
              },
              className: variant.available ? variant.selected ? "selected-variant" : "variant" : "out-of-stock__variant" },
            variant.title
          );
        })
      ),
      React.createElement(
        'button',
        {
          className: 'buy-button',
          onClick: function onClick() {
            return addToCheckout();
          } },
        'ADD TO CART'
      ),
      React.createElement(
        'button',
        {
          className: 'buy-button',
          onClick: function onClick() {
            return setProductDescriptionDisplay(!productDescriptionDisplay);
          } },
        'Description'
      ),
      React.createElement('div', {
        className: productDescriptionDisplay ? "product-description" : "product-description-hidden",
        dangerouslySetInnerHTML: { __html: currentProduct.descriptionHtml }
      })
    )
  );
};

// Product Images
var ProductImages = function ProductImages(_ref3) {
  var currentProduct = _ref3.currentProduct;

  var currentProductImages = currentProduct.images.slice(1, currentProduct.images.length);

  var _React$useState23 = React.useState(0),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      currentImageIndex = _React$useState24[0],
      setCurrentImageIndex = _React$useState24[1];

  var imageIndexOptions = {
    add: function add() {
      currentImageIndex !== currentProductImages.length - 1 ? setCurrentImageIndex(currentImageIndex + 1) : setCurrentImageIndex(0);
    },
    sub: function sub() {
      currentImageIndex > 0 ? setCurrentImageIndex(currentImageIndex - 1) : setCurrentImageIndex(currentProductImages.length - 1);
    }
  };

  return React.createElement(
    'div',
    { className: 'shop-page__column-one zoom', id: 'zoomedImg', style: { flexDirection: "column" } },
    React.createElement(
      'button',
      {
        onClick: imageIndexOptions.sub,
        className: 'image-button image-button__sub'
      },
      "<"
    ),
    React.createElement('img', { src: currentProductImages[currentImageIndex].src,
      width: '400px',
      style: { objectFit: "cover", "objectPosition": "center top" }
    }),
    React.createElement(
      'button',
      {
        onClick: imageIndexOptions.add,
        className: 'image-button image-button__add'
      },
      ">"
    ),
    React.createElement(
      'div',
      { className: 'shop-other__images' },
      currentProductImages.map(function (image, i) {
        return React.createElement('img', { key: i,
          src: image.src,
          width: '65px',
          height: '65px',
          className: i === currentImageIndex ? 'selected-image' : 'unselected-image'
        });
      })
    )
  );
};

var Nav = function Nav(_ref4) {
  var setProductVariants = _ref4.setProductVariants,
      currentProduct = _ref4.currentProduct,
      setSelectedVariant = _ref4.setSelectedVariant,
      displayProductDetails = _ref4.displayProductDetails,
      setDisplayProductDetails = _ref4.setDisplayProductDetails,
      setCheckoutStatus = _ref4.setCheckoutStatus;

  function returnToView() {
    setProductVariants(currentProduct.variants.map(function (v) {
      return v = Object.assign({}, v, { selected: false });
    }));
    setSelectedVariant("");
    setDisplayProductDetails(false);
  }
  return React.createElement(
    'div',
    { className: 'nav' },
    React.createElement(
      'a',
      { className: !displayProductDetails ? "return" : "return__invisible",
        href: '../../../index.html' },
      'return'
    ),
    React.createElement(
      'button',
      {
        onClick: function onClick() {
          return returnToView();
        },
        className: displayProductDetails ? "return" : "return__invisible"
      },
      'return'
    ),
    React.createElement('img', {
      className: 'cart',
      onClick: function onClick() {
        return setCheckoutStatus(true);
      },
      src: '../assets/pictures/svg/cart-white.svg'
    })
  );
};

var domContainer = document.querySelector('#shop-page');
ReactDOM.render(React.createElement(Shop, null), domContainer);
