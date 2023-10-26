document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const logoOn = document.getElementById("logoOn");
  let requestSize;
  let nbrRequest;

  const activate = (bool) => {
    chrome.storage.session.set({
      extensionState: bool === true ? "ON" : "OFF",
    });
    startButton.style.display = bool === true ? "none" : "block";
    stopButton.style.display = bool === true ? "block" : "none";
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
      nbrRequest = message.mesDonnees.completedRequestCount;
      footprint = message.mesDonnees.footprint;

      document.getElementById("requestSize").textContent =
        requestSize.formattedValue + " " + requestSize.unit;
      document.getElementById("nbrRequest").textContent = nbrRequest;
      document.getElementById("footprint").textContent =
        footprint.formattedValue + footprint.unit;
    }
  });

  checkData.addEventListener("click", async () => {
    window.open(
      "https://greenwatcher.vercel.app/?nbrRequest=" +
        nbrRequest +
        "&requestSize=" +
        JSON.stringify(requestSize) +
        "&footprint=" +
        JSON.stringify(footprint),
      "_blank"
    );
  });
});
