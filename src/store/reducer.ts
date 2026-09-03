import { ActionType, StateType } from "../types/cartTypes";

export function reducer(action: ActionType, state: StateType): StateType {
  switch (action.type) {
    case "SET_ROUTE": {
      return {
        ...state,
        route: action.payload,
      };
    }
  }
}
