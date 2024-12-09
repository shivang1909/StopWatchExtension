let min = 0;
let sec = 0;
let msec = 0;
let startTimer;
let laps = [];
console.log("this is background js ");


function startStopwatch() {
  
  startTimer = setInterval(() => {
    msec = msec + 10;
    if (msec == 1000) {
      msec = 0;
      sec++;
      if (sec == 60) {
        sec = 0;
        min++;
      }
    }
    chrome.storage.local.set({ min, sec, msec });
  }, 10);
}

function stopStopwatch() {
   console.log(startTimer);
   
  clearInterval(startTimer);
  startTimer = null;
  const stopwatch = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${msec.toString().padStart(2, '0')}`;
  laps.push(stopwatch);
  chrome.storage.local.set({ laps });
  min = 0;
  sec=0;
  msec=0;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'start') {
    startStopwatch();
  } else if (message.command === 'stop') {
    stopStopwatch();
  } else if (message.command === 'reset') {
    min = 0;
    sec = 0;
    msec = 0;
    laps = [];
    clearInterval(startTimer);
    startTimer = null;
    chrome.storage.local.set({ min, sec, msec, laps });
  }
});
