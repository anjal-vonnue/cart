import { StoreType } from "../types/cartTypes";

export function createRouter(store: StoreType) {
  const routes = [];
  //todo: need to change the compoenent type
  function register(path: string, component: () => void) {
    routes.push({
      path: path,
      component: component,
    });
  }

  function navigate(path: string) {
    const url = "/#" + path;
    console.log(url);

    window.history.pushState({}, "", url);
    changeRoute();
  }

  function changeRoute() {
    const currentPath = window.location.hash.slice(1) || "/cart";
    console.log("inside changeRoute");
    console.log("current path: ", currentPath);

    store.dispatch({
      type: "SET_ROUTE",
      payload: currentPath,
    });
  }

  return {
    register,
    navigate,
    changeRoute,
  };
}
