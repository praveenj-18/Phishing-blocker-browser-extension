
// Get the check button and input element
var checkBtn = document.getElementById("checkBtn");
var addBtn = document.getElementById("addBtn");
var inputElement = document.getElementById("inputText");


// Add an event listener to the add button
addBtn.addEventListener("click", function() {
  //Get the URL from the input element
  var url = inputElement.value;

  //Add URL to vulnerable list
  chrome.runtime.sendMessage({ addBlockedSite: true, website: url }, function() {
    console.log("The site was added to the blocked list");
    alert("The site was added to the blocked list");
  });
})


// Add an event listener to the check button
checkBtn.addEventListener("click", function() {
  // Get the URL from the input element
  var url = inputElement.value;

  // Send a request to the Flask API
  fetch('http://localhost:5000/check?url=' + encodeURIComponent(url))
    .then(response => response.json())
    .then(data => {
      // Check the prediction result
      if (data.prediction === 1) {
        alert('The URL is legitimate.');
      } else {
        // Ask the user for confirmation
        var userConfirmation = confirm('The URL is illegitimate. Do you want to add it to the blocked list?');

        // If user confirms, send a message to background.js to add the URL to vuln_sites
        if (userConfirmation) {
          chrome.runtime.sendMessage({ addBlockedSite: true, website: url }, function(response) {
            console.log(response.message);
          });
          alert('The URL is added to the blocked list.');
        } else {
          alert('The URL is not added to the blocked list.');
        }
      }
    })
    .catch(error => {
      console.error('Error checking URL:', error);
      alert('Error checking URL. Please try again.');
    });
});


// // Get the check button and input element
// var checkBtn = document.getElementById("checkBtn");
// var inputElement = document.getElementById("inputText");

// // Add an event listener to the check button
// checkBtn.addEventListener("click", function() {
//   // Get the URL from the input element
//   var url = inputElement.value;

//   // Send a request to the Flask API
//   fetch('http://localhost:5000/check?url=' + encodeURIComponent(url))
//     .then(response => response.json())
//     .then(data => {
//       // Check the prediction result
//       if (data.prediction === 1) {
//         alert('The URL is legitimate.');
//       } else {
//         // Send a message to background.js to add the URL to vuln_sites
//         chrome.runtime.sendMessage({ addBlockedSite: true, website: url }, function(response) {
//           console.log(response.message);
//         });
//         alert('The URL is illegitimate. Added to the blocked list.');
//       }
//     })
//     .catch(error => {
//       console.error('Error checking URL:', error);
//       alert('Error checking URL. Please try again.');
//     });
// });
