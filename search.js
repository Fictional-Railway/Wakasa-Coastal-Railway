// メニュー開閉処理
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});



// search.js
document.addEventListener("DOMContentLoaded", () => {
  const summaryDiv = document.getElementById("search-summary");
  const resultDiv = document.getElementById("search-result-box");

  // URLパラメータ取得
  const params = new URLSearchParams(window.location.search);
  const from = params.get("from");
  const to = params.get("to");
  const time = params.get("time");

  // 駅名マップ（英語→日本語）
  const stationNames = {
    higasie: "東江",
    takauramisaki: "高浦岬",
    ezaki: "江崎",
    nisiezaki: "西江崎",
    mononobekaigan: "物部海岸",
    higasimononobe: "東物部",
    monobe: "物部",
    ichizaki: "市崎",
    funatani: "舟谷",
    ifune: "伊舟",
    shiogai: "汐崖",
    kitashiogai: "北汐崖",
    watariminato: "渡湊",
    watarimati: "渡町",
    matsuyou: "松陽",
    kitakouzu: "北香津",
    kouzu: "香津"
  };

  if (!from || !to) {
    summaryDiv.innerHTML = `<p style="color:red;">検索条件が正しく指定されていません。</p>`;
    return;
  }

  // 検索条件を表示
  summaryDiv.innerHTML = `
    <p><strong>出発駅：</strong>${stationNames[from] || from}</p>
    <p><strong>到着駅：</strong>${stationNames[to] || to}</p>
    <p><strong>出発時刻：</strong>${time || "指定なし"}</p>
  `;

  // 架空データ（ここは自由に拡張可）
  const fakeTrains = [
    { type: "普通", dep: "08:04", arr: "09:42",},
    { type: "普通", dep: "08:21", arr: "09:46",},
    { type: "快速", dep: "08:45", arr: "09:17",},
    { type: "普通", dep: "08:58", arr: "09:25",},
    { type: "普通", dep: "09:04", arr: "10:42",},
    { type: "普通", dep: "09:21", arr: "10:46",},
    { type: "快速", dep: "09:45", arr: "10:17",},
    { type: "普通", dep: "09:58", arr: "10:25",},
    { type: "普通", dep: "10:04", arr: "11:42",},
    { type: "普通", dep: "10:21", arr: "11:46",},
    { type: "快速", dep: "10:45", arr: "11:17",},
    { type: "普通", dep: "10:58", arr: "11:25",},
    { type: "普通", dep: "11:04", arr: "12:42",},
    { type: "普通", dep: "11:21", arr: "12:46",},
    { type: "快速", dep: "11:45", arr: "12:17",},
    { type: "普通", dep: "11:58", arr: "12:25",},
    { type: "普通", dep: "12:04", arr: "13:42",},
    { type: "普通", dep: "12:21", arr: "13:46",},
    { type: "快速", dep: "12:45", arr: "13:17",},
    { type: "普通", dep: "12:58", arr: "13:25",},
    { type: "普通", dep: "13:04", arr: "14:42",},
    { type: "普通", dep: "13:21", arr: "14:46",},
    { type: "快速", dep: "13:45", arr: "14:17",},
    { type: "普通", dep: "13:58", arr: "14:25",},
  ];

  // 指定時刻に近い列車だけ抽出
  let filteredTrains = fakeTrains;
  if (time) {
    filteredTrains = fakeTrains.filter((t) => t.dep >= time);
    if (filteredTrains.length === 0) filteredTrains = [fakeTrains[0]];
  }

  // 結果HTML生成
  let html = `
    <table class="result-table">
      <thead>
        <tr>
          <th>種別</th>
          <th>出発</th>
          <th>到着</th>
        </tr>
      </thead>
      <tbody>
  `;

  filteredTrains.forEach((t) => {
    html += `
      <tr>
        <td>${t.type}</td>
        <td>${t.dep}</td>
        <td>${t.arr}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <p class="result-note">※表示時刻はダミーです。実際のダイヤとは異なります。</p>
  `;

  resultDiv.innerHTML = html;
});
