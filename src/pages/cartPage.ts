import { StoreType } from "../types/cartTypes";

export function renderCart(store: StoreType) {
  const section = document.createElement("section");
  const divEl = document.createElement("div");
  divEl.className = "cart-items";

  const cart = store.getState().cart;

  let cartContent = ``;
  cart.forEach((product) => {
    cartContent += ` 
        <article class="product-card">
          <div class="product-content">
            <h3 id="p-name" data-id=${product.id} data-name="${product.name}">${product.name}</h3>
            <h4>Quantity: ${product.quantity}</h4>
            <h4 id="p-price" data-price=${product.price}>Price: ${product.price * product.quantity}</h4>
            <h5 id="p-category" data-category=${product.category}>Category: ${product.category}</h5>
          </div>
          <div class="product-buttons">
            <p>
              <label>Quantity: </label>
              <input type="number" value="0" min="0" id="p-quantity"/>
            </p>
            <button class="remove-btn">REMOVE ITEM</button>
          </div>
        </article>
     `;
  });
  divEl.innerHTML = cartContent;

  const removeButtons = divEl.querySelectorAll(".remove-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("remove button clicked");

      const productContent = btn
        .closest("article")
        ?.querySelector(".product-content");
      const productButtons = btn
        .closest("article")
        ?.querySelector(".product-buttons");

      console.log(
        productContent
          ?.querySelector("#p-category")
          ?.getAttribute("data-category"),
      );

      const pId = productContent
        ?.querySelector("#p-name")
        ?.getAttribute("data-id");
      const pNmae = productContent
        ?.querySelector("#p-name")
        ?.getAttribute("data-name");
      const pPrice = productContent
        ?.querySelector("#p-price")
        ?.getAttribute("data-price");
      const pCategory = productContent
        ?.querySelector("#p-category")
        ?.getAttribute("data-category");
      const pQuantityEL = productButtons?.querySelector(
        "#p-quantity",
      ) as HTMLInputElement;

      const quantityValue = pQuantityEL.value;
      if (pId && pNmae && pPrice && pCategory && quantityValue) {
        store.dispatch({
          type: "REMOVE_ITEM",
          payload: {
            id: Number(pId),
            name: pNmae,
            price: Number(pPrice),
            category: pCategory,
            quantity: Number(quantityValue),
          },
        });
      }
    });
  });

  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });

  let subTotal;
  const code = store.getState().code;

  if (code) {
    let discount = (totalPrice * code) / 100;
    subTotal = totalPrice - discount;
  } else {
    subTotal = totalPrice;
  }

  const divTotal = document.createElement("div");
  divTotal.className = "cart-total";
  divTotal.innerHTML = `<div>
          <p>
            <label>COUPON CODE:</label>
            <input min="1" type="number" id="coupon-code" value="${code}"/>
            <button class="code-btn">APPLY</button>
          </p>
        </div>
        <h3>TOTAL PRIZE: ${totalPrice}</h3>
        <h3>SUB TOTAL: ${subTotal} (applied ${code}% discount)</h3>`;

  const codeBtn = divTotal.querySelector(".code-btn");

  codeBtn?.addEventListener("click", () => {
    const codeInput = divTotal.querySelector(
      "#coupon-code",
    ) as HTMLInputElement;
    const codeValue = codeInput?.value;
    store.dispatch({
      type: "APPLY_CODE",
      payload: Number(codeValue),
    });
  });
  section.appendChild(divEl);
  section.appendChild(divTotal);
  return section;
}
