document.addEventListener('DOMContentLoaded', function () {
    const minElem = document.getElementById('min');
    const secElem = document.getElementById('second');
    const msecElem = document.getElementById('msec');
    const laplist = document.getElementById('laps');
  
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('resetButton');
  
    startButton.addEventListener('click', () => chrome.runtime.sendMessage({ command: 'start' }));
    stopButton.addEventListener('click', () => chrome.runtime.sendMessage({ command: 'stop' }));
    resetButton.addEventListener('click', () => chrome.runtime.sendMessage({ command: 'reset' }));
  
    function updateDisplay() {
      chrome.storage.local.get(['min', 'sec', 'msec', 'laps'], ({ min, sec, msec, laps }) => {
        minElem.innerText = min.toString().padStart(2, '0');
        secElem.innerText = sec.toString().padStart(2, '0');
        msecElem.innerText = msec.toString().padStart(2, '0');
        console.log("hit");
        
        laplist.innerHTML = laps.map(lap => `<li class="list-group-item">${lap}</li>`).join('');
      });
    }
  
    updateDisplay();
    setInterval(updateDisplay, 10);
  });
  