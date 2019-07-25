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