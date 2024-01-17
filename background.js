
function injectScript(tabId) {
  chrome.scripting.executeScript(
    {
      target: {tabId: tabId},
      files: ['inject.js'],
    }
  );
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.get(["blueMarlinStatus"]).then((result) => {
    if (result && result.blueMarlinStatus != false) {
      if (changeInfo.url) {
        injectScript(tabId);
      }
    }
  });
});

chrome.runtime.onMessage.addListener(
function (request, sender, sendResponse) {
  
  if (request.cmd === "setOffState") {
    chrome.storage.local.set({'blueMarlinStatus': false});
    alert("BlueMarlin was set to sleep.");
  }

  if (request.cmd === "setOnState") {
    chrome.storage.local.set({'blueMarlinStatus': true});
    alert("BlueMarlin had awakened.");
  }
});