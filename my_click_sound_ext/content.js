document.addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "click" });
});
