// メニュー開閉処理
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

