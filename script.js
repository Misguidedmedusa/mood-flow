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
function deleteEntry(index) {
  let data = JSON.parse(localStorage.getItem("trackerData")) || [];

  data.splice(index, 1);

  localStorage.setItem("trackerData", JSON.stringify(data));

  displayData();
}
function analyzeData() {
  const data = JSON.parse(localStorage.getItem("trackerData")) || [];

  if (data.length === 0) {
    document.getElementById("analysisBox").innerText = "No data yet.";
    return;
  }

  let phaseStats = {};

  data.forEach(entry => {
    if (!phaseStats[entry.phase]) {
      phaseStats[entry.phase] = {
        creativity: [],
        productivity: []
      };
    }

    phaseStats[entry.phase].creativity.push(Number(entry.creativity));
    phaseStats[entry.phase].productivity.push(Number(entry.productivity));
  });

  let resultText = "";

  let maxProdPhase = "";
  let maxProd = 0;

  let maxCreatPhase = "";
  let maxCreat = 0;

  for (let phase in phaseStats) {
    let cArr = phaseStats[phase].creativity;
    let pArr = phaseStats[phase].productivity;

    let avgC = cArr.reduce((a,b)=>a+b,0) / cArr.length;
    let avgP = pArr.reduce((a,b)=>a+b,0) / pArr.length;

    resultText += `${phase} → Creativity: ${avgC.toFixed(1)}, Productivity: ${avgP.toFixed(1)}\n`;

    if (avgP > maxProd) {
      maxProd = avgP;
      maxProdPhase = phase;
    }

    if (avgC > maxCreat) {
      maxCreat = avgC;
      maxCreatPhase = phase;
    }
  }

resultText += `\n✨ Insight:\n`;
  resultText += `You are most productive in ${maxProdPhase} phase.\n`;
  resultText += `Your creativity peaks in ${maxCreatPhase} phase.`;

  document.getElementById("analysisBox").innerText = resultText;
}
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("analysisContainer");

    if (container.style.display === "none") {
      container.style.display = "block";
      analyzeData();
    } else {
      container.style.display = "none";
    }
  });

});
  const container = document.getElementById("analysisContainer");

  if (container.style.display === "none") {
    container.style.display = "block";
    analyzeData();
  } else {
    container.style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", function () {

  const creativitySlider = document.getElementById("creativity");
  const productivitySlider = document.getElementById("productivity");
  const saveBtn = document.getElementById("saveBtn");
  const analysisBtn = document.getElementById("analysisBtn");

  // Slider color
  creativitySlider.addEventListener("input", (e) => {
    setSliderColor(e.target);
  });

  productivitySlider.addEventListener("input", (e) => {
    setSliderColor(e.target);
  });

  // Save button
  saveBtn.addEventListener("click", saveData);

  // Analysis toggle
  analysisBtn.addEventListener("click", () => {
    const container = document.getElementById("analysisContainer");

    if (container.style.display === "none") {
      container.style.display = "block";
      analyzeData();
    } else {
      container.style.display = "none";
    }
  });

  // Initialize sliders
  setSliderColor(creativitySlider);
  setSliderColor(productivitySlider);

  // Load saved data
  displayData();

});
