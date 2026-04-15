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
