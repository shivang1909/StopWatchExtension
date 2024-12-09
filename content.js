console.log("Content script loaded");

let recognition;

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    console.log('Microphone stream:', stream);

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
      let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
      console.log('Voice Command:', transcript);

      if (transcript === 'start') {
        
       chrome.runtime.sendMessage({ command: 'start' });
      } else if (transcript === 'stop') {
        chrome.runtime.sendMessage({ command: 'stop' });
      } else if (transcript === 'reset') {
        chrome.runtime.sendMessage({ command: 'reset' });
      }
    };

    recognition.onerror = function(event) {
      console.error('Speech recognition error detected:', event.error);
    };

    recognition.onend = function() {
      console.log('Speech recognition service disconnected');
    };

    recognition.start();
  })
  .catch(function(err) {
    console.error('Microphone access error:', err);
  });
