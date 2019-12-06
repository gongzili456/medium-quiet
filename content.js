"use strict";

// 监听事件，与 background js 通信
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "refresh") {
    window.location.reload();
  }
});

var callback = function() {
  const paywall = document.querySelector("div[id*='paywall']");

  const regwall = document.querySelector("div[id*='regwall']");

  if (paywall || regwall) {
    chrome.runtime.sendMessage({ url: window.location.origin });
  }
};

callback();

// 关闭底部登录浮窗
setTimeout(() => {
  document
    .querySelector("div[id*='lo-meter']")
    .querySelector("button")
    .click();
}, 3000);

// 关闭中部登录浮窗
setTimeout(() => {
  document
    .querySelector("div[id*='susi-entry']")
    .querySelector("button")
    .click();
}, 2000);
