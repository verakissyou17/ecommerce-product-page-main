import { initCart, renderUI } from "./cart.js";
import { initProduct } from "./script.js";

async function loadProducts() {
  const response = await fetch("./products.json");
  const products = await response.json();
  return products;
}

document.addEventListener("DOMContentLoaded", async () => {
  const products = await loadProducts();
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".header_box__right");
  const closeBtn = document.querySelector(".close");
  const links = nav.querySelectorAll("li a");
  const header = document.querySelector(".header");
  const line = header.querySelector(".line");

  menu.addEventListener("click", () => {
    nav.classList.add("display");
  });

  closeBtn.addEventListener("click", () => {
    nav.classList.remove("display");
  });

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const rect = link.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();

      line.style.width = rect.width + "px";
      line.style.left = rect.left - headerRect.left + "px";
      line.style.opacity = "1";
    });
  });

  links.forEach(link => {
    link.addEventListener("mouseleave", () => {
      line.style.opacity = "0";
    })
  })

  initProduct(products);
  initCart(products);
  renderUI(products);
});
