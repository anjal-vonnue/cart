import { describe, expect, test, vi } from "vitest";
import { createStore } from "../store/store.ts";
import { StateType } from "../types/cartTypes.ts";
import { reducer } from "../store/reducer.ts";

describe("unit tests", () => {
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

  const mockRenderFN = vi.fn();
  test("--- increasing quantity", () => {
    const store = createStore(firstState, reducer);
    store.subscribe(mockRenderFN);

    store.dispatch({
      type: "ADD_ITEM",
      payload: {
        id: 1,
        name: "Wireless Headphones",
        price: 80,
        category: "Electronics",
        quantity: 1,
      },
    });

    const state = store.getState();
    expect(state).toEqual({
      cart: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 80,
          category: "Electronics",
          quantity: 2,
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
    });
    expect(mockRenderFN).toHaveBeenCalledOnce();
  });

  test("--- removing a product from cart", () => {
    const store = createStore(firstState, reducer);
    store.subscribe(mockRenderFN);

    store.dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: 1,
        name: "Wireless Headphones",
        price: 80,
        category: "Electronics",
        quantity: 1,
      },
    });

    const state = store.getState();
    expect(state).toEqual({
      cart: [
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
    });
  });

  test("--- applying coupon code", () => {
    const store = createStore(firstState, reducer);

    store.dispatch({
      type: "APPLY_CODE",
      payload: 20,
    });

    let state = store.getState().code;

    expect(state).toEqual(20);

    store.dispatch({
      type: "APPLY_CODE",
      payload: 30,
    });

    state = store.getState().code;
    expect(state).toEqual(30);
  });

  test("--- adding new product", () => {
    const store = createStore(firstState, reducer);
    store.dispatch({
      type: "ADD_ITEM",
      payload: {
        id: 3,
        name: "IPhone",
        price: 800,
        category: "SmartPhones",
        quantity: 2,
      },
    });

    const state = store.getState().cart;

    expect(state).toEqual([
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
      {
        id: 3,
        name: "IPhone",
        price: 800,
        category: "SmartPhones",
        quantity: 2,
      },
    ]);
  });

  test("--- chagning route", () => {
    const store = createStore(firstState, reducer);
    store.dispatch({
      type: "SET_ROUTE",
      payload: "/products",
    });

    const state = store.getState().route;
    expect(state).toEqual("/products");
  });
});
