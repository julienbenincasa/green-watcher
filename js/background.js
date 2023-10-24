chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ extensionState: "OFF" });
  chrome.action.setIcon({
    path: {
      48: "../img/logo/logo_grey.png",
    },
  });
});

const activeRequests = {};

// Set up a timer to clean up activeRequests (> 3 min.) every 3 minutes (180,000 milliseconds)
setInterval(() => {
  const currentTime = performance.now();
  for (const requestId in activeRequests) {
    const requestInfo = activeRequests[requestId];
    if (requestInfo && currentTime - requestInfo.startTime > 180000) {
      delete activeRequests[requestId];
    }
  }
}, 180000);

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.storage.session.get(["extensionState"], (result) => {
      if (result.extensionState === "OFF") {
        return;
      }
      activeRequests[details.requestId] = { startTime: performance.now() };
    });
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

let completedRequestCount = 0;

chrome.webRequest.onCompleted.addListener(
  function (details) {
    chrome.storage.session.get(["extensionState"], (result) => {
      if (result.extensionState === "OFF") {
        return;
      }
      const requestInfo = activeRequests[details.requestId];
      if (!requestInfo) {
        return;
      }
      const endTime = performance.now();
      const requestTime = endTime - requestInfo.startTime;
      const responseHeaders = details.responseHeaders;
      let responseSize = 0;

      for (const header of responseHeaders) {
        if (header.name.toLowerCase() === "content-length") {
          responseSize = parseInt(header.value);
          break;
        }
      }
      console.log(
        `Requête ${details.url}, Temps de requête : ${requestTime} ms, Poids de la réponse : ${responseSize} octets.`
      );
      delete activeRequests[details.requestId];
      // Increment the completedRequestCount
      completedRequestCount++;
      // Send a message to the popup script with the updated count
      chrome.runtime.sendMessage({ completedRequestCount });
    });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
