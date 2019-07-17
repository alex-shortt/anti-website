import axios from "axios";

var contact_box = $(".contact-message");
var contact_button = $(".contact-message-send");
var contact_confirmation = $(".contact-message-send-confirmation");
var contact_confirmation_button = $(".contact-message-send-confirmation-ok");

contact_button.click(async () => {
  let contactURL = "https://alexshortt.com/scripts/email-anti.php";

  const nameField = $("#contact-name");
  const emailField = $("#contact-email");
  const messageField = $("#contact-message");

  const name = encodeURIComponent(nameField.val());
  const email = encodeURIComponent(emailField.val());
  const message = encodeURIComponent(messageField.val());

  if (name == "" || email == "" || message == "") {
    return;
  }

  await axios.get(
    `${contactURL}?name=${name}&email=${email}&message=${message}`
  );

  nameField.val("");
  emailField.val("");
  messageField.val("");

  contact_box.css("filter", "brightness(0.5)");
  contact_confirmation.show();

  contact_confirmation_button.click(function() {
    contact_confirmation.hide();
    contact_box.css("filter", "brightness(1)");
  });
});

const focusEvent = () => {
  $("html").css("min-height", `${window.innerHeight}px`);
};

const blurEvent = () => {
  $("html").css("min-height", "");
};

$("#contact-name").on("focus", focusEvent);
$("#contact-email").on("focus", focusEvent);
$("#contact-message").on("focus", focusEvent);
$("#mce-EMAIL").on("focus", focusEvent);

$("#contact-name").on("blur", blurEvent);
$("#contact-email").on("blur", blurEvent);
$("#contact-message").on("blur", blurEvent);
$("#mce-EMAIL").on("blur", blurEvent);

var signup_box = $(".contact-signup");
var signup_button = $(".contact-signup-send");
var signup_confirmation = $(".contact-signup-send-confirmation");
var signup_confirmation_button = $(".contact-signup-send-confirmation-ok");

function validEntry(input) {
  //Empty field check
  var field = $(input);
  if (!field.val()) {
    return false;
  }

  //Invalid entry check
  var errorObj = $(".mce_inline_error");
  if (errorObj.length == 0) {
    return true;
  } else if (errorObj.length == 2) {
    return false;
  } else {
    return true;
  }
}

signup_button.click(function() {
  if (validEntry("#mce-EMAIL")) {
    signup_box.css("filter", "brightness(0.5)");
    signup_confirmation.show();
    $("#mce-success-response").hide();
    signup_confirmation_button.click(function() {
      $("#mce-success-response").hide();
      signup_confirmation.hide();
      signup_box.css("filter", "brightness(1)");
    });
  } else {
    $("#mce-EMAIL").focus();
    $("#mce-EMAIL").blur();
  }
});

contact_confirmation.hide();
signup_confirmation.hide();
