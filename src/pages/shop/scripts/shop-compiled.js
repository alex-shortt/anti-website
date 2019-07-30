var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Router = ReactRouterDOM.HashRouter;
var Route = ReactRouterDOM.Route;
var Link = ReactRouterDOM.Link;
var Switch = ReactRouterDOM.Switch;
var history = History.createBrowserHistory();
import InnerImageZoom from "react-inner-image-zoom";

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

  var _React$useState21 = React.useState(false),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      productDescriptionDisplay = _React$useState22[0],
      setProductDescriptionDisplay = _React$useState22[1];

  var _React$useState23 = React.useState(""),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      prodDescription = _React$useState24[0],
      setProdDescription = _React$useState24[1];

  var _React$useState25 = React.useState(false),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      onProductPage = _React$useState26[0],
      setOnProductPage = _React$useState26[1];
  // const [checkoutGifs, setCheckoutGifs] = React.useState([])


  var _React$useState27 = React.useState([]),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      gifs = _React$useState28[0],
      setGifs = _React$useState28[1];

  var client = ShopifyBuy.buildClient({
    domain: "antiofficial.myshopify.com",
    storefrontAccessToken: "122b2bd77196392552b87dab7ec18d58"
  });
  React.useEffect(function () {
    client.product.fetchAll().then(function (shopifyProducts) {
      setProducts(shopifyProducts);
      setCurrentProduct(shopifyProducts[0]);
      setMounted(true);
      findGifs(shopifyProducts);
      console.log(shopifyProducts);
      // _setCheckoutGifs(shopifyProducts)
    });
    client.checkout.create().then(function (checkout) {
      setCheckout(checkout);
    });
  }, []);

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
    var tempArr = products.map(function (product) {
      return product.images[product.images.length - 1].src;
    });
    tempArr.forEach(function (picture) {
      var img = new Image();
      img.src = picture;
    });
    setGifs(tempArr);
  }

  function justProductDescription() {
    var productDesc = products[productIndex].description.split(" ");
    var cutOffNum = productDesc.indexOf("Dimensions");
    var returnProductDesc = productDesc.splice(0, cutOffNum).join(" ");
    setProdDescription(returnProductDesc);
  }

  // console.log(checkoutGifs)

  if (mounted) {
    return React.createElement(
      Router,
      { history: history },
      React.createElement(
        "div",
        {
          style: {
            width: "100%",
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden"
          }
        },
        React.createElement(Player, null),
        React.createElement(Nav, {
          onProductPage: onProductPage,
          setOnProductPage: setOnProductPage,
          productDescriptionDisplay: productDescriptionDisplay,
          setProductDescriptionDisplay: setProductDescriptionDisplay,
          setCheckoutStatus: setCheckoutStatus,
          setProductVariants: setProductVariants,
          setSelectedVariant: setSelectedVariant,
          displayProductDetails: displayProductDetails,
          setDisplayProductDetails: setDisplayProductDetails,
          currentProduct: currentProduct
        }),
        React.createElement(Checkout, _defineProperty({
          gifs: gifs
          // checkoutGifs={checkoutGifs}
          , currentProduct: currentProduct,
          client: client,
          checkout: checkout,
          setCheckout: setCheckout,
          checkoutStatus: checkoutStatus,
          setCheckoutStatus: setCheckoutStatus,
          selectedVariant: selectedVariant,
          setSelectedVariant: setSelectedVariant
        }, "currentProduct", currentProduct)),
        React.createElement(
          "div",
          {
            className: !onProductPage ? "shop-page__container" : "shop-page__container-responsive"
          },
          React.createElement(
            Switch,
            null,
            React.createElement(Route, {
              exact: true,
              path: "/",
              render: function render(props) {
                return React.createElement(TubeHologram, Object.assign({}, props, {
                  products: products,
                  productIndex: productIndex,
                  displayOutOfStock: displayOutOfStock,
                  currentProduct: currentProduct,
                  setCurrentProduct: setCurrentProduct,
                  gifs: gifs,
                  setProductIndex: setProductIndex,
                  setDisplayProductDetails: setDisplayProductDetails,
                  justProductDescription: justProductDescription,
                  setProductVariants: setProductVariants
                }));
              }
            }),
            React.createElement(Route, {
              path: "/:id",
              render: function render(props) {
                return React.createElement(ProductPage, Object.assign({}, props, {
                  onProductPage: onProductPage,
                  setOnProductPage: setOnProductPage,
                  products: products,
                  productVariants: productVariants,
                  prodDescription: prodDescription,
                  checkout: checkout,
                  setCheckout: setCheckout,
                  setCheckoutStatus: setCheckoutStatus,
                  client: client,
                  productDescriptionDisplay: productDescriptionDisplay,
                  setProductVariants: setProductVariants,
                  setProductDescriptionDisplay: setProductDescriptionDisplay,
                  currentProduct: currentProduct,
                  setCurrentProduct: setCurrentProduct,
                  displayProductDetails: displayProductDetails,
                  selectedVariant: selectedVariant,
                  setSelectedVariant: setSelectedVariant,
                  setDisplayProductDetails: setDisplayProductDetails
                }));
              }
            })
          )
        )
      )
    );
  } else {
    return React.createElement(
      "h1",
      { style: { fontFamily: "VCR", color: "white" } },
      "Loading..."
    );
  }
};

