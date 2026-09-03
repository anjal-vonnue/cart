export function renderProduct() {
  const section = document.createElement("section");
  section.innerHTML = `<article class="product-card">
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
          <button>ADD TO CART</button>
        </div>
      </article>`;

  return section;
}
