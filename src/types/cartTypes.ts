export type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
};

export interface StateType {
  cart: Array<ProductType>;
  route: string;
}
export type ActionType =
  | {
      type: "SET_ROUTE";
      payload: string;
    }
  | {
      type: "ADD_ITEM";
      payload: ProductType;
    };

export type ReducerType = (action: ActionType, state: StateType) => StateType;

export interface StoreType {
  getState: () => StateType;
  dispatch: (action: ActionType) => void;
  subscribe: (listener: () => void) => void;
}
