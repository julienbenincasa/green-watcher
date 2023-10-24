chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ extensionState: "OFF" });
  chrome.action.setIcon({
    path: {
      96: "../img/logo/logo_red_ico.png",
    },
  });
});

const activeRequests = {};
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    activeRequests[details.requestId] = { startTime: performance.now() };
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.webRequest.onCompleted.addListener(
  function (details) {
    const requestInfo = activeRequests[details.requestId];
    if (requestInfo) {
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
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
