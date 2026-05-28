/**
 * Google Apps Script (GAS) 用のコード (5分ループ・完全プレーンテキスト版)
 * 
 * 【変更点】
 * 1時間単位ではなく「5分ごと（長針の位置）」でメッセージが切り替わるようにしました。
 * 0〜4分59秒 ＝ パターン0
 * 5〜9分59秒 ＝ パターン1
 * ...
 * 55〜59分59秒 ＝ パターン11
 * 
 * 【使い方】
 * Google Apps Scriptのコードをすべて消し、この内容に書き換えて「保存」し、再度デプロイしてください。
 */

function doGet(e) {
  // 5分刻み（長針の指す位置：0〜11）の日本語テキスト（各約20文字）
  const patterns = {
    0: "本棚の裏側に隠された鍵を探しなさい。",  // 0分〜4分59秒
    1: "赤いノートの最初のページを読みなさい。",  // 5分〜9分59秒
    2: "部屋 of 四隅にある置物の数を数えなさい。",  // 10分〜14分59秒
    3: "窓の外に見える青いランプを確認せよ。",  // 15分〜19分59秒
    4: "時計の針を十二時ちょうどに合わせよ。",  // 20分〜24分59秒
    5: "扉の右側にあるスイッチを三回押しなさい。",  // 25分〜29分59秒
    6: "引き出しの底にある隠し紙を取り出せ。",  // 30分〜34分59秒
    7: "黒い箱のダイヤルを四に合わせなさい。",  // 35分〜39分59秒
    8: "壁にかかった絵画の裏側を調べなさい。",  // 40分〜44分59秒
    9: "机の上にあるスマートフォンの画面を見よ。",  // 45分〜49分59秒
    10: "鏡に映る文字を右から順番に読みなさい。",  // 50分〜54分59秒
    11: "最後の答えは最初の部屋に隠されている。"   // 55分〜59分59秒
  };

  try {
    // 日本時間 (JST) の「分」を取得
    const now = new Date();
    const jstMinuteString = Utilities.formatDate(now, "Asia/Tokyo", "m"); // "0"〜"59" の文字列
    const minute = parseInt(jstMinuteString, 10);
    
    // 5分ごとにグループ化 (0〜11 のインデックスに変換)
    const patternIndex = Math.floor(minute / 5);
    
    const textContent = patterns[patternIndex] || "エラー";
    
    const responseData = {
      success: true,
      hour: patternIndex, // フロントエンド互換性のためキー名は残す
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
