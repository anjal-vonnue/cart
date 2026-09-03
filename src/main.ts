import { renderCart } from "./pages/cartPage.js";
import { renderProduct } from "./pages/productPage.js";
import { createRouter } from "./router/router.js";
import { reducer } from "./store/reducer.js";
import { createStore } from "./store/store.js";
import { StateType } from "./types/cartTypes.js";

console.log("hello world");
const app = document.getElementById("app");

const firstState: StateType = {
  cart: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 80,
      category: "Electronics",
      quantity: 1,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 90,
      category: "Electronics",
      quantity: 1,
    },
  ],
  route: "/cart",
  code: 0,
};

function loadSate() {
  const savedState = localStorage.getItem("cart");
  if (savedState) {
    return JSON.parse(savedState);
  } else {
    return firstState;
  }
}

const initialState = loadSate();
const store = createStore(initialState, reducer);

function renderFn() {
  const state = store.getState();
  let page;

  console.log("===== inside render FN");

  switch (state.route) {
    case "/cart": {
      console.log("calling renderCart");
      page = renderCart(store);
      break;
    }
    case "/products": {
      console.log("calling renderProduct");
      page = renderProduct(store);
      break;
    }

    default: {
      page = renderCart(store);
    }
  }

  if (page) app?.replaceChildren(page);
}
store.subscribe(renderFn);
const router = createRouter(store);

router.navigate(store.getState().route);

const aTags = document.querySelectorAll(".nav-links a");
aTags.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const path = a.getAttribute("href") || "/cart";

    router.navigate(path);
  });
});