var Nav = function Nav(_ref) {
  var onProductPage = _ref.onProductPage,
      setOnProductPage = _ref.setOnProductPage,
      setProductDescriptionDisplay = _ref.setProductDescriptionDisplay,
      setProductVariants = _ref.setProductVariants,
      currentProduct = _ref.currentProduct,
      setSelectedVariant = _ref.setSelectedVariant,
      displayProductDetails = _ref.displayProductDetails,
      setDisplayProductDetails = _ref.setDisplayProductDetails,
      setCheckoutStatus = _ref.setCheckoutStatus;

  function returnToView() {
    setProductVariants(currentProduct.variants.map(function (v) {
      return v = Object.assign({}, v, { selected: false });
    }));
    setOnProductPage(!onProductPage);
    setSelectedVariant("");
    setDisplayProductDetails(false);
    setProductDescriptionDisplay(false);
    document.getElementsByClassName("dimensions-shopify")[0].style.display = "none";
  }
  return React.createElement(
    "div",
    { className: "nav" },
    onProductPage ? React.createElement(
      Link,
      { to: "/", className: "return" },
      React.createElement(
        "button",
        { onClick: function onClick() {
            return returnToView();
          }, className: "return" },
        "return"
      )
    ) : React.createElement(
      "a",
      { href: "/index.html", className: "return" },
      "return"
    ),
    React.createElement("img", {
      className: "cart",
      onClick: function onClick() {
        return setCheckoutStatus(true);
      },
      src: "../assets/pictures/svg/cart-white.svg"
    })
  );
};

