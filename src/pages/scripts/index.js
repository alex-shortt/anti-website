// Shopify Buy SDK
var client = ShopifyBuy.buildClient({
  domain: 'antiofficial.myshopify.com',
  storefrontAccessToken: 'afa4e820570a727304c2c1fc6768443f'
});

// Render product from shopify

// Fade In
$(document).ready(function () {
  $('body').css('display', 'none');
  $('body').fadeIn(1000);

  $('#return').click(function () {
    event.preventDefault();
    var newLocation = $('#return').attr('href');
    $('body').fadeOut(1000, function () {
      return pageRedirect(newLocation);
    });
    function pageRedirect(newLocation) {
      window.location = newLocation;
    }
  });
});