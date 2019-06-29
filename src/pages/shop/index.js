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