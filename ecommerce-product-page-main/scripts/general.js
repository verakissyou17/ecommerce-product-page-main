const menu = document.querySelector(".menu");
const nav = document.querySelector(".header_box__right");
const close = document.querySelector(".close");

menu.addEventListener("click", () => {
  nav.classList.add("display");
});

close.addEventListener("click", () => {
  nav.classList.remove("display");
});