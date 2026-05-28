const GAS_API_URL = "https://script.google.com/macros/s/AKfycby0p8GsdIZ1tKtQT1aU15CDwsvIxZm_Scbw4SgT2ByQEm9PIqlMMzBAfpcpvCr61HT/exec";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("text-container");

  if (!GAS_API_URL || GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL")) {
    showError(container);
    return;
  }

  // 初期読み込み時は静かに「…」を表示
  container.textContent = "…";
  container.classList.add("show");

  fetchData(container);
});

async function fetchData(container) {
  try {
    const response = await fetch(GAS_API_URL);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    if (data && data.success && data.text) {
      // 読み込み完了後、下からふわっとフェードインさせる
      container.classList.remove("show");
      container.textContent = data.text;
      container.classList.add("fade-in");
    } else {
      throw new Error();
    }
  } catch (e) {
    showError(container);
  }
}

function showError(container) {
  container.classList.remove("fade-in");
  container.innerHTML = `手掛かりの取得に失敗しました。後ほどもう一度お試しください。<br>※ガチのエラーです。この表示は、一切謎と関係ありません。<br><br>…`;
  container.classList.add("show");
}
