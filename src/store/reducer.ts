import { ActionType, StateType } from "../types/cartTypes";

export function reducer(action: ActionType, state: StateType): StateType {
  switch (action.type) {
    case "SET_ROUTE": {
      return {
        ...state,
        route: action.payload,
      };
    }
    case "ADD_ITEM": {
      let flag = 0;

      state.cart.forEach((item) => {
        if (item.id === action.payload.id) {
          flag = 1;
        }
      });
      let newCart;
      if (flag) {
        newCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          } else {
            return item;
          }
        });
      } else {
        newCart = [
          ...state.cart,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            category: action.payload.category,
            quantity: action.payload.quantity,
          },
        ];
      }

      return {
        ...state,
        cart: newCart,
      };
    }

    case "REMOVE_ITEM": {
      let flag = 0;

      state.cart.forEach((item) => {
        if (item.id === action.payload.id) {
          flag = 1;
        }
      });
      let newCart;
      if (flag) {
        newCart = state.cart
          .map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity - action.payload.quantity,
              };
            } else {
              return item;
            }
          })
          .filter((item) => item.quantity > 0);
      } else {
        newCart = [
          ...state.cart,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            category: action.payload.category,
            quantity: action.payload.quantity,
          },
        ];
      }

      return {
        ...state,
        cart: newCart,
      };
    }

    case "APPLY_CODE": {
      return {
        ...state,
        code: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
