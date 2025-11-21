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
  { type: "普通", dep: "07:12", arr: "08:03" },
  { type: "普通", dep: "07:48", arr: "08:39" },

  { type: "普通", dep: "08:55", arr: "09:46" },
  { type: "快速", dep: "09:32", arr: "10:06" },

  { type: "普通", dep: "10:58", arr: "11:49" },

  { type: "普通", dep: "12:10", arr: "13:01" },

  { type: "普通", dep: "14:02", arr: "14:54" },
  { type: "快速", dep: "14:45", arr: "15:18" },

  { type: "普通", dep: "15:58", arr: "16:49" },

  { type: "普通", dep: "17:12", arr: "18:03" },
  { type: "普通", dep: "17:55", arr: "18:46" },

  { type: "普通", dep: "19:08", arr: "19:59" },
  { type: "快速", dep: "19:40", arr: "20:12" }
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
