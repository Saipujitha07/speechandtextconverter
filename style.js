let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");


window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change",()=>{
speech.voice=voices[voiceSelect.value];
});


document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

document.addEventListener("keydown", (event) => {
    // Check if the Enter key is pressed
    if (event.key === "Enter") {
        speech.text = document.querySelector("textarea").value;
        window.speechSynthesis.speak(speech);
    }
    // Check if the Escape key is pressed
    if (event.key === "Escape") {
        window.speechSynthesis.cancel(); // Stop speech synthesis
    }
});

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(() => {
        // Microphone permission granted, proceed with speech synthesis
        // ... your existing speech synthesis code here
    })
    .catch(err => {
        console.error("Error accessing microphone:", err);
        // Handle permission denial (e.g., display an error message)
    });

    function speakText() {
        speech.text = textInput.value;
        window.speechSynthesis.speak(speech);
    }


    const speedSelect = document.getElementById("speedSelect");

// Modify the speakText function to set the speech rate
function speakText() {
    speech.text = textInput.value;
    speech.rate = parseFloat(speedSelect.value); // Set the speech rate based on selected value
    window.speechSynthesis.speak(speech);
}

// Existing code...

// Ensure to listen for changes in the speed select if needed
speedSelect.addEventListener("change", () => {
    // Optionally, you can update the rate dynamically as the user changes it
    speech.rate = parseFloat(speedSelect.value);
});
    // Functions to control speech playback
    function pauseSpeech() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    }
    
    function resumeSpeech() {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    }
    
    function stopSpeech() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    }

    // Existing JavaScript code...

// Clear input functionality
document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("textInput").value = ""; // Clear the textarea
});

document.getElementById("clearButtons").addEventListener("click", () => {
    document.getElementById("convert_text").value = ""; // Clear the textarea
});
    
//voice to text
// Speech-to-text functionality
// Ensure variable names match HTML elements for Speech-to-Text functionality
const convertText = document.querySelector(".convert_text");
const clickToConvert = document.getElementById("click_to_convert");

// Speech-to-Text Functionality
clickToConvert.addEventListener('click', function() {
    let speechEnabled = true;
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join(' ');
        convertText.value = transcript; // Output transcript to the correct textarea
    });

    if (speechEnabled) {
        recognition.start();
    }
});

// Copy button functionality
document.getElementById("copyButton").addEventListener("click", function() {
    const text = document.getElementById("convert_text").value;
    navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
});

