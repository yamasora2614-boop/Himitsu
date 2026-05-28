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
    0: "０．\nそこには青い鳥が佇んでいた",  // 0分〜4分59秒
    1: "１．\n___ek__",  // 5分〜9分59秒
    2: "２．\n□□□□■■□□□□□□□□□□□□□",  // 10分〜14分59秒
    3: "３．\n2026年",  // 15分〜19分59秒
    4: "４．\n■■■■■■■□□□□□",  // 20分〜24分59秒
    5: "５．\nまずは7文字を導き、特定せよ",  // 25分〜29分59秒
    6: "６．\n_____cg",  // 30分〜34分59秒
    7: "７．\n□□■■■□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□□ᯅ̈.ᐟ",  // 35分〜39分59秒
    8: "８．\n@______",  // 40分〜44分59秒
    9: "９．\n5月28日",  // 45分〜49分59秒
    10: "１０．\n_Li____",  // 50分〜54分59秒
    11: "１１．\n彼は偽物"   // 55分〜59分59秒
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
