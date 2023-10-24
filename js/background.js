chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ extensionState: "OFF" });
  chrome.action.setIcon({
    path: {
      96: "../img/logo/logo_red_ico.png",
    },
  });
});

chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log("onCompleted" + details.url);
  },
  { urls: ["<all_urls>"] }
);
