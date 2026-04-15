// VIBGYOR colors
const vibgyorColors = {
  1: "#8e44ad",
  2: "#5d3fd3",
  3: "#3498db",
  4: "#2ecc71",
  5: "#f1c40f",
  6: "#e67e22",
  7: "#e74c3c"
};

// Slider color
function setSliderColor(slider) {
  const value = slider.value;
  const color = vibgyorColors[value];
  const percent = (value - 1) / 6 * 100;

  slider.style.background = `linear-gradient(to right, ${color} ${percent}%, #ddd ${percent}%)`;
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

  const entry = { date, creativity, productivity, phase };

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

  data.forEach((entry, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <button class="delete-btn" onclick="deleteEntry(${index})">X</button>
      ${entry.date}<br>
      Phase: ${entry.phase}<br>
      Creativity: ${entry.creativity}<br>
      Productivity: ${entry.productivity}
    `;

    list.appendChild(li);
  });
}

// Delete entry
function deleteEntry(index) {
  let data = JSON.parse(localStorage.getItem("trackerData")) || [];
  data.splice(index, 1);
  localStorage.setItem("trackerData", JSON.stringify(data));
  displayData();
}

// Analysis
function analyzeData() {
  const data = JSON.parse(localStorage.getItem("trackerData")) || [];
  const box = document.getElementById("analysisBox");

  if (!data.length) {
    box.innerText = "No data yet.";
    return;
  }

  let phaseStats = {};

  data.forEach(entry => {
    if (!phaseStats[entry.phase]) {
      phaseStats[entry.phase] = { creativity: [], productivity: [] };
    }

    phaseStats[entry.phase].creativity.push(Number(entry.creativity));
    phaseStats[entry.phase].productivity.push(Number(entry.productivity));
  });

  let result = "";
  let maxProd = 0, maxProdPhase = "";
  let maxCreat = 0, maxCreatPhase = "";

  for (let phase in phaseStats) {
    let cArr = phaseStats[phase].creativity;
    let pArr = phaseStats[phase].productivity;

    let avgC = cArr.reduce((a,b)=>a+b,0) / cArr.length;
    let avgP = pArr.reduce((a,b)=>a+b,0) / pArr.length;

    result += `${phase} → Creativity: ${avgC.toFixed(1)}, Productivity: ${avgP.toFixed(1)}\n`;

    if (avgP > maxProd) {
      maxProd = avgP;
      maxProdPhase = phase;
    }

    if (avgC > maxCreat) {
      maxCreat = avgC;
      maxCreatPhase = phase;
    }
  }

  result += `\n✨ Insight:\n`;
  result += `You are most productive in ${maxProdPhase} phase.\n`;
  result += `Your creativity peaks in ${maxCreatPhase} phase.`;

  box.innerText = result;
}

// ✅ MAIN INITIALIZATION (ONLY ONE BLOCK)
document.addEventListener("DOMContentLoaded", function () {

  const creativitySlider = document.getElementById("creativity");
  const productivitySlider = document.getElementById("productivity");
  const saveBtn = document.getElementById("saveBtn");
  const analysisBtn = document.getElementById("analysisBtn");
  const analysisContainer = document.getElementById("analysisContainer");

  // Sliders
  creativitySlider.addEventListener("input", (e) => {
    setSliderColor(e.target);
  });

  productivitySlider.addEventListener("input", (e) => {
    setSliderColor(e.target);
  });

  // Save
  saveBtn.addEventListener("click", saveData);

  // Analysis toggle
  if (analysisBtn && analysisContainer) {
    analysisBtn.addEventListener("click", () => {
      if (analysisContainer.style.display === "none" || analysisContainer.style.display === "") {
        analysisContainer.style.display = "block";
        analyzeData();
      } else {
        analysisContainer.style.display = "none";
      }
    });
  }

  // Init
  setSliderColor(creativitySlider);
  setSliderColor(productivitySlider);
  displayData();

});
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}
