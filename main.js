/**
 * 謎解きゲーム用 時間連動型Webサイト メインスクリプト
 * 
 * [重要] 下記の GAS_API_URL 変数に、Google Apps Script (GAS) で
 * 発行した「ウェブアプリのURL」を貼り付けてください。
 */
const GAS_API_URL = "https://script.google.com/macros/s/AKfycby0p8GsqdIZ1tKtQT1aU15CDwsvIxZm_Scbw4SgT2ByQEm9PIqlMMzBAfpcpvCr61HT/exec";

document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("game-content");

  // GASのURLが未設定の場合の案内
  if (!GAS_API_URL || GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL")) {
    showSetupInstructions(contentArea);
    return;
  }

  fetchTimeBoundData(contentArea);
});

/**
 * GASから「現在の時間用」のHTMLデータを非同期で取得する
 */
async function fetchTimeBoundData(container) {
  showLoader(container);

  try {
    // GASのAPIを叩く
    const response = await fetch(GAS_API_URL);

    if (!response.ok) {
      throw new Error(`HTTPエラーが発生しました。ステータス: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.success && data.html) {
      // 成功した場合、今の時間用のHTMLを画面に流し込む
      // (検証モードで見ても、この時に受け取った「今の時間用」のHTMLしか表示されません)
      container.innerHTML = data.html;
    } else {
      throw new Error("データの取得に失敗したか、データ構造が正しくありません。");
    }

  } catch (error) {
    console.error("エラー詳細:", error);
    showError(container, error.message);
  }
}

/**
 * ローディング表示を行う
 */
function showLoader(container) {
  container.innerHTML = `
    <div class="loader-container">
      <div class="clock-loader"></div>
      <div class="loading-text">時間の破片を収束中...</div>
    </div>
  `;
}

/**
 * エラー画面を表示する
 */
function showError(container, errorMessage) {
  container.innerHTML = `
    <div class="error-card">
      <div class="error-icon">⚠️</div>
      <h2>時間の接続に失敗</h2>
      <p>時の流れが乱れています。接続環境を確認するか、時間をおいて再度お試しください。</p>
      <p style="font-size: 0.8rem; color: #ff6b6b; margin-bottom: 20px;">[エラー詳細: ${errorMessage}]</p>
      <button class="retry-btn" id="retry-btn">時の接続を再試行</button>
    </div>
  `;

  // リトライボタンの動作設定
  document.getElementById("retry-btn").addEventListener("click", () => {
    fetchTimeBoundData(container);
  });
}

/**
 * 初心者向けの初期セットアップ案内を表示する
 */
function showSetupInstructions(container) {
  container.innerHTML = `
    <div class="story-card" style="text-align: left;">
      <div class="time-badge" style="display: block; text-align: center; margin-bottom: 15px;">初期セットアップ待ち</div>
      <h2 style="font-size: 1.4rem; color: var(--color-gold); text-align: center; margin-bottom: 15px;">システム未接続</h2>
      <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 15px;">
        HTMLファイルの配置は成功しています！<br>
        このWebサイトを動作させるためには、<b>Google Apps Script (GAS)</b> をデプロイして発行したウェブアプリのURLを紐付ける必要があります。
      </p>
      <div class="clue" style="font-size: 0.85rem; border-left-color: #ff4a4a; background: rgba(255, 74, 74, 0.05);">
        <b>【次のステップ】</b><br>
        1. 同封の <code>manual.md</code> または <code>gas_code.js</code> の指示に従ってGASを作成・デプロイしてください。<br>
        2. 発行されたURLを <code>main.js</code> の1行目にある <code>GAS_API_URL</code> に貼り付けて保存してください。
      </div>
    </div>
  `;
}
