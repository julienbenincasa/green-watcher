document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");

    const activate = (bool) => {
        chrome.storage.session.set({ extensionState: bool === true ? "ON" : "OFF" });
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
            96: "../img/logo/logo_ico.png",
            },
        });
    });

    stopButton.addEventListener("click", async () => {
        activate(false);
        await chrome.action.setIcon({
        path: {
            96: "../img/logo/logo_red_ico.png",
        },
        });
    });
});
