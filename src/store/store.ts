import { ActionType, ReducerType, StateType } from "../types/cartTypes";

export function createStore(initialState: StateType, reducer: ReducerType) {
  let state = initialState;
  const listeners: Array<() => void> = [];
  function getState() {
    return state;
  }
  function dispatch(action: ActionType) {
    state = reducer(action, state);

    localStorage.setItem("cart", JSON.stringify(state));

    listeners.forEach((listener) => {
      listener();
    });
  }
  function subscribe(listener: () => void) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
