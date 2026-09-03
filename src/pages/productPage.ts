import { StoreType } from "../types/cartTypes";

const products = [
  { id: 1, name: "Wireless Headphones", price: 80, category: "Electronics" },
  { id: 2, name: "Mechanical Keyboard", price: 90, category: "Electronics" },
  { id: 3, name: "Running Shoes", price: 65, category: "Footwear" },
  { id: 4, name: "Cotton T-Shirt", price: 25, category: "Clothing" },
  { id: 5, name: "Coffee Maker", price: 50, category: "Appliances" },
  { id: 6, name: "Backpack", price: 49, category: "Accessories" },
  { id: 7, name: "Smart Watch", price: 130, category: "Electronics" },
  { id: 8, name: "Water Bottle", price: 20, category: "Home & Kitchen" },
  { id: 9, name: "Desk Lamp", price: 35, category: "Home & Office" },
  { id: 10, name: "Bluetooth Speaker", price: 60, category: "Electronics" },
  { id: 11, name: "Denim Jeans", price: 55, category: "Clothing" },
  { id: 12, name: "Leather Wallet", price: 30, category: "Accessories" },
  { id: 13, name: "Yoga Mat", price: 23, category: "Sports" },
  { id: 14, name: "Gaming Mouse", price: 45, category: "Electronics" },
  { id: 15, name: "Ceramic Mug", price: 15, category: "Home & Kitchen" },
  { id: 16, name: "Sunglasses", price: 35, category: "Accessories" },
  { id: 17, name: "Hoodie", price: 50, category: "Clothing" },
  { id: 18, name: "Electric Kettle", price: 40, category: "Appliances" },
  { id: 19, name: "Football", price: 25, category: "Sports" },
  { id: 20, name: "Notebook", price: 10, category: "Stationery" },
];

export function renderProduct(store: StoreType) {
  const section = document.createElement("section");

  let productHtml = ``;
  products.forEach((product) => {
    productHtml =
      productHtml +
      `<article class="product-card">
        <div class="product-content">
          <h3 id="p-name" data-id=${product.id} data-name="${product.name}">${product.name}</h3>
          <h4 id="p-price" data-price=${product.price}>Price: ${product.price}</h4>
          <h5 id="p-category" data-category=${product.category}>Category: ${product.category}</h5>
        </div>
        <div class="product-buttons">
          <p>
            <label>Quantity: </label>
            <input min="1" value="1" type="number"  id="p-quantity"/>
          </p>
          <button class="add-btn">ADD TO CART</button>
        </div>
      </article>`;
  });
  section.innerHTML = productHtml;

  const addButtons = section.querySelectorAll(".add-btn");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("btn clicked");
      const productContent = btn
        .closest("article")
        ?.querySelector(".product-content");
      const productButtons = btn
        .closest("article")
        ?.querySelector(".product-buttons");

      console.log(
        productContent?.querySelector("#p-price")?.getAttribute("data-price"),
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
          type: "ADD_ITEM",
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

  return section;
}
