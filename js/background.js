chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

chrome.webRequest.onCompleted.addListener(
  (details) => {console.log("onCompleted" + details.url);},
  {urls: ["<all_urls>"]}
);