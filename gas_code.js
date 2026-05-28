/**
 * Google Apps Script (GAS) 用のコード
 * 
 * 【使い方】
 * 1. Googleドライブから「Google Apps Script」を開き、このコードを「コード.gs」に丸ごと貼り付けてください。
 * 2. 12パターンのHTML（謎解きの内容）は、下記の `patterns` オブジェクトで自由に変更できます。
 * 3. 貼り付けが終わったら、右上の「デプロイ」ボタンから「新しいデプロイ」を行い、ウェブアプリとして公開します。
 * 
 * 詳しい手順は、同封の「manual.md」または「manual.html」をご覧ください。
 */

function doGet(e) {
  // --- 12時間周期（0〜11時）の謎解きストーリー・手がかりデータ ---
  // 午前・午後の区別なく、現在の時間（時 % 12）に応じて以下のHTMLデータが返されます。
  // 各パターンのHTMLは自由にカスタマイズ可能です。
  const patterns = {
    0: `<div class="story-card">
          <div class="time-badge">0:00 / 12:00</div>
          <h2>静寂の始まり</h2>
          <p>時計の針が天を指す時、すべては闇に包まれる。最初の鍵は「始まりの場所」に眠っている。</p>
          <div class="clue">手がかり: 始まりの文字を繋げよ</div>
        </div>`,
    1: `<div class="story-card">
          <div class="time-badge">1:00 / 13:00</div>
          <h2>孤独の影</h2>
          <p>影は長く伸び、ただ一つの光を追いかける。孤独な旅人が残した足跡をたどれ。</p>
          <div class="clue">手がかり: 北極星の下を見よ</div>
        </div>`,
    2: `<div class="story-card">
          <div class="time-badge">2:00 / 14:00</div>
          <h2>双子の天秤</h2>
          <p>二つの真実が釣り合う時、道は開かれる。どちらか一方だけでは、決して届かない。</p>
          <div class="clue">手がかり: 二重の円を描け</div>
        </div>`,
    3: `<div class="story-card">
          <div class="time-badge">3:00 / 15:00</div>
          <h2>魔術の刻</h2>
          <p>丑三つ時の静寂が破られる。目に見えるものがすべてではない。五感を研ぎ澄ませ。</p>
          <div class="clue">手がかり: 鏡の向こう側に答えがある</div>
        </div>`,
    4: `<div class="story-card">
          <div class="time-badge">4:00 / 16:00</div>
          <h2>暁の境界</h2>
          <p>夜と昼が交差する薄明の中、境界線が曖昧になる。失われた記憶を呼び覚ませ。</p>
          <div class="clue">手がかり: 青と赤が混ざり合う場所</div>
        </div>`,
    5: `<div class="story-card">
          <div class="time-badge">5:00 / 17:00</div>
          <h2>目覚めの光</h2>
          <p>黄金の光が世界を照らし始める。しかし、光が強ければ影もまた濃くなることを忘れるな。</p>
          <div class="clue">手がかり: 影の伸びる方向へ進め</div>
        </div>`,
    6: `<div class="story-card">
          <div class="time-badge">6:00 / 18:00</div>
          <h2>平穏の調律</h2>
          <p>均整の取れた世界がそこにある。過不足のない美しさを前に、あなたは正しく立ち止まれるか。</p>
          <div class="clue">手がかり: 中央の空白を数えよ</div>
        </div>`,
    7: `<div class="story-card">
          <div class="time-badge">7:00 / 19:00</div>
          <h2>秘密の会合</h2>
          <p>影たちが集まり、囁きを交わしている。彼らの言葉を盗み聞きし、真実を暴き出せ。</p>
          <div class="clue">手がかり: 奇数の言葉だけを拾え</div>
        </div>`,
    8: `<div class="story-card">
          <div class="time-badge">8:00 / 20:00</div>
          <h2>無限の螺旋</h2>
          <p>横たわる数字は無限を示す。終わりなき旅路の中で、あなたは最初の約束を覚えているか。</p>
          <div class="clue">手がかり: ループの結び目を探せ</div>
        </div>`,
    9: `<div class="story-card">
          <div class="time-badge">9:00 / 21:00</div>
          <h2>賢者の書斎</h2>
          <p>積まれた古書の中に、歴史の真実が眠る。知恵の灯火を絶やさぬよう、慎重にページをめくれ。</p>
          <div class="clue">手がかり: 背表紙のアルファベット</div>
        </div>`,
    10: `<div class="story-card">
          <div class="time-badge">10:00 / 22:00</div>
          <h2>黄金の砂時計</h2>
          <p>砂は絶え間なく流れ落ち、時間は残り少ない。焦りは禁物だが、立ち止まる時間もない。</p>
          <div class="clue">手がかり: 流れに逆らって昇れ</div>
        </div>`,
    11: `<div class="story-card">
          <div class="time-badge">11:00 / 23:00</div>
          <h2>終焉の前奏曲</h2>
          <p>夜の帳が下りる直前、もっとも暗い時間が訪れる。明けない夜はないが、この夜を超える覚悟はあるか。</p>
          <div class="clue">手がかり: 最後に残った一つの灯火</div>
        </div>`
  };

  try {
    // 1. サーバーの現在時刻から、日本時間 (JST) を取得
    // ※ GASが実行されるサーバーのタイムゾーンに影響されないよう明示的に「Asia/Tokyo」を指定します。
    const now = new Date();
    const jstTimeString = Utilities.formatDate(now, "Asia/Tokyo", "H"); // 24時間表記の「時」を取得 (例: "17")
    const hour24 = parseInt(jstTimeString, 10);
    
    // 2. 24時間表記を12時間周期（0〜11）に変換する (余り計算)
    // 例：17時(午後5時) % 12 = 5時、5時 % 12 = 5時。これで午前・午後で同じ結果になります。
    const hour12 = hour24 % 12;
    
    // 3. 該当する時間帯のHTMLデータを取得
    const htmlContent = patterns[hour12] || "<p>エラー：該当する時間のデータが見つかりません。</p>";
    
    // 4. クライアントに返すJSONレスポンスの組み立て
    const responseData = {
      success: true,
      hour: hour12,
      html: htmlContent
    };
    
    // 5. JSON形式でデータを返却
    // ※ CORS対策を自動で行うため、ContentServiceを使用し、MimeTypeをJSONに指定して返します。
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 予期せぬエラーが発生した場合のレスポンス
    const errorResponse = {
      success: false,
      error: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
