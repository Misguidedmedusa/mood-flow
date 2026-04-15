const vibgyor = {
  1: { name: "Violet", color: "#8e44ad" },
  2: { name: "Indigo", color: "#5d3fd3" },
  3: { name: "Blue", color: "#3498db" },
  4: { name: "Green", color: "#2ecc71" },
  5: { name: "Yellow", color: "#f1c40f" },
  6: { name: "Orange", color: "#e67e22" },
  7: { name: "Red", color: "#e74c3c" }
};

function updateSlider(sliderId, textId) {
  const slider = document.getElementById(sliderId);
  const text = document.getElementById(textId);

  const value = slider.value;
  const data = vibgyor[value];

  text.innerText = data.name;
  text.style.color = data.color;
}

// Event listeners
document.getElementById("creativity").addEventListener("input", () => {
  updateSlider("creativity", "creativityValue");
});

document.getElementById("productivity").addEventListener("input", () => {
  updateSlider("productivity", "productivityValue");
});

// Initialize on load
updateSlider("creativity", "creativityValue");
updateSlider("productivity", "productivityValue");
function getPhase(dayDiff) {
  if (dayDiff <= 5) return "Menstrual";
  if (dayDiff <= 13) return "Follicular";
  if (dayDiff <= 16) return "Ovulation";
  return "Luteal";
}

function saveData() {
  const date = document.getElementById("date").value;
  const periodStart = document.getElementById("periodStart").value;
  const creativity = document.getElementById("creativity").value;
  const productivity = document.getElementById("productivity").value;

  if (!date || !periodStart) {
    alert("Please enter all dates");
    return;
  }

  // Calculate cycle day
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

function displayData() {
  const list = document.getElementById("entriesList");
  list.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("trackerData")) || [];

  data.forEach((entry) => {
    const li = document.createElement("li");

    li.innerText = `${entry.date} | Phase: ${entry.phase} | Creativity: ${entry.creativity} | Productivity: ${entry.productivity}`;

    list.appendChild(li);
  });
}

// Load on start
displayData();
document.getElementById("saveBtn").addEventListener("click", saveData);
