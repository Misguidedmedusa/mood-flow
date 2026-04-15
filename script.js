// VIBGYOR mapping
const vibgyor = {
  1: { name: "Violet", color: "#8e44ad" },
  2: { name: "Indigo", color: "#5d3fd3" },
  3: { name: "Blue", color: "#3498db" },
  4: { name: "Green", color: "#2ecc71" },
  5: { name: "Yellow", color: "#f1c40f" },
  6: { name: "Orange", color: "#e67e22" },
  7: { name: "Red", color: "#e74c3c" }
};

// Update text + color label
function updateSlider(sliderId, textId) {
  const value = document.getElementById(sliderId).value;
  const data = vibgyor[value];

  const text = document.getElementById(textId);
  text.innerText = data.name;
  text.style.color = data.color;
}

// Color the slider itself
function setSliderColor(slider) {
  const value = slider.value;
  slider.style.background = vibgyor[value].color;
}

// Cycle phase logic
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
    alert("Please enter all dates");
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

// Display data
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
document.getElementById("creativity").addEventListener("input", (e) => {
  updateSlider("creativity", "creativityValue");
  setSliderColor(e.target);
});

document.getElementById("productivity").addEventListener("input", (e) => {
  updateSlider("productivity", "productivityValue");
  setSliderColor(e.target);
});

// Save button
document.getElementById("saveBtn").addEventListener("click", saveData);

// Initialize
updateSlider("creativity", "creativityValue");
updateSlider("productivity", "productivityValue");

setSliderColor(document.getElementById("creativity"));
setSliderColor(document.getElementById("productivity"));

displayData();
