export function renderCart() {
  const section = document.createElement("section");
  section.innerHTML = ` <div class="cart-items">
        <article class="product-card">
          <div class="product-content">
            <h3>Product Name</h3>
            <h4>Price: 4000</h4>
            <h5>Category:</h5>
          </div>
          <div class="product-buttons">
            <p>
              <label>Quantity: </label>
              <input type="number" />
            </p>
            <button>REMOVE ITEM</button>
          </div>
        </article>
        <article class="product-card">
          <div class="product-content">
            <h3>Product Name</h3>
            <h4>Price: 4000</h4>
            <h5>Category:</h5>
          </div>
          <div class="product-buttons">
            <p>
              <label>Quantity: </label>
              <input type="number" />
            </p>
            <button>REMOVE ITEM</button>
          </div>
        </article>
      </div>
      <div class="cart-total">
        <div>
          <p>
            <label>COUPON CODE:</label>
            <input type="number" />
            <button>APPLY</button>
          </p>
        </div>
        <h3>TOTAL PRIZE: 5000</h3>
        <h3>SUB TOTAL: 3000</h3>
      </div>`;

  return section;
}