var TubeHologram = function TubeHologram(_ref2) {
  var products = _ref2.products,
      productIndex = _ref2.productIndex,
      displayOutOfStock = _ref2.displayOutOfStock,
      currentProduct = _ref2.currentProduct,
      setCurrentProduct = _ref2.setCurrentProduct,
      gifs = _ref2.gifs,
      setProductIndex = _ref2.setProductIndex,
      setDisplayProductDetails = _ref2.setDisplayProductDetails,
      justProductDescription = _ref2.justProductDescription,
      setProductVariants = _ref2.setProductVariants,
      match = _ref2.match;

  var indexOptions = {
    add: function add() {
      productIndex !== products.length - 1 ? setProductIndex(productIndex + 1) : setProductIndex(0);
    },
    sub: function sub() {
      productIndex > 0 ? setProductIndex(productIndex - 1) : setProductIndex(products.length - 1);
    }
  };

  function selectProduct() {
    setDisplayProductDetails(true);
    setCurrentProduct(products[productIndex]);
    justProductDescription();
    setProductVariants(currentProduct.variants.map(function (v) {
      return v = Object.assign({}, v, { selected: false });
    }));
  }
  var images = gifs;
  return React.createElement(
    "div",
    { className: "shop-page__column-one column-image" },
    React.createElement(
      "button",
      {
        className: "shop-page__column-one__button button__sub",
        onClick: indexOptions.sub
      },
      "<"
    ),
    React.createElement(
      "div",
      { className: "shop-page__column-one__image-container" },
      React.createElement("img", {
        className: "shop-page__column-one__image",
        src: "../assets/pictures/finaltube.png"
      })
    ),
    currentProduct.images.length > 1 ? React.createElement(
      "div",
      {
        className: "product-container",
        onClick: function onClick() {
          currentProduct.availableForSale ? selectProduct() : setDisplayOutOfStock(true);
        }
      },
      React.createElement(
        Link,
        { to: "/" + products[productIndex].id },
        React.createElement("img", {
          className: "product",
          src: images[productIndex],
          onClick: function onClick() {
            currentProduct.availableForSale ? selectProduct() : setDisplayOutOfStock(true);
          }
        })
      )
    ) : React.createElement("img", { className: "product", alt: "", width: "300px" }),
    React.createElement(
      "button",
      {
        className: "shop-page__column-one__button button__add",
        onClick: indexOptions.add
      },
      ">"
    ),
    React.createElement(
      "div",
      { className: "product-info__absolute" },
      React.createElement(
        "h1",
        {
          className: displayOutOfStock ? "product-info__status-available" : "product-info__status-unavailable"
        },
        "Out of Stock"
      ),
      React.createElement(
        "h2",
        { className: "product-info__title" },
        products[productIndex].title
      ),
      React.createElement(
        "h2",
        { className: "product-info__title" },
        "$" + products[productIndex].variants[0].price
      ),
      React.createElement(
        "h2",
        { className: "item-number__identifier" },
        productIndex + 1,
        "/",
        products.length
      )
    )
  );
};

var ProductPage = function ProductPage(_ref3) {
  var setOnProductPage = _ref3.setOnProductPage,
      products = _ref3.products,
      checkout = _ref3.checkout,
      setCheckout = _ref3.setCheckout,
      setCheckoutStatus = _ref3.setCheckoutStatus,
      client = _ref3.client,
      currentProduct = _ref3.currentProduct,
      setCurrentProduct = _ref3.setCurrentProduct,
      selectedVariant = _ref3.selectedVariant,
      setProductVariants = _ref3.setProductVariants,
      setSelectedVariant = _ref3.setSelectedVariant,
      match = _ref3.match;

  React.useEffect(function () {
    setOnProductPage(true);
    products.map(function (p, i) {
      if (p.id === match.params.id) {
        setCurrentProduct(p);
      }
    });
  }, []);
  return React.createElement(
    "div",
    { className: "shop-page__container-responsive-product" },
    React.createElement(ProductImages, { currentProduct: currentProduct }),
    React.createElement(Product, {
      checkout: checkout,
      setCheckout: setCheckout,
      setCheckoutStatus: setCheckoutStatus,
      client: client,
      currentProduct: currentProduct,
      setCurrentProduct: setCurrentProduct,
      selectedVariant: selectedVariant,
      setSelectedVariant: setSelectedVariant
    })
  );
};

