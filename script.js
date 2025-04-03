// DOM Elements
const passwordDisplay = document.getElementById("passwordDisplay");
const copyButton = document.getElementById("copyButton");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValueSpan = document.getElementById("lengthValue");
const includeUppercase = document.getElementById("includeUppercase");
const includeLowercase = document.getElementById("includeLowercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generateButton = document.getElementById("generateButton");
const copyMessage = document.getElementById("copyMessage");
const errorMessage = document.getElementById("error-message");

// --- Character Sets ---
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// --- Improved random char gen ---
function getSecureRandomChar(characterString) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomIndex = randomBuffer[0] % characterString.length;
  return characterString[randomIndex];
}

// --- Core Logic Functions ---
function generatePassword() {
  const length = parseInt(lengthSlider.value);

  const uppercase = includeUppercase.checked;
  const lowercase = includeLowercase.checked;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;

  let allowedChars = "";
  if (includeUppercase.checked) allowedChars += uppercaseChars;
  if (includeLowercase.checked) allowedChars += lowercaseChars;
  if (includeNumbers.checked) allowedChars += numberChars;
  if (includeSymbols.checked) allowedChars += symbolChars;

  if (!allowedChars) {
    errorMessage.textContent = "Please select at least one character type.";
    return;
  } else {
    errorMessage.textContent = ""; // Clear any previous error message
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getSecureRandomChar(allowedChars);
  }

  passwordDisplay.value = password;
}

function updateLengthValue() {
  lengthValueSpan.textContent = lengthSlider.value;
}

function copyToClipboard() {
  if (passwordDisplay.value) {
    navigator.clipboard.writeText(passwordDisplay.value);
    copyMessage.classList.add("show");
    setTimeout(() => {
      copyMessage.classList.remove("show");
    }, 3000); // Message disappears after 3 seconds
  }
}

// --- Event Listeners ---
generateButton.addEventListener("click", generatePassword);
lengthSlider.addEventListener("input", updateLengthValue);
copyButton.addEventListener("click", copyToClipboard);

// --- Initialization ---
updateLengthValue(); // Set initial length value
