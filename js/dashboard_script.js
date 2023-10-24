document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    chrome.action.getBadgeText({}, (badgeText) => {
        if (badgeText === 'ON') {
            startButton.style.display = 'none';
            stopButton.style.display = 'block';
        } else if (badgeText === 'OFF') {
            startButton.style.display = 'block';
            stopButton.style.display = 'none';
        }
    });
  
    startButton.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.action.setBadgeText({ text: 'ON' });
        startButton.style.display = 'none';
        stopButton.style.display = 'block';
    });

    stopButton.addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.action.setBadgeText({ text: 'OFF' });
        stopButton.style.display = 'none';
        startButton.style.display = 'block';
    });
});
