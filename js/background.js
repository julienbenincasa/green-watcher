import { co2 } from "./co2/index.js";
import { formatBytes, formatGrams } from "./toolbox.js";

const oneByte = new co2({ model: "1byte" });
const devMode = false;
const activeRequests = {};
let completedRequestCount = 0;
let requestSize = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ extensionState: "OFF" });
  chrome.action.setIcon({
    path: {
      48: "../img/logo/48/logo_grey.png",
    },
  });
});


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
      
      const responseHeaders = details.responseHeaders;
      let responseSize = 0;

      for (const header of responseHeaders) {
        if (header.name.toLowerCase() === "content-length") {
          responseSize = parseInt(header.value);
          break;
        }
      }

      if ( devMode ) {
        const endTime = performance.now();
        const requestTimeRequest = endTime - requestInfo.startTime;
        console.log(`Requête ${details.url}, Temps de requête : ${requestTimeRequest} ms, Poids de la réponse : ${responseSize} octets.`);
      }

      delete activeRequests[details.requestId];
      completedRequestCount++;
      requestSize = requestSize + responseSize;
      var mesDonnees = {
        requestSize: formatBytes(requestSize),
        completedRequestCount: completedRequestCount,
        footprint: formatGrams(oneByte.perByte(requestSize).toFixed(2)),
      };

      chrome.runtime.sendMessage({ mesDonnees });
    });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);
