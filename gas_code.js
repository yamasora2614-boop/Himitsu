/**
 * Google Apps Script (GAS) 用のコード (完全プレーンテキスト版)
 * 
 * 【使い方】
 * Google Apps Scriptのコードをすべて消し、この内容に書き換えて「保存」し、再度デプロイしてください。
 */

function doGet(e) {
  // 各時間帯の約20文字のシンプルな日本語テキスト
  const patterns = {
    0: "本棚の裏側に隠された鍵を探しなさい。",
    1: "赤いノートの最初のページを読みなさい。",
    2: "部屋の四隅にある置物の数を数えなさい。",
    3: "窓の外に見える青いランプを確認せよ。",
    4: "時計の針を十二時ちょうどに合わせよ。",
    5: "扉の右側にあるスイッチを三回押しなさい。",
    6: "引き出しの底にある隠し紙を取り出せ。",
    7: "黒い箱のダイヤルを四に合わせなさい。",
    8: "壁にかかった絵画の裏側を調べなさい。",
    9: "机の上にあるスマートフォンの画面を見よ。",
    10: "鏡に映る文字を右から順番に読みなさい。",
    11: "最後の答えは最初の部屋に隠されている。"
  };

  try {
    const now = new Date();
    const jstTimeString = Utilities.formatDate(now, "Asia/Tokyo", "H");
    const hour24 = parseInt(jstTimeString, 10);
    const hour12 = hour24 % 12;
    const textContent = patterns[hour12] || "エラー";
    
    const responseData = {
      success: true,
      hour: hour12,
      text: textContent
    };
    
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    const errorResponse = {
      success: false,
      text: "error"
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
