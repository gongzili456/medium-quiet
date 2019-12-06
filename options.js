"use strict";

chrome.storage.sync.get("opening", function(data) {
  let now = data.opening;
  console.log("state: ", now);

  toggle(now);
});

function toggle(opening) {
  console.log("toggle: ", opening);

  chrome.storage.sync.set({ opening }, function() {
    let mm_checkbox = document.getElementById("mm_checkbox");

    if (opening) {
      mm_checkbox.setAttribute("checked", "checked");
    } else {
      mm_checkbox.removeAttribute("checked");
    }

    let mm_msg = document.getElementById("mm_msg");
    mm_msg.innerText = opening
      ? "正在使『Medium』保持安静"
      : "正在使『自己』 保持安静";
  });
}

let switchBtn = document.getElementById("open_switch");

switchBtn.addEventListener("click", function() {
  chrome.storage.sync.get("opening", function(data) {
    let now = data.opening;
    toggle(!now);
  });
});
