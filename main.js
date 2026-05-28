const GAS_API_URL = "https://script.google.com/macros/s/AKfycby0p8GsqdIZ1tKtQT1aU15CDwsvIxZm_Scbw4SgT2ByQEm9PIqlMMzBAfpcpvCr61HT/exec";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("game-content");

  if (!GAS_API_URL || GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL")) {
    container.innerHTML = `<div class="error">URL error</div>`;
    return;
  }

  fetchData(container);
});

async function fetchData(container) {
  try {
    const response = await fetch(GAS_API_URL);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    if (data && data.success && data.html) {
      container.innerHTML = data.html;
    } else {
      throw new Error();
    }
  } catch (e) {
    container.innerHTML = `<div class="error">error</div>`;
  }
}
