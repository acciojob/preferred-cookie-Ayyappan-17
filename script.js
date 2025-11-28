//your JS code here. If required.
// DOM elements
const form = document.querySelector("form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Function to set a cookie
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

// Function to get a cookie
function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

// Apply preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
    fontSizeInput.value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    fontColorInput.value = savedFontColor;
  }
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;

  // Save in cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // Apply immediately
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  alert("Preferences saved!");
});

// Apply preferences on page load
applyPreferences();

