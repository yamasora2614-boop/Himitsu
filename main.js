const GAS_API_URL = "https://script.google.com/macros/s/AKfycby0p8GsqdIZ1tKtQT1aU15CDwsvIxZm_Scbw4SgT2ByQEm9PIqlMMzBAfpcpvCr61HT/exec";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("text-container");
  const spinner = document.getElementById("spinner");

  if (!GAS_API_URL || GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL")) {
    showError(container);
    return;
  }

  // スピナーを表示
  if (spinner) {
    spinner.classList.add("show");
  }

  fetchData(container, spinner);
});

async function fetchData(container, spinner) {
  try {
    const response = await fetch(GAS_API_URL);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    if (data && data.success && data.text) {
      // 成功したらスピナーを非表示
      if (spinner) {
        spinner.classList.remove("show");
      }

      container.classList.remove("show");
      container.textContent = data.text;
      container.classList.add("fade-in");

      // 現在の時間帯(0〜11)から、背景のアナログ時計風扇形マスクを設定
      if (typeof data.hour === "number") {
        const patternIndex = data.hour;
        const startAngle = patternIndex * 30;
        const endAngle = startAngle + 30;

        document.body.style.background = `
          conic-gradient(from 0deg, 
            transparent 0deg ${startAngle}deg, 
            rgba(0, 0, 0, 0.45) ${startAngle}deg ${endAngle}deg, 
            transparent ${endAngle}deg 360deg
          ),
          radial-gradient(circle at center, #222222 0%, #000000 100%)
        `;
      }
    } else {
      throw new Error();
    }
  } catch (e) {
    // エラー時もスピナーを非表示
    if (spinner) {
      spinner.classList.remove("show");
    }
    showError(container);
  }
}

function showError(container) {
  // エラー時は背景を通常に戻す
  document.body.style.background = `radial-gradient(circle at center, #222222 0%, #000000 100%)`;
  
  container.classList.remove("fade-in");
  container.innerHTML = `手掛かりの取得に失敗しました。後ほどもう一度お試しください。<br>※ガチのエラーです。この表示は、一切謎と関係ありません。<br><br>…`;
  container.classList.add("show");
}
