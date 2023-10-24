document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    const activate = (bool) => {
        startButton.style.display = bool === true ? 'none' : 'block';
        stopButton.style.display = bool === true ? 'block' : 'none';
    }

    chrome.action.getBadgeText({}, (badgeText) => {
        if (badgeText === 'ON') {
            activate(true);
        } else if (badgeText === 'OFF') {
            activate(false);
        }
    });
  
    startButton.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.action.setBadgeText({ text: 'ON' });
        activate(true);
    });

    stopButton.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.action.setBadgeText({ text: 'OFF' });
        activate(false);
    });
});
