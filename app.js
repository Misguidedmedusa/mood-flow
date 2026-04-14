function getCycleDay(startDate) {
  const today = new Date();
  const start = new Date(startDate);
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return (diff % 28) + 1;
}

function getPhase(day) {
  if (day <= 5) return "Menstrual";
  if (day <= 13) return "Follicular";
  if (day <= 16) return "Ovulation";
  return "Luteal";
}

function updateCycle() {
  const startDate = document.getElementById("startDate").value;

  if (!startDate) return;

  const day = getCycleDay(startDate);
  const phase = getPhase(day);

  document.getElementById("cycleInfo").innerText =
    `Day ${day} — ${phase}`;
}

document.getElementById("startDate").addEventListener("change", updateCycle);

function save() {
  const startDate = document.getElementById("startDate").value;
  if (!startDate) {
    alert("Enter start date");
    return;
  }

  const day = getCycleDay(startDate);
  const phase = getPhase(day);

  const prod = document.getElementById("prod").value;
  const crea = document.getElementById("crea").value;

  const today = new Date().toISOString().split("T")[0];

  const logs = JSON.parse(localStorage.getItem("logs") || "{}");

  logs[today] = {
    productivity: Number(prod),
    creativity: Number(crea),
    cycleDay: day,
    phase: phase,
  };

  localStorage.setItem("logs", JSON.stringify(logs));

  displayLogs();
  showPrediction();
}

function displayLogs() {
  const logs = JSON.parse(localStorage.getItem("logs") || "{}");
  const div = document.getElementById("logs");

  div.innerHTML = "";

  for (let date in logs) {
    const entry = logs[date];

    div.innerHTML += `
      <p>
        ${date} | Day ${entry.cycleDay} (${entry.phase})  
        → P:${entry.productivity}, C:${entry.creativity}
      </p>
    `;
  }
}

function showPrediction() {
  const logs = JSON.parse(localStorage.getItem("logs") || "{}");
  const startDate = document.getElementById("startDate").value;

  if (!startDate) return;

  const day = getCycleDay(startDate);
  const phase = getPhase(day);

  const entries = Object.values(logs).filter(e => e.phase === phase);

  if (entries.length === 0) return;

  const avg = (key) =>
    entries.reduce((sum, e) => sum + e[key], 0) / entries.length;

  document.getElementById("prediction").innerText =
    `Expected → Productivity: ${avg("productivity").toFixed(1)}, Creativity: ${avg("creativity").toFixed(1)}`;
}

displayLogs();
showPrediction();