var Product = function Product(_ref4) {
  var checkout = _ref4.checkout,
      setCheckout = _ref4.setCheckout,
      setCheckoutStatus = _ref4.setCheckoutStatus,
      client = _ref4.client,
      currentProduct = _ref4.currentProduct,
      setCurrentProduct = _ref4.setCurrentProduct,
      selectedVariant = _ref4.selectedVariant,
      setSelectedVariant = _ref4.setSelectedVariant;

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
    selectedVariant !== "" ? setCheckoutStatus(true) : setCheckoutStatus(false);
  }

  function displayDimensions() {
    var dimensionsClass = document.getElementsByClassName("dimensions-shopify");
    dimensionsClass[0].style.display === "block" ? dimensionsClass[0].style.display = "none" : dimensionsClass[0].style.display = "block";
  }

  return React.createElement(
    "div",
    { className: "shop-page__column-two" },
    React.createElement(
      "div",
      { className: "shop-page__column-two-section" },
      React.createElement(
        "h1",
        null,
        currentProduct.title
      )
    ),
    React.createElement(
      "div",
      { className: "shop-page__column-two-section" },
      React.createElement(
        "h2",
        null,
        "$",
        currentProduct.variants[0].price
      ),
      React.createElement(
        "div",
        { className: "variant-button__container" },
        currentProduct.variants.map(function (variant, i) {
          return React.createElement(
            "button",
            {
              key: i,
              onClick: function onClick() {
                return variant.available ? checkSelected(variant.id) : null;
              },
              className: variant.available ? variant.selected ? "selected-variant" : "variant" : "out-of-stock__variant"
            },
            variant.title
          );
        })
      ),
      React.createElement(
        "button",
        { className: "buy-button", onClick: function onClick() {
            return addToCheckout();
          } },
        "ADD TO CART"
      ),
      React.createElement(
        "button",
        {
          className: "buy-button dimensions",
          onClick: function onClick() {
            return displayDimensions();
          }
        },
        "DIMENSIONS"
      ),
      React.createElement("div", {
        dangerouslySetInnerHTML: { __html: currentProduct.descriptionHtml }
      })
    )
  );
};

var ProductImages = function ProductImages(_ref5) {
  var currentProduct = _ref5.currentProduct;

  var currentProductImages = currentProduct.images;

  var _React$useState29 = React.useState(0),
      _React$useState30 = _slicedToArray(_React$useState29, 2),
      currentImageIndex = _React$useState30[0],
      setCurrentImageIndex = _React$useState30[1];

  var imageIndexOptions = {
    add: function add() {
      currentImageIndex !== currentProductImages.length - 1 ? setCurrentImageIndex(currentImageIndex + 1) : setCurrentImageIndex(0);
    },
    sub: function sub() {
      currentImageIndex > 0 ? setCurrentImageIndex(currentImageIndex - 1) : setCurrentImageIndex(currentProductImages.length - 1);
    }
  };

  return React.createElement(
    "div",
    {
      className: "shop-page__product-column zoom",
      style: { flexDirection: "column" }
    },
    React.createElement(InnerImageZoom, {
      className: "product-image",
      src: currentProductImages[currentImageIndex].src
      // style={{ objectFit: "cover", "objectPosition": "center top" }}
    }),
    React.createElement(
      "div",
      { className: "shop-other__images" },
      React.createElement(
        "button",
        {
          onClick: imageIndexOptions.sub,
          className: "image-button image-button__sub"
        },
        "<"
      ),
      currentProductImages.map(function (image, i) {
        return React.createElement("img", {
          key: i,
          src: image.src,
          className: i === currentImageIndex ? "selected-image" : "unselected-image",
          onClick: function onClick() {
            return setCurrentImageIndex(i);
          }
        });
      }),
      React.createElement(
        "button",
        {
          onClick: imageIndexOptions.add,
          className: "image-button image-button__add"
        },
        ">"
      )
    )
  );
};

