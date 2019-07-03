// Shopify Buy SDK
const client = ShopifyBuy.buildClient({
  domain: 'antiofficial.myshopify.com',
  storefrontAccessToken: 'afa4e820570a727304c2c1fc6768443f'
});

// Render product from shopify

// Fade In
$(document).ready(() => {
  $('body').css('display', 'none')
  $('body').fadeIn(1000)

  $('#return').click(() => {
    event.preventDefault()
    var newLocation = $('#return').attr('href');
    $('body').fadeOut(1000, () => pageRedirect(newLocation))
    function pageRedirect(newLocation) {
      window.location = newLocation
    }
  })
})