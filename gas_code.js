/**
 * Google Apps Script (GAS) 用のコード (淡々としたメモ帳バージョン)
 * 
 * 【使い方】
 * Google Apps Scriptのコードをすべて消し、この内容に書き換えて「保存」し、再度デプロイ（デプロイの管理 ＞ 編集 ＞ 新しいバージョンでデプロイ）してください。
 */

function doGet(e) {
  // 極限までシンプルにしたテキストデータ
  const patterns = {
    0: `<div class="note-content">
          <div class="note-time">0:00 / 12:00</div>
          <div class="note-title">静寂の始まり</div>
          <div class="note-body">時計の針が天を指す時、すべては闇に包まれる。最初の鍵は「始まりの場所」に眠っている。</div>
          <div class="note-clue">手がかり: 始まりの文字を繋げよ</div>
        </div>`,
    1: `<div class="note-content">
          <div class="note-time">1:00 / 13:00</div>
          <div class="note-title">孤独の影</div>
          <div class="note-body">影は長く伸び、ただ一つの光を追いかける。孤独な旅人が残した足跡をたどれ。</div>
          <div class="note-clue">手がかり: 北極星の下を見よ</div>
        </div>`,
    2: `<div class="note-content">
          <div class="note-time">2:00 / 14:00</div>
          <div class="note-title">双子の天秤</div>
          <div class="note-body">二つの真実が釣り合う時、道は開かれる。どちらか一方だけでは、決して届かない。</div>
          <div class="note-clue">手がかり: 二重の円を描け</div>
        </div>`,
    3: `<div class="note-content">
          <div class="note-time">3:00 / 15:00</div>
          <div class="note-title">魔術の刻</div>
          <div class="note-body">丑三つ時の静寂が破られる。目に見えるものがすべてではない。五感を研ぎ澄ませ。</div>
          <div class="note-clue">手がかり: 鏡の向こう側に答えがある</div>
        </div>`,
    4: `<div class="note-content">
          <div class="note-time">4:00 / 16:00</div>
          <div class="note-title">暁の境界</div>
          <div class="note-body">夜と昼が交差する薄明の中、境界線が曖昧になる。失われた記憶を呼び覚ませ。</div>
          <div class="note-clue">手がかり: 青と赤が混ざり合う場所</div>
        </div>`,
    5: `<div class="note-content">
          <div class="note-time">5:00 / 17:00</div>
          <div class="note-title">目覚めの光</div>
          <div class="note-body">黄金の光が世界を照らし始める。しかし、光が強ければ影もまた濃くなることを忘れるな。</div>
          <div class="note-clue">手がかり: 影の伸びる方向へ進め</div>
        </div>`,
    6: `<div class="note-content">
          <div class="note-time">6:00 / 18:00</div>
          <div class="note-title">平穏の調律</div>
          <div class="note-body">均整の取れた世界がそこにある。過不足のない美しさを前に、あなたは正しく立ち止まれるか。</div>
          <div class="note-clue">手がかり: 中央の空白を数えよ</div>
        </div>`,
    7: `<div class="note-content">
          <div class="note-time">7:00 / 19:00</div>
          <div class="note-title">秘密の会合</div>
          <div class="note-body">影たちが集まり、囁きを交わしている。彼らの言葉を盗み聞きし、真実を暴き出せ。</div>
          <div class="note-clue">手がかり: 奇数の言葉だけを拾え</div>
        </div>`,
    8: `<div class="note-content">
          <div class="note-time">8:00 / 20:00</div>
          <div class="note-title">無限の螺旋</div>
          <div class="note-body">横たわる数字は無限を示す。終わりなき旅路の中で、あなたは最初の約束を覚えているか。</div>
          <div class="note-clue">手がかり: ループの結び目を探せ</div>
        </div>`,
    9: `<div class="note-content">
          <div class="note-time">9:00 / 21:00</div>
          <div class="note-title">賢者の書斎</div>
          <div class="note-body">積まれた古書の中に、歴史の真実が眠る。知恵 of 灯火を絶やさぬよう、慎重にページをめくれ。</div>
          <div class="note-clue">手がかり: 背表紙のアルファベット</div>
        </div>`,
    10: `<div class="note-content">
          <div class="note-time">10:00 / 22:00</div>
          <div class="note-title">黄金の砂時計</div>
          <div class="note-body">砂は絶え間なく流れ落ち、時間は残り少ない。焦りは禁物だが、立ち止まる時間もない。</div>
          <div class="note-clue">手がかり: 流れに逆らって昇れ</div>
        </div>`,
    11: `<div class="note-content">
          <div class="note-time">11:00 / 23:00</div>
          <div class="note-title">終焉の前奏曲</div>
          <div class="note-body">夜の帳が下りる直前、もっとも暗い時間が訪れる。明けない夜はないが、この夜を超える覚悟はあるか。</div>
          <div class="note-clue">手がかり: 最後に残った一つの灯火</div>
        </div>`
  };

  try {
    const now = new Date();
    const jstTimeString = Utilities.formatDate(now, "Asia/Tokyo", "H");
    const hour24 = parseInt(jstTimeString, 10);
    const hour12 = hour24 % 12;
    const htmlContent = patterns[hour12] || "<p>エラー</p>";
    
    const responseData = {
      success: true,
      hour: hour12,
      html: htmlContent
    };
    
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    const errorResponse = {
      success: false,
      error: "error"
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
