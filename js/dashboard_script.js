document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const logoOn = document.getElementById("logoOn");
  const logoOff = document.getElementById("logoOff");

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
    if (message.completedRequestCount !== undefined) {
      // Update the UI with the completed request count
      document.getElementById("request-counter").textContent =
        message.completedRequestCount;
    }
  });
});
