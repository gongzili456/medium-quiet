"use strict";

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ opening: true });
});

function cleanCookies(url) {
  chrome.cookies.getAll({ url }, function(cookies) {
    cookies.reduce(function(p, c) {
      return p.then(function() {
        chrome.cookies.remove({ url, name: c.name }, function(details) {});
      });
    }, Promise.resolve());
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.storage.sync.get("opening", function(data) {
    if (data.opening) {
      cleanCookies(request.url);

      chrome.tabs.sendMessage(sender.tab.id, { action: "refresh" });
    }
  });

  return true; // This is required by a Chrome Extension
});
