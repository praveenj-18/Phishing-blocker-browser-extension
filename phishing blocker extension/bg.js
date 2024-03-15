var vuln_sites = ['hackerrank.com','apple.com','microsoft.com','hackerone.com',"vulnweb.com","000webhost.com","000webhostapp.com","vulnerable.com"];

chrome.runtime.onInstalled.addListener(function() {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      var url = details.url.toLowerCase();
      for (var i = 0; i < vuln_sites.length; i++) {
        if (url.includes(vuln_sites[i])) {
          return {cancel:true};
        }
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Update the vuln_sites list with the new website
  var website = request.website.toLowerCase();
  if (website !== "" && !vuln_sites.includes(website)) {
    vuln_sites.push(website);
  }
  // sendResponse({message: "Website added to block list."});
  alert("Webiste added to blocked list")
});
