const vibgyorColors = {
  1: "#8e44ad", // Violet
  2: "#5d3fd3", // Indigo
  3: "#3498db", // Blue
  4: "#2ecc71", // Green
  5: "#f1c40f", // Yellow
  6: "#e67e22", // Orange
  7: "#e74c3c"  // Red
};

// Make slider color dynamic
function setSliderColor(slider) {
  const value = slider.value;
  const color = vibgyorColors[value];

  slider.style.background = `linear-gradient(to right, ${color} ${value * 14}%, #ddd ${value * 14}%)`;
}

// Cycle phase
function getPhase(dayDiff) {
  if (dayDiff <= 5) return "Menstrual";
  if (dayDiff <= 13) return "Follicular";
  if (dayDiff <= 16) return "Ovulation";
  return "Luteal";
}

// Save data
function saveData() {
  const date = document.getElementById("date").value;
  const periodStart = document.getElementById("periodStart").value;
  const creativity = document.getElementById("creativity").value;
  const productivity = document.getElementById("productivity").value;

  if (!date || !periodStart) {
    alert("Please enter all fields");
    return;
  }

  const d1 = new Date(periodStart);
  const d2 = new Date(date);
  const diffDays = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;

  const phase = getPhase(diffDays);

  const entry = {
    date,
    creativity,
    productivity,
    phase
  };

  let data = JSON.parse(localStorage.getItem("trackerData")) || [];
  data.push(entry);

  localStorage.setItem("trackerData", JSON.stringify(data));

  displayData();
}

// Display entries
function displayData() {
  const list = document.getElementById("entriesList");
  list.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("trackerData")) || [];

  data.forEach((entry) => {
    const li = document.createElement("li");

    li.innerText = `${entry.date}
Phase: ${entry.phase}
Creativity: ${entry.creativity}
Productivity: ${entry.productivity}`;

    list.appendChild(li);
  });
}

// Event listeners
const creativitySlider = document.getElementById("creativity");
const productivitySlider = document.getElementById("productivity");

creativitySlider.addEventListener("input", (e) => {
  setSliderColor(e.target);
});

productivitySlider.addEventListener("input", (e) => {
  setSliderColor(e.target);
});

// Save button
document.getElementById("saveBtn").addEventListener("click", saveData);

// Initialize colors
setSliderColor(creativitySlider);
setSliderColor(productivitySlider);

// Load data
displayData();
