let clickCount = 0;
chrome.storage.local.get(["clickCount"], function (result) {
  if (result.clickCount) {
    clickCount = result.clickCount;
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "click") {
    clickCount++;
    chrome.storage.local.set({ clickCount: clickCount }, function () {
      //  console.log('clickCount is set to ' + clickCount);
    });
    if (clickCount === 10) {
      playClickSound();
      clickCount = 0;
      chrome.storage.local.set({ clickCount: clickCount }, function () {
        // console.log('clickCount is set to 0');
      });
    }
  }
});
function playClickSound() {
  const audio = new Audio(chrome.runtime.getURL("click-sound.mp3"));
  audio.play();
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
});
