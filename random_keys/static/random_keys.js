
document.getElementById("generator-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const symbolMap = {
  "Bb": "B♭",
  "Eb": "E♭",
  "Ab": "A♭",
  "Db": "D♭",
  "Gb": "G♭",
  "F#": "F♯",
  "C#": "C♯",
  "G#": "G♯",
  "D#": "D♯",
  "A#": "A♯"
};

  const bars = document.getElementById("bars").value;
  const response = await fetch("random_keys/generate-keys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bars })
  });

  if (!response.ok) {
    alert("Error: check if the number of bars is between 1 and 24.")
    return;
  }

  const data = await response.json();
  const container = document.getElementById("tiles-container");
  container.innerHTML = "";

  data.keys.forEach((key) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = symbolMap[key] || key;
    container.appendChild(tile);
  });
});
