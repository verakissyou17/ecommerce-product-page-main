import { formatMoney, calculateDiscount } from "../utils/formatMoney.js";
import { renderUI, addToCart } from "../scripts/cart.js";

 export let products;

async function fetchData() {
  try {
    const response = await fetch("./products.json");
    if (!response) {
      throw new Error("Could not find the data.");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

products = await fetchData();

const main = document.querySelector("main");

products.forEach((product) => {
  let quantity = 0;

  const html = `
      <article class="main_article" data-product-id="${product.id}">
        <svg
          class="close-btn"
          width="14"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
            fill="#69707D"
            fill-rule="evenodd"
          />
        </svg>
        <div class="main_article__images">
        <div class="icon prev-icon">
          <svg
            width="12"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 1 3 9l8 8"
              stroke="#1D2026"
              stroke-width="3"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
          </div>
          <img class="image" src="${product.images[0]}" alt="${product.name}" />
          <div class="icon next-icon">
          <svg
            width="13"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m2 1 8 8-8 8"
              stroke="#1D2026"
              stroke-width="3"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
          </div>
        </div>
        <fieldset class="main_article__thumbnails">
        ${product.thumbnails
          .map(
            (thumbnail, index) =>
              `<img src="${thumbnail}" alt="thumbnail-${index}" />`,
          )
          .join("")}
        </fieldset>
      </article>
      <article class="main_article__text">
        <section class="main_article__box">
          <span class="subtitle">Sneaker Company</span>
          <h1 class="title">${product.name}</h1>
          <p class="text">${product.description}</p>
        </section>
        <section class="main_article__box-price">
          <div>
            <h2>
              $${calculateDiscount(
                formatMoney(product.price),
                product.discount,
              )}
            </h2>
            <span>${product.discount}%</span>
          </div>
          <p>$${formatMoney(product.price)}</p>
        </section>
        <section class="main_article__box-buttons">
          <div class="main_article__box-add--btn">
            <svg
              class="minus"
              width="12"
              height="4"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                  id="a"
                />
              </defs>
              <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a" />
            </svg>
            <span class="quantity">${quantity}</span>
            <svg
              class="plus"
              width="12"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <path
                  d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                  id="b"
                />
              </defs>
              <use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b" />
            </svg>
          </div>
          <div class="main_article__box-add-to-cart" data-product-id="${product.id}">
            <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                fill="#1d2025"
                fill-rule="nonzero"
              />
            </svg>
            <button class="add-to-cart-btn">Add to cart</button>
          </div>
        </section>
      </article>
     `;

  main.insertAdjacentHTML("beforeend", html);

  const article = main.lastElementChild.previousElementSibling;

  const addBox = article.nextElementSibling.querySelector(
    ".main_article__box-add--btn",
  );
  const minusIcon = addBox.querySelector(".minus");
  const plusIcon = addBox.querySelector(".plus");
  const quantityEl = addBox.querySelector(".quantity");

  plusIcon.addEventListener("click", () => {
    if (quantity >= 10) return;
    quantity++;
    quantityEl.textContent = quantity;
  });

  minusIcon.addEventListener("click", () => {
    if (quantity <= 0) return;
    quantity--;
    quantityEl.textContent = quantity;
  });

  const isEmpty = document.querySelector(".is-empty");
  const innerBox = document.querySelector(".inner");

  document
    .querySelectorAll(".main_article__box-add-to-cart")
    .forEach((elem) => {
      const productId = elem.dataset.productId;
      elem.addEventListener("click", () => {
        addToCart(productId, quantity);
        renderUI();
        isEmpty.classList.add("hidden");
        innerBox.classList.add("visible");
      });
    });
});

document.querySelectorAll(".main_article").forEach((article) => {
  const prevBtn = article.querySelector(".prev-icon");
  const nextBtn = article.querySelector(".next-icon");
  const img = article.querySelector(".image");

  let currentImage = 0;
  const index = Number(article.dataset.productId) - 1;
  console.log(index);
  const product = products[index];
  console.log(product);

  prevBtn.addEventListener("click", () => {
    currentImage--;
    if (currentImage < 0) {
      currentImage = product.images.length - 1;
    }
    img.src = product.images[currentImage];
  });

  nextBtn.addEventListener("click", () => {
    currentImage++;
    if (currentImage >= product.images.length) {
      currentImage = 0;
    }
    img.src = product.images[currentImage];
  });
});

renderUI();
