import { formatMoney } from "../utils/formatMoney.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [];
let productsData = [];
let tooltipBox;
let innerEl;
let cartEmpty;

export function initCart(products) {
  productsData = products;

  tooltipBox = document.querySelector(".tooltip_box");
  innerEl = tooltipBox.querySelector(".inner");
  cartEmpty = tooltipBox.querySelector(".text-empty-cart");

  const cartIcon = tooltipBox.querySelector(".cart-icon");
  const cartContainer = tooltipBox.querySelector(".cart_dropdown");

  cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("dropped");
  });
}

// add to cart function
export function addToCart(productId, quantity) {
  const matchingProduct = cart.find((item) => item.productId === productId);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// render from cart
export function renderUI(products) {
  const totalQuantity = cart.reduce((prev, curr) => prev + curr.quantity, 0);
  const tooltipEl = tooltipBox.querySelector("span");

  if (totalQuantity > 0) {
    tooltipEl.textContent = totalQuantity;
    tooltipEl.classList.remove("tooltip");
    tooltipEl.classList.add("visible");
  } else {
    tooltipEl.textContent = "0";
    tooltipEl.classList.remove("visible");
    tooltipEl.classList.add("tooltip");
  }

  innerEl.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    innerEl.classList.remove("with-items");
    return;
  }

  cartEmpty.classList.add("hidden");
  innerEl.classList.add("with-items");

  cart.forEach((cartItem) => {
    const product = productsData.find((p) => p.id === cartItem.productId);

    if (!product) return;

    const html = `
              <div class="product-details">
                <div class="image">
                  <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                  />
                </div>
                <div class="description">
                  <p>${product.name}</p>
                  <p>$${formatMoney(product.price)} x <span>${cartItem.quantity}</span><strong>  $${formatMoney(product.price * cartItem.quantity)}</strong></p>
                </div>
                <div class="delete-btn">
                  <svg
                    width="14"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <defs>
                      <path
                        d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                        id="a"
                      />
                    </defs>
                    <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
                  </svg>
                </div>
              </div>
              <a href="" class="checkout_link">Checkout</a>
        `;

    innerEl.insertAdjacentHTML("beforeend", html);

    innerEl.querySelectorAll(".delete-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderUI();
      });
    });
  });
}
