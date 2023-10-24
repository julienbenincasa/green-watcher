document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
  
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
