// ==UserScript==
// @name        Add all offers
// @namespace   Violentmonkey Scripts
// @match       https://secure.chase.com/*
// @grant       GM_addStyle
// @version     1.0
// @author      karnedgy
// @icon        https://www.google.com/s2/favicons?sz=64&domain=chase.com
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @description 7/27/2024, 3:44:29 PM
// ==/UserScript==

GM_addStyle (`

   /* Aesthetic smaller button style */
  #btnAddAll {
      margin-left:10px;
      background: linear-gradient(135deg, #007bff, #00d4ff); /* Gradient background */
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
      background: linear-gradient(135deg, #0056b3, #0099cc); /* Darker gradient on hover */
      transform: translateY(-2px); /* Slightly raise on hover */
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Slightly larger shadow */
  }

  #btnAddAll:active {
      background: linear-gradient(135deg, #003d82, #007ba7); /* Even darker gradient on click */
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
}


`);

$(document).ready(function() {
     // Add the alert div to the body using jQuery
    $('body').append('<div id="alert" class="alert">Adding...</div>');
    // Start observing the document
    observeButton();
    // Initial call to addButton in case the element is already in the DOM


    addButton();
});
// Function to show alert
function showAlert() {
    $('#alert').fadeIn().delay(2000).fadeOut();
}
// Function to create and append the button
function addButton() {
    const element = $(document.querySelector('.mds-title-medium-heavier'));
    if (element.length > 0 && $('#btnAddAll').length === 0) { // Check if button already exists
        element.append(`<button id="btnAddAll">Add all</button>`);
        $('#btnAddAll').on('click', function() {
            processButtons();
            showAlert();
        });
    }
}

// Function to observe and ensure the button remains in the DOM
function observeButton() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                addButton(); // Continuously add the button if removed
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

//V--------------------Button Click Event---------------V//
// Function to navigate back in history and call 'c' after a delay
const navigateBack = () => {
    window.history.back();
    setTimeout(processButtons, Math.random() * 1000 + 300);
};

// Function to process buttons: click them and set a delay before navigating back
const processButtons = () => {
    // Select all buttons with the class '_1bof7fb8'
    const buttons = [...document.querySelectorAll('._1bof7fb9')];

    // Filter out buttons that have a child with the type 'ico_checkmark_filled'
    const filteredButtons = buttons.filter(button => {
        const iconType = button.childNodes[1]?.childNodes[0]?.type;
        return iconType !== 'ico_checkmark_filled';
    });

    // Get the last button from the filtered list
    const buttonToClick = filteredButtons.pop();

    if (buttonToClick) {
        // Click the button
        buttonToClick.childNodes[0].click();

        // Call 'navigateBack' after a random delay
        setTimeout(navigateBack, Math.random() * 1000 + 300);
    } else {
        // If no buttons left to click, log a message
        console.log('All buttons processed!');
    }
};
