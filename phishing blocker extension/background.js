var vuln_sites = ["hackerone.com", "vulnweb.com", "000webhost.com", "000webhostapp.com", "vulnerable.com","ngrok.io","nhrok.com","apple.com", "microsoft.com","abc.com","freehost"];

// Load blocked sites from storage
chrome.storage.sync.get(['blockedSites'], function (result) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }

  if (result.blockedSites) {
    vuln_sites = result.blockedSites;
  }
});


chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url = details.url.toLowerCase();
    for (var i = 0; i < vuln_sites.length; i++) {
      if (url.includes(vuln_sites[i])) {
        return { cancel: true };
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.addBlockedSite) {
    var website = request.website.toLowerCase();
    if (website !== "" && !vuln_sites.includes(website)) {
      vuln_sites.push(website);
      chrome.storage.sync.set({ 'blockedSites': vuln_sites });
      alert('Website added to block list:', website);
    }
  }
  // You can handle other message types here if needed
});

// Handle keyboard command
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'openOptions') {
    // Handle the command, for example, open an options page
    chrome.runtime.openOptionsPage();
  }
});

// Other parts of your background.js code
