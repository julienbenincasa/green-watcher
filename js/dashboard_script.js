document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const logoOn = document.getElementById("logoOn");
  const logoOff = document.getElementById("logoOff");
  const checkData = document.getElementById("checkData");
  let requestSize;
  let requestTime;
  let nbrRequest;

  const activate = (bool) => {
    chrome.storage.session.set({
      extensionState: bool === true ? "ON" : "OFF",
    });
    startButton.style.display = bool === true ? "none" : "block";
    stopButton.style.display = bool === true ? "block" : "none";
    logoOff.style.display = bool === true ? "none" : "block";
    logoOn.style.display = bool === true ? "block" : "none";
  };

  chrome.storage.session.get(["extensionState"]).then((data) => {
    data["extensionState"] === "ON" ? activate(true) : activate(false);
  });

  startButton.addEventListener("click", async () => {
    activate(true);
    await chrome.action.setIcon({
      path: {
        48: "../img/logo/48/logo_green.png",
      },
    });
    logoOn.add;
  });

  stopButton.addEventListener("click", async () => {
    activate(false);
    await chrome.action.setIcon({
      path: {
        48: "../img/logo/48/logo_grey.png",
      },
    });
  });

  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    if (message.mesDonnees.completedRequestCount !== undefined) {
      requestSize = message.mesDonnees.requestSize;
      requestTime = message.mesDonnees.requestTime;
      nbrRequest = message.mesDonnees.completedRequestCount;

      document.getElementById("requestTime").textContent = requestTime;
      document.getElementById("requestSize").textContent = requestSize;
      document.getElementById("nbrRequest").textContent = nbrRequest;
    }
  });

  checkData.addEventListener("click", async () => {
    window.open(
      "https://greenwatcher.vercel.app/?nbrRequest=" +
        nbrRequest +
        "&requestSize=" +
        requestSize +
        "&requestTime=" +
        requestTime,
      "_blank"
    );
  });
});