var Checkout = function Checkout(_ref6) {
  var checkoutGifs = _ref6.checkoutGifs,
      client = _ref6.client,
      checkout = _ref6.checkout,
      setCheckout = _ref6.setCheckout,
      checkoutStatus = _ref6.checkoutStatus,
      setCheckoutStatus = _ref6.setCheckoutStatus;

  function removeFromCheckout(itemId) {
    var checkoutId = checkout.id;
    var lineItemsToRemove = itemId;
    client.checkout.removeLineItems(checkoutId, lineItemsToRemove).then(function (checkout) {
      setCheckout(checkout);
    });
  }

  return React.createElement(
    "div",
    { className: checkoutStatus ? "checkout visible" : "checkout invisible" },
    React.createElement(
      "div",
      { className: "checkout-container" },
      React.createElement(
        "div",
        { className: "checkout-header" },
        React.createElement(
          "button",
          {
            className: "checkout-exit",
            onClick: function onClick() {
              setCheckoutStatus(false);
            }
          },
          "x"
        ),
        React.createElement(
          "h1",
          null,
          "Cart"
        ),
        React.createElement(
          "div",
          { className: "checkout-row" },
          React.createElement(
            "p",
            null,
            "ANTI"
          ),
          React.createElement(
            "p",
            null,
            "IMAGE"
          ),
          React.createElement(
            "p",
            null,
            "SIZE"
          ),
          React.createElement(
            "p",
            null,
            "PRODUCT NAME"
          ),
          React.createElement(
            "p",
            null,
            "QUANTITY"
          ),
          React.createElement(
            "p",
            null,
            "PRICE"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "checkout-content" },
        React.createElement(
          "div",
          { className: "checkout-list" },
          checkout.lineItems.length > 0 ? checkout.lineItems.map(function (item, i) {
            return React.createElement(
              "div",
              { className: "item-line", key: item.id },
              React.createElement(
                "button",
                {
                  className: "remove-item",
                  onClick: function onClick() {
                    return removeFromCheckout(item.id);
                  }
                },
                "x"
              ),
              React.createElement("img", {
                className: "checkout-img",
                src: item.variant.image.src
              }),
              React.createElement(
                "h4",
                { className: "item-size" },
                item.variant.title
              ),
              React.createElement(
                "h4",
                { className: "item-title" },
                item.title
              ),
              React.createElement(
                "h4",
                { className: "item-quantity" },
                item.quantity
              ),
              React.createElement(
                "h4",
                { className: "item-price" },
                "$",
                item.variant.price
              )
            );
          }) : React.createElement(
            "h4",
            { className: "checkout-empty" },
            " YOUR CART IS EMPTY"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "checkout-footer" },
        React.createElement(
          "h4",
          { className: "subtotal" },
          "Subtotal: $",
          checkout.subtotalPrice
        ),
        React.createElement(
          "a",
          { href: checkout.webUrl, className: "checkout-hyperlink" },
          "CHECKOUT"
        )
      )
    )
  );
};

var useAudio = function useAudio() {
  var _React$useState31 = React.useState(new Audio("../../../assets/music/speeding+looped.mp3")),
      _React$useState32 = _slicedToArray(_React$useState31, 1),
      audio = _React$useState32[0];

  var _React$useState33 = React.useState(true),
      _React$useState34 = _slicedToArray(_React$useState33, 2),
      playing = _React$useState34[0],
      setPlaying = _React$useState34[1];

  var toggle = function toggle() {
    return setPlaying(!playing);
  };

  React.useEffect(function () {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  return [playing, toggle];
};

var Player = function Player(_ref7) {
  var url = _ref7.url;

  var _useAudio = useAudio(url),
      _useAudio2 = _slicedToArray(_useAudio, 2),
      playing = _useAudio2[0],
      toggle = _useAudio2[1];

  return React.createElement(
    "button",
    { className: "player-toggle", onClick: toggle },
    playing ? React.createElement("i", { className: "fas fa-pause" }) : React.createElement("i", { className: "fas fa-play" })
  );
};
var domContainer = document.querySelector("#shop-page");
ReactDOM.render(React.createElement(Shop, null), domContainer);
