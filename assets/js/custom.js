document.addEventListener('DOMContentLoaded', function() {
  const voiceSelect = document.getElementById('voiceSelect');
  let voices = [];

  function populateVoiceList() {
    if ('speechSynthesis' in window) {
      voices = speechSynthesis.getVoices();
      voices = voices.filter(voice => voice.lang.startsWith('en'));
      voiceSelect.innerHTML = '';
      voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-index', index);
        voiceSelect.appendChild(option);
      });
    }else{
      alert("Your browser does not support text-to-speech functionality.");
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  document.getElementById('speechForm').addEventListener('submit', function(event) {
    event.preventDefault();
    speechSynthesis.cancel();
    setTimeout(function () {
      const textInput = document.getElementById('textInput').value;
      const selectedVoiceIndex = voiceSelect.selectedOptions[0].getAttribute('data-index');
      speakText(textInput, selectedVoiceIndex);
    }, 500);
  });

  // Add event listener for the Stop button
  document.getElementById('stopButton').addEventListener('click', function() {
    speechSynthesis.cancel(); // This stops the speech immediately
  });

  function speakText(text, voiceIndex) {
    if (!text) return; // Do nothing if text is empty
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceIndex];
    speechSynthesis.speak(utterance);
  }
});


(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  $( document ).ready(function() {

  })/*end of document ready*/

})()
