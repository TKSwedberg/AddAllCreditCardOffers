// ==UserScript==
// @name        Add all amex offers
// @namespace   Violentmonkey Scripts
// @match       https://global.americanexpress.com/offers/eligible
// @match       https://global.americanexpress.com/offers/*
// @grant       GM_addStyle
// @version     1.1.1
// @author      karnedgy
// @icon        https://static-00.iconduck.com/assets.00/amex-icon-512x512-g9fsaqf1.png
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @downloadURL https://github.com/TKSwedberg/AddAllCreditCardOffers/raw/main/addAllAmexOffers.user.js
// @description 8/3/2024, 1:19:40 PM
// ==/UserScript==


GM_addStyle (`

   /* Aesthetic smaller button style */
  #btnAddAll {
      margin-left:10px;
      background: linear-gradient(135deg, #ff1a9e, #ffb56a); /* Gradient background */
      color: white; /* Text color */
      border: none; /* Remove default border */
      border-radius: 20px; /* More rounded corners */
      padding: 5px 15px; /* Smaller padding for reduced height */
      font-size: 14px; /* Font size */
      font-weight: bold; /* Bold text */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      cursor: pointer; /* Pointer cursor on hover */
      transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease; /* Smooth transition */
  }

  #btnAddAll:hover {
      background: linear-gradient(135deg, #ff2a9e, #ffc56a); /* Darker gradient on hover */
      transform: translateY(-2px); /* Slightly raise on hover */
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Slightly larger shadow */
  }

  #btnAddAll:active {
      background: linear-gradient(135deg, #ff3a9e, #ffd56a); /* Even darker gradient on click */
      transform: translateY(0); /* Return to original position on click */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Return to original shadow */
  }
 /* Alert style */
.alert {
    display: none; /* Hidden by default */
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8); /* Dark background */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    font-size: 14px;
}`);

$(document).ready(function() {
   // Add the alert div to the body using jQuery
    $('body').append('<div id="alert" class="alert"></div>');
   //add button to click
    $(document.querySelectorAll('section span h1')[0]).append(`<button id="btnAddAll">Add all</button>`)

    buttonClick();
});
// Function to show alert
function showAlert(text) {
    $('#alert').text(text).fadeIn().delay(2000).fadeOut();
}

function buttonClick () {
  $('#btnAddAll').on('click', function() {
      showAlert("Adding...");
      addOffers();
  });
}

async function addOffers() {
  // Find all the "Add to Card" buttons on the page
  const offerButtons = Array.from(document.getElementsByClassName("offer-cta")).filter(btn => btn.title == "Add to Card");
  for (const button of offerButtons) {
    button.click();
    // Wait 2 seconds to be nice to AMEX servers
    await new Promise(r => setTimeout(r, 2000));
  }
  showAlert("Finished Adding!");
}
